# Copilot Instructions

## General principles

- Follow the existing project structure, naming conventions, and coding style before introducing new patterns.
- Prefer small, focused, low-risk changes over broad refactors unless a refactor is explicitly requested.
- Do not change public contracts, API behavior, or file organization without a clear reason.
- When requirements are unclear, ask a clarifying question instead of guessing.
- Prefer readable and maintainable code over clever or overly abstract solutions.
- Avoid duplication; extract shared logic only when it improves clarity and reuse.
- Keep generated code production-oriented, not tutorial-style.

## Code quality

- Use strong typing and explicit types where they improve clarity.
- Avoid `any`; prefer `unknown` and narrow types explicitly when needed.
- Handle edge cases and failure paths intentionally.
- Keep functions and classes focused on a single responsibility.
- Use clear names that describe business meaning, not just technical shape.
- Do not add comments for obvious code; add comments only for non-obvious decisions, constraints, or tradeoffs.
- Preserve backward compatibility unless a breaking change is explicitly requested.

## Angular

- Prefer standalone components for new Angular code.
- Build Angular code for a zoneless architecture. Prefer explicit reactive updates and patterns that work well with zoneless change detection.
- Use signals where possible for local state, derived state, and component reactivity. Prefer `signal`, `computed`, and `effect` when they fit the use case.
- Keep each component in a single TypeScript file whenever practical. Use inline templates and avoid separate HTML and CSS files for standard components.
- Use onPush change detection strategy for all components by default.
- Follow the repository's existing styling conventions for components. Prefer template-applied utility classes only when a utility-first CSS framework is already part of the project and doing so keeps the markup readable.- Keep components focused on presentation and UI orchestration.
- Do not place complex business logic in components or templates.
- Keep templates simple and readable; avoid complex inline expressions.
- Prefer moving derived state and transformation logic into `computed`, helpers, presenters, or services.
- Prefer strongly typed `input`, `output`, forms, models, and API mappings.
- Prefer reactive patterns and predictable state flow.
- For non-trivial forms, prefer Reactive Forms.
- Keep HTTP calls, DTO mapping, and backend integration logic out of components.
- Use services or dedicated data-access layers for API communication.
- Prefer the `async` pipe in templates when subscribing to observables for rendering.
- When a manual subscription is unavoidable, use `takeUntilDestroyed` to manage observable lifecycles safely.
- If state changes are not driven by signals, template events, or the `async` pipe, use explicit Angular mechanisms such as `ChangeDetectorRef.markForCheck()` where appropriate.
- Build components with WCAG support in mind. Use semantic HTML, proper form labels, keyboard accessibility, visible focus states, sufficient color contrast, accessible error messages, and ARIA only when necessary.
- Do not assume Tailwind or a component library makes the UI accessible by default; accessibility must be preserved in markup, behavior, and styling.
- For list rendering, use stable identity tracking such as `trackBy` or the appropriate Angular control-flow mechanism.
- Prefer reusable presentational components when UI patterns repeat.

## Node.js API

- Design APIs around resources and use cases, not around frontend screens.
- Keep controllers thin: validate input, call application logic, and shape the response.
- Put business logic in services or use-case layers, not in controllers.
- Isolate persistence logic in repositories or dedicated data-access modules.
- Validate all external input.
- Return predictable HTTP status codes and response shapes.
- Do not leak internal errors, stack traces, SQL details, or infrastructure details in API responses.
- Handle common failure paths intentionally, including 400, 401, 403, 404, 409, 422, and 500 where appropriate.
- Keep DTOs, domain models, and persistence models separated when the project structure supports it.
- Be explicit about authentication, authorization, and validation.
- Never log secrets, passwords, tokens, or sensitive personal data.
- Add structured logs with enough context for debugging, but keep them safe.
- Prefer idempotent behavior for operations where retries are likely.
- If an API contract changes, call out compatibility impact clearly.

## Security

- Treat all user input as untrusted.
- Validate, sanitize, and constrain inputs at system boundaries.
- Prefer safe defaults.
- Do not hardcode secrets or credentials.
- Do not introduce insecure fallback behavior just to make code “work.”
- Flag security-sensitive changes clearly when authentication, authorization, file handling, tokens, or personal data are involved.

## Testing

- When adding or changing behavior, add or update tests where appropriate.
- Prefer unit tests for business logic and integration tests for critical API flows.
- Test observable behavior, not implementation details.
- Cover success paths, validation failures, and important edge cases.
- Do not remove tests just to make the build pass unless explicitly instructed.

## Documentation

- Keep code self-explanatory first; document decisions, not obvious syntax.
- If a change introduces a new pattern, config, script, or workflow expectation, update the relevant documentation.
- Summaries should be concise and action-oriented.

## Pull requests and reviews

- Generate changes that are easy to review.
- Prefer a sequence of coherent edits over scattered unrelated modifications.
- If a change is risky, state assumptions, limitations, and follow-up recommendations.
- Call out breaking changes, migrations, or required configuration updates.

## Commits

- Write commit messages in Conventional Commits style.
- Always prefix the commit message with the task ID inferred from the current branch name when one is present. This prefix is required, not optional.
- Format: `<task-id>: <type>(optional-scope): short imperative summary`
- If the current branch matches a task pattern such as `SCRUM-57-base-flow-diagram`, the commit message must start with `SCRUM-57:`.
- If no task ID can be inferred from the branch name, use the standard Conventional Commits format without the task prefix.
- Example full commit message: `SCRUM-22: feat(ai): add Copilot repository instructions`
- Keep commits small and focused. One commit should represent one clear change or concern.
- Keep commit messages short and easy to scan.
- Prefer a concise subject line, ideally around 50 characters when possible.
- Keep the subject line concise and specific.
- Use imperative mood, for example `add`, `fix`, `refactor`, not `added`, `fixed`, or `refactored`.
- Avoid vague messages such as `update code`, `fix stuff`, or `changes`.
- Allowed types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `build`
- Mention the reason in the body when it adds useful context.
- If the change is breaking, clearly mark it and describe the impact.

## Working style

- Before generating code, consider whether the change belongs in the current file or should be moved to a more appropriate layer.
- Prefer existing project utilities, abstractions, and patterns over introducing new dependencies.
- If multiple valid options exist, prefer the one that is simplest, most consistent with the repository, and easiest to maintain.
- When useful, propose a short validation checklist after the code change.

## References

- Angular official docs: [Angular](https://angular.dev)
- Angular accessibility guidance: [Angular Accessibility](https://angular.dev/best-practices/a11y)
- Angular ARIA guidance: [Angular ARIA](https://angular.dev/guide/aria/overview)
- Zoneless Angular: [Angular Zoneless](https://angular.dev/guide/zoneless)
- RxJS interop and cleanup: [takeUntilDestroyed](https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed)

- NestJS official docs: [NestJS](https://docs.nestjs.com)
- NestJS fundamentals and architecture: [NestJS Architecture](https://docs.nestjs.com)

- NgRx platform: [NgRx Platform](https://github.com/ngrx/platform)
- NgRx learning resources: [NgRx Guides](https://this-is-angular.github.io/angular-guides/docs/frameworks-and-libraries/ngrx)
