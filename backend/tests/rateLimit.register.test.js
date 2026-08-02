import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../src/app.js";
import { makeTestCredentials } from "./helpers.js";

// Own file for the same reason as rateLimit.login.test.js - a fresh
// register-limiter counter, unaffected by (and not affecting) any other
// test file's registration calls.
describe("Rate limiting - register (429)", () => {

    it("limits registration to 3 per hour from the same source", async () => {
        let lastResponse;

        for (let i = 0; i < 4; i++) {
            const creds = makeTestCredentials(`reglimit-${i}`);
            lastResponse = await request(app).post("/api/auth/register").send(creds);
        }

        expect(lastResponse.status).toBe(429);
    });

});
