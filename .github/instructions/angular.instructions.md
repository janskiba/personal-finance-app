---
description: Angular-specific instructions for generating and reviewing code in the frontend directory
applyTo: 'frontend/**/*.ts'
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

- Prefer standalone components for new Angular code.
- Build Angular code for a zoneless architecture. Prefer explicit reactive updates and patterns that work well with zoneless change detection.
- Use signals where possible for local state, derived state, and component reactivity. Prefer `signal`, `computed`, and `effect` when they fit the use case.
- Keep each component in a single TypeScript file whenever practical. Use inline templates and avoid separate HTML and CSS files for standard components.
- Use `ChangeDetectionStrategy.OnPush` for all components by default.
- Follow the repository's existing styling conventions for components. Prefer template-applied utility classes only when a utility-first CSS framework is already part of the project and doing so keeps the markup readable.
- Keep components focused on presentation and UI orchestration.
- Do not place complex business logic in components or templates.
- Keep templates simple and readable; avoid complex inline expressions.
- Prefer moving derived state and transformation logic into `computed`, helpers, presenters, or services.
- Prefer strongly typed `input`, `output`, forms, models, and API mappings.
- Reuse and verify shared domain types from `packages/types` before introducing frontend-local duplicates.
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
