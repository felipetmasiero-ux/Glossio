import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../src/app.js";
import { createTestUser } from "./helpers.js";

// One test, one file: express-rate-limit's MemoryStore counter for the
// login limiter lives for the lifetime of this module - keeping every
// scenario that exhausts it in its own file (fresh module graph per vitest
// test file) means it can't bleed into any other test's budget.
describe("Rate limiting - login (429)", () => {

    it("locks out further attempts after 5 failures, even a correct password, within the window", async () => {
        const { credentials } = await createTestUser("login-lockout");

        let lastResponse;

        for (let i = 0; i < 5; i++) {
            lastResponse = await request(app)
                .post("/api/auth/login")
                .send({ email: credentials.email, password: "definitely-wrong" });
        }

        expect(lastResponse.status).toBe(401); // 5th failure is still just a normal wrong-password rejection

        // The 6th attempt - even with the *correct* password - is blocked by
        // the limiter itself, proving there's no "valid credentials" bypass.
        const blocked = await request(app)
            .post("/api/auth/login")
            .send({ email: credentials.email, password: credentials.password });

        expect(blocked.status).toBe(429);
        expect(blocked.body.error).toBeTruthy();
    });

});
