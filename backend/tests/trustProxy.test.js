import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../src/app.js";

// Regression guard for a production outage: behind Render's load balancer,
// an unset `trust proxy` made req.ip the balancer's own address for every
// visitor, collapsing all of rateLimiters.js into one global counter (3
// registrations per hour for the whole site). Nothing here fails loudly
// when this setting disappears - the app boots and every test still passes,
// it just silently locks out real users - so it is pinned explicitly.
describe("trust proxy", () => {

    it("trusts exactly one proxy hop", () => {

        // Not false (req.ip becomes the shared balancer address -> one
        // global rate-limit bucket) and not true (Express then takes the
        // client-controlled leftmost X-Forwarded-For entry, letting a
        // brute-forcer rotate it and bypass every limiter).
        expect(app.get("trust proxy")).toBe(1);

    });

    it("derives distinct rate-limit keys for distinct clients behind the proxy", async () => {

        // Two visitors arriving through the same balancer must not share a
        // counter. Both are well under the limit, so a 429 here would mean
        // the second request was charged to the first one's bucket.
        const first = await request(app)
            .post("/api/auth/login")
            .set("X-Forwarded-For", "203.0.113.10")
            .send({ email: "nobody-a@glossio-tests.local", password: "WrongPass123!" });

        const second = await request(app)
            .post("/api/auth/login")
            .set("X-Forwarded-For", "203.0.113.11")
            .send({ email: "nobody-b@glossio-tests.local", password: "WrongPass123!" });

        expect(first.status).not.toBe(429);
        expect(second.status).not.toBe(429);

    });

});
