import { test as base, expect } from "@playwright/test";
import { makeTestUser, registerAndOnboard } from "./auth-helpers.js";

/**
 * Custom fixtures shared across specs so every test doesn't have to
 * re-implement "create a user and get to a logged-in state".
 *
 * - `newUser`: fresh, disposable credentials (never reused across tests).
 * - `authedPage`: a page that has registered a brand-new user, picked
 *   English as the study language, and is sitting on /home. This is the
 *   common starting point for Learn / Review / Explore / Collect / Profile
 *   specs, which care about those flows, not about registration itself.
 */
export const test = base.extend({

    newUser: async ({}, use) => {
        await use(makeTestUser());
    },

    authedPage: async ({ page }, use) => {
        const user = makeTestUser("authed");
        await registerAndOnboard(page, user, "English");
        await use(page);
    }

});

export { expect };
