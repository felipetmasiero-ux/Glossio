import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../src/app.js";
import { registerTestUser, createTestUser } from "./helpers.js";

// This file makes at most 2 calls to /auth/register (well under its
// 3-per-hour limit) and a handful to /auth/login with wrong credentials
// (under its 5-per-15min limit). Every other test that just needs "a
// logged-in user" uses createTestUser() (direct DB insert + a real signed
// token), which spends none of that budget. Detailed register/login
// validation-case coverage lives in src/services/authService.test.js
// (bypasses HTTP + rate limiting entirely); dedicated 429 tests live in
// rateLimit.integration.test.js, each in its own file for a fresh limiter.
describe("Security hardening - validation & auth", () => {

    describe("POST /api/auth/register (HTTP wiring smoke test)", () => {

        it("registers a user end-to-end and never returns the password hash", async () => {
            const { response } = await registerTestUser(request, app, "http-valid");

            expect(response.status).toBe(201);
            expect(response.body.token).toBeTruthy();
            expect(response.body.user.passwordHash).toBeUndefined();
        });

        it("rejects invalid input with a 400 and never leaks internals", async () => {
            const response = await request(app)
                .post("/api/auth/register")
                .send({ name: "Test", email: "not-an-email", password: "TestPass123!" });

            expect(response.status).toBe(400);
            expect(Object.keys(response.body)).toEqual(["error"]);
            expect(response.body.error).not.toMatch(/prisma/i);
            expect(response.body.error).not.toMatch(/at .*\.js:\d+/); // stack-trace-shaped line
        });

    });

    describe("POST /api/auth/login", () => {

        it("returns a generic 401 for a wrong password (doesn't reveal the account exists)", async () => {
            const { credentials } = await createTestUser("wrongpass");

            const response = await request(app)
                .post("/api/auth/login")
                .send({ email: credentials.email, password: "wrong-password-1" });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe("E-mail ou senha inválidos.");
        });

        it("returns the same generic 401 for a non-existent email", async () => {
            const response = await request(app)
                .post("/api/auth/login")
                .send({ email: "nobody-here@glossio-tests.local", password: "whatever123" });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe("E-mail ou senha inválidos.");
        });

        it("rejects a missing payload entirely", async () => {
            const response = await request(app).post("/api/auth/login").send({});
            expect(response.status).toBe(400);
        });

    });

    describe("Authentication (401)", () => {

        it("rejects GET /api/user with no token", async () => {
            const response = await request(app).get("/api/user");
            expect(response.status).toBe(401);
        });

        it("rejects GET /api/user with a garbage token", async () => {
            const response = await request(app)
                .get("/api/user")
                .set("Authorization", "Bearer garbage-not-a-jwt");

            expect(response.status).toBe(401);
        });

        it("rejects a non-Bearer scheme", async () => {
            const response = await request(app)
                .get("/api/user")
                .set("Authorization", "Basic dXNlcjpwYXNz");

            expect(response.status).toBe(401);
        });

        it("accepts a valid token minted the same way the app mints one", async () => {
            const { token } = await createTestUser("valid-token");

            const response = await request(app)
                .get("/api/user")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
        });

    });

    describe("CORS (403)", () => {

        it("rejects a browser request from a disallowed origin", async () => {
            const response = await request(app)
                .get("/api/auth/me")
                .set("Origin", "https://not-glossio.evil.example");

            expect(response.status).toBe(403);
        });

        it("allows the configured localhost origin", async () => {
            const response = await request(app)
                .get("/api/auth/me")
                .set("Origin", "http://localhost:5173");

            // Still 401 (no token) - the point is CORS didn't block it (no 403).
            expect(response.status).toBe(401);
            expect(response.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
        });

    });

    describe("Payload limits", () => {

        it("rejects a request body larger than the 1mb limit", async () => {
            const response = await request(app)
                .post("/api/flashcards")
                .set("Authorization", "Bearer irrelevant-body-too-big-to-even-parse")
                .send({ padding: "x".repeat(2 * 1024 * 1024) });

            expect(response.status).toBe(413);
            expect(response.body.error).toBeTruthy();
        });

    });

    describe("Profile updates (PUT /api/user)", () => {

        it("rejects an invalid avatar URL", async () => {
            const { token } = await createTestUser("avatar-bad");

            const response = await request(app)
                .put("/api/user")
                .set("Authorization", `Bearer ${token}`)
                .send({ avatarUrl: "javascript:alert(1)" });

            expect(response.status).toBe(400);
        });

        it("accepts a valid avatar URL", async () => {
            const { token } = await createTestUser("avatar-ok");

            const response = await request(app)
                .put("/api/user")
                .set("Authorization", `Bearer ${token}`)
                .send({ avatarUrl: "https://example.com/avatar.png" });

            expect(response.status).toBe(200);
            expect(response.body.user.avatarUrl).toBe("https://example.com/avatar.png");
        });

        it("rejects a bio beyond the max length", async () => {
            const { token } = await createTestUser("bio-huge");

            const response = await request(app)
                .put("/api/user")
                .set("Authorization", `Bearer ${token}`)
                .send({ bio: "a".repeat(10_000) });

            expect(response.status).toBe(400);
        });

        it("rejects an invalid timezone", async () => {
            const { token } = await createTestUser("tz-bad");

            const response = await request(app)
                .put("/api/user")
                .set("Authorization", `Bearer ${token}`)
                .send({ timezone: "Definitely/Not_Real" });

            expect(response.status).toBe(400);
        });

    });

    describe("PUT /api/progress - goals validation", () => {

        it("rejects a negative goal value", async () => {
            const { token } = await createTestUser("goals-negative");

            const response = await request(app)
                .put("/api/progress")
                .set("Authorization", `Bearer ${token}`)
                .send({ dashboard: { goals: { dailyLessons: -5 } } });

            expect(response.status).toBe(400);
        });

        it("accepts positive goal values and null (unset)", async () => {
            const { token } = await createTestUser("goals-ok");

            const response = await request(app)
                .put("/api/progress")
                .set("Authorization", `Bearer ${token}`)
                .send({ dashboard: { goals: { dailyLessons: 2, dailyReviews: null } } });

            expect(response.status).toBe(200);
            expect(response.body.dashboard.goals.dailyLessons).toBe(2);
            expect(response.body.dashboard.goals.dailyReviews).toBeNull();
        });

    });

    describe("PUT /api/flashcards - field validation", () => {

        it("rejects a flashcard missing required fields", async () => {
            const { token } = await createTestUser("card-missing");

            const response = await request(app)
                .put("/api/flashcards")
                .set("Authorization", `Bearer ${token}`)
                .send([{ id: "card-1" }]);

            expect(response.status).toBe(400);
        });

        it("rejects a flashcard with a non-finite timestamp", async () => {
            const { token } = await createTestUser("card-badts");

            const response = await request(app)
                .put("/api/flashcards")
                .set("Authorization", `Bearer ${token}`)
                .send([{
                    id: `card-badts-${Date.now()}-${Math.random()}`,
                    word: "hello",
                    translation: "olá",
                    language: "English",
                    easeFactor: 2.5,
                    interval: 1,
                    repetitions: 0,
                    createdAt: "not-a-number",
                    updatedAt: Date.now(),
                    nextReview: Date.now()
                }]);

            expect(response.status).toBe(400);
        });

        it("accepts a well-formed flashcard", async () => {
            const { token } = await createTestUser("card-ok");
            const now = Date.now();

            const response = await request(app)
                .put("/api/flashcards")
                .set("Authorization", `Bearer ${token}`)
                .send([{
                    id: `card-ok-${now}-${Math.random()}`,
                    word: "hello",
                    translation: "olá",
                    language: "English",
                    easeFactor: 2.5,
                    interval: 1,
                    repetitions: 0,
                    createdAt: now,
                    updatedAt: now,
                    nextReview: now
                }]);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
        });

    });

});
