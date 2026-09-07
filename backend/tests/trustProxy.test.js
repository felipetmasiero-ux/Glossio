import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../src/app.js";
import { clientKey } from "../src/middlewares/rateLimiters.js";

// Regression guard for a production outage: behind Render's proxy chain an
// unset `trust proxy` made req.ip the same address for every visitor,
// collapsing all of rateLimiters.js into one global counter (3 registrations
// per hour for the entire site). Nothing here fails loudly when this
// regresses - the app boots and every other test still passes, it just
// silently locks real users out - so it is pinned explicitly.
describe("client identification behind the proxy chain", () => {

    it("trusts exactly the two hops Render puts in front of this process", () => {

        // Cloudflare (every *.onrender.com host) -> Render's router -> here.
        // Not false (req.ip becomes a single shared address -> one global
        // bucket) and not true (Express would then take the leftmost,
        // client-controlled X-Forwarded-For entry, letting a brute-forcer
        // rotate it and bypass every limiter).
        expect(app.get("trust proxy")).toBe(2);

    });

    it("charges the visitor that Cloudflare saw, not the proxy in front of them", () => {

        // The header Cloudflare sets - and overwrites - on every request.
        // Preferring it is what makes the limiters independent of the hop
        // count above, which is a property of the hosting chain and can
        // change without this repo changing.
        const key = clientKey({ headers: { "cf-connecting-ip": "203.0.113.7" }, ip: "198.51.100.1" });

        expect(key).toBe("203.0.113.7");

    });

    it("falls back to req.ip where there is no Cloudflare in front", () => {

        // Local dev, this test suite, or a future move off Render.
        expect(clientKey({ headers: {}, ip: "203.0.113.9" })).toBe("203.0.113.9");

    });

    it("groups an IPv6 visitor by prefix so rotating addresses cannot walk through a limit", () => {

        const first = clientKey({ headers: { "cf-connecting-ip": "2001:db8:1234:5600::1" }, ip: "" });
        const second = clientKey({ headers: { "cf-connecting-ip": "2001:db8:1234:5600::99" }, ip: "" });

        expect(first).toBe(second);

    });

    it("keeps distinct clients in distinct rate-limit buckets end to end", async () => {

        // Two visitors arriving through the same proxy chain must not share
        // a counter. Both are well under the limit, so a 429 here would mean
        // the second request was charged to the first one's bucket.
        const first = await request(app)
            .post("/api/auth/login")
            .set("CF-Connecting-IP", "203.0.113.10")
            .send({ email: "nobody-a@glossio-tests.local", password: "WrongPass123!" });

        const second = await request(app)
            .post("/api/auth/login")
            .set("CF-Connecting-IP", "203.0.113.11")
            .send({ email: "nobody-b@glossio-tests.local", password: "WrongPass123!" });

        expect(first.status).not.toBe(429);
        expect(second.status).not.toBe(429);

    });

});
