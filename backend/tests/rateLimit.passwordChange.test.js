import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../src/app.js";
import { createTestUser } from "./helpers.js";

// Own file for the same reason as the other rate-limit tests - a fresh
// password-change-limiter counter.
describe("Rate limiting - password change (429)", () => {

    it("limits password-change attempts to 5 per 30 minutes", async () => {
        const { token } = await createTestUser("pwlimit");

        let lastResponse;

        // Every attempt uses a wrong current password on purpose, so none of
        // them succeed and skip the count (skipSuccessfulRequests).
        for (let i = 0; i < 6; i++) {
            lastResponse = await request(app)
                .put("/api/user/password")
                .set("Authorization", `Bearer ${token}`)
                .send({ currentPassword: "wrong-current-password", newPassword: "newpassword123" });
        }

        expect(lastResponse.status).toBe(429);
    });

});
