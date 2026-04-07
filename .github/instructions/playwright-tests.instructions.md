---
applyTo: 'apps/*-e2e/**/*.ts,apps/*-e2e/**/*.tsx,playwright/**/*.ts,**/*.spec.ts,**/*.e2e-spec.ts'
description: 'Rules for writing Playwright tests in the Nx Angular/NestJS workspace'
---

# Playwright test instructions

You are writing Playwright tests for an Nx monorepo that uses pnpm, Angular 21, standalone components, Angular Signals where practical, NgRx, NestJS, PostgreSQL, Tailwind CSS, and TypeScript.

## Goal

Write Playwright tests that verify user-visible business flows.
Prefer stable, deterministic, readable tests over broad or fragile UI scripts.

## Language and style

- Write all code, comments, test titles, helper names, and descriptions in English.
- Use TypeScript only.
- Keep test code concise, explicit, and production-ready.
- Prefer readability over abstraction when the abstraction does not clearly reduce duplication.

## Scope of Playwright tests

Prioritize end-to-end coverage for critical user journeys such as:

- registration
- login
- logout
- route protection
- account CRUD
- category CRUD when user-facing and important
- transaction CRUD
- transaction filtering and sorting
- budget creation and updates
- dashboard summaries
- reports and date-range filtering
- validation and selected error states

Prefer happy-path coverage first.
Add negative scenarios for important validation, authorization, and regression-prone areas.

## Architecture rules

Structure Playwright code with clear separation of concerns:

- Spec files contain scenario orchestration and assertions.
- Page objects contain selectors and reusable user actions for one page or one coherent feature area.
- Flow helpers contain reusable business sequences spanning multiple screens or actions.
- Fixtures contain authenticated contexts, seeded users, and shared setup.
- Test data helpers create minimal and readable input objects.

Do not hide important assertions inside page objects.
Do not build giant page objects that cover the whole application.
Do not place all setup logic directly in spec files when it is repeated.

## Selector strategy

Prefer resilient selectors in this order:

1. `getByTestId`
2. `getByRole`
3. `getByLabel`
4. `getByPlaceholder`
5. `getByText` only when visible text is itself part of the requirement

Avoid:

- Tailwind or CSS-class-based selectors
- brittle DOM traversal
- `nth-child` selectors
- selectors tied to Angular internals
- selectors based on layout structure

If a stable selector is missing, suggest adding a `data-testid`.

Examples:

- Good: `page.getByTestId('transaction-submit-button')`
- Good: `page.getByRole('button', { name: 'Save transaction' })`
- Bad: `page.locator('.flex.items-center.justify-between > button:nth-child(2)')`

## Assertions

Assert business outcomes that matter to the user.

Prefer assertions such as:

- success or error messages are visible
- a created or updated record is visible
- totals, balances, statuses, and labels are correct
- filters change visible results correctly
- protected routes redirect correctly
- disabled or loading states behave correctly when relevant
- key URL changes are correct when routing is part of the requirement

Avoid asserting implementation details.
Avoid checking incidental text or styles unless they are the requirement.

Use Playwright's built-in `expect` with auto-waiting.
Prefer:

- `toBeVisible`
- `toHaveText`
- `toContainText`
- `toHaveValue`
- `toHaveURL`
- `toBeDisabled`
- `toHaveCount`

## Waiting strategy

Never use `waitForTimeout` as a default synchronization mechanism.

Prefer:

- Playwright auto-waiting
- visibility assertions
- text/value assertions
- URL assertions
- waiting for known loading indicators to disappear
- waiting for specific responses only when needed and justified

Tests must be deterministic and should not rely on arbitrary sleeps.

## Test independence

- Each test must be runnable in isolation.
- Do not rely on state created by previous tests.
- Avoid shared mutable state between tests.
- Prefer explicit setup through fixtures, factories, API helpers, or seed utilities.
- If login is not the goal of the test, do not repeat UI login in every spec.

## Authentication strategy

Use UI login only for authentication-specific tests.
For feature tests, prefer one of the following:

