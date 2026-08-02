import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma.js";
import { signToken } from "../src/utils/jwt.js";

// Disposable test users, same philosophy as the frontend's Playwright specs
// (tests/e2e/fixtures/auth-helpers.js): every test creates its own
// throw-away account instead of mocking Prisma, so tests run against the
// real app + real database with zero shared/cleanup state to manage.
let counter = 0;

export function makeTestCredentials(label = "sec") {
    counter += 1;
    const unique = `${Date.now()}-${counter}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: `Security Test ${unique}`,
        email: `sec-${label}-${unique}@glossio-tests.local`,
        password: "TestPass123!"
    };
}

// Goes through the real HTTP endpoint - only use this for tests that are
// actually exercising /auth/register itself (its validation, its 429). It
// counts against the 3-per-hour register limiter same as a real client
// would, so every test file that calls this shares that budget.
export async function registerTestUser(request, app, label) {
    const credentials = makeTestCredentials(label);

    const response = await request(app)
        .post("/api/auth/register")
        .send(credentials);

    return { credentials, response };
}

// Creates a user directly in the database and mints a real token via the
// same signToken() the app itself uses - for every test that just needs
// "a logged-in user" to exercise some *other* endpoint, without spending
// any of the register/login rate-limit budget on setup.
export async function createTestUser(label) {
    const credentials = makeTestCredentials(label);
    const passwordHash = await bcrypt.hash(credentials.password, 4); // low cost: a test fixture, not exercising real registration

    const user = await prisma.user.create({
        data: { name: credentials.name, email: credentials.email, passwordHash }
    });

    const token = signToken({ sub: user.id });

    return { credentials, user, token };
}