- authenticated fixtures
- storage state if already established in the repo
- API-based setup for login or seeded users

The objective is to test the target feature, not to re-test login everywhere.

## Test data rules

Use realistic and minimal test data.
Prefer builders or factories for repeated entities:

- user
- account
- category
- transaction
- budget

Test data should be:

- readable
- explicit
- valid by default
- easy to override in each scenario

If unique values are needed, generate them in a helper, not ad hoc in every test.

## Page object rules

A page object should:

- represent one page or one coherent feature area
- expose user intentions, not raw locator mechanics
- keep locators private when possible
- provide small, composable methods

Good methods:

- `goto()`
- `openCreateForm()`
- `fillExpenseForm(data)`
- `submit()`
- `filterByCategory(name)`

Bad methods:

- `clickSecondButtonInHeader()`
- `fillFormWithFiveRandomValues()`

Page objects may expose a few important locators when that makes assertions cleaner, for example:

- `successAlert`
- `errorAlert`
- `transactionRow(note)`

## Flow helper rules

Create flow helpers for repeated sequences such as:

- login as seeded user
- create account
- create category
- create expense transaction
- create monthly budget

Flows should be short and reusable.
Do not hide every assertion inside flows.
Keep business verification primarily in specs unless the helper exists specifically to verify a reusable outcome.

## File organization

Prefer a structure like:

- `fixtures/`
- `pages/`
- `flows/`
- `utils/`
- `test-data/`
- `specs/auth/`
- `specs/accounts/`
- `specs/categories/`
- `specs/transactions/`
- `specs/budgets/`
- `specs/reports/`

Use clear file names such as:

- `login.spec.ts`
- `register.spec.ts`
- `accounts-crud.spec.ts`
- `transactions-crud.spec.ts`
- `transaction-filters.spec.ts`
- `budgets.spec.ts`

## Recommended spec style

- Use `test.describe(...)` to group related scenarios.
- Keep one primary scenario per test.
- Keep setup concise and close to the scenario unless reused often.
- Separate Arrange / Act / Assert with blank lines rather than noisy comments.
- Avoid overly long tests that cover multiple unrelated behaviors.

Example:

```ts
import { test, expect } from '../fixtures/auth.fixture';

test.describe('Transactions', () => {
  test('should create an expense transaction', async ({ transactionsPage }) => {
    await transactionsPage.goto();

    await transactionsPage.createExpense({
      accountName: 'Main account',
      categoryName: 'Food',
      amount: '42.50',
      date: '2026-04-07',
      note: 'Lunch',
    });

    await expect(transactionsPage.successAlert).toBeVisible();
    await expect(transactionsPage.transactionRow('Lunch')).toBeVisible();
  });
});
```

## Angular-specific guidance

- Prefer selectors based on accessible roles, labels, and `data-testid`.
- Do not couple tests to Angular template structure.
- Do not assert Signals, NgRx internals, or component implementation details.
- Verify behavior through user actions and visible outcomes.
- For standalone components, place stable selectors on important interaction boundaries.

## Backend-aware guidance

For flows backed by NestJS APIs:

- prefer API-based setup when it makes tests faster and less brittle
- keep end-user verification in the UI
- cover important validation and authorization behavior
- verify dashboard and report values against seeded or arranged data when appropriate

## Anti-patterns

Never generate Playwright tests that:

- use `waitForTimeout` for normal synchronization
- assert Tailwind classes
- rely on brittle CSS selectors
- chain several unrelated user journeys in one test
- reuse state implicitly between tests
- bury important logic in giant helper abstractions
- use `beforeEach` for expensive setup unless every test truly needs it
- click through long UI flows just to create prerequisite data when API setup is available

## Output expectations

When asked to create or update Playwright tests:

1. Reuse existing fixtures, page objects, and helpers when they fit.
2. Do not duplicate logic that already exists.
3. If a stable selector is missing, suggest the exact `data-testid` to add.
4. Generate complete and runnable TypeScript.
5. Keep assumptions brief and explicit.
6. Prefer code that fits naturally into an Nx monorepo structure.
