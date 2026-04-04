# Personal Finance App

A small fullstack project built for learning and practice.

This app is developed to learn how to build a fullstack application with:

- NestJS
- PostgreSQL
- Nx
- Angular
- Tailwind CSS
- NgRx

The goal is to improve architecture, API design, state management, and clean project organization in a real-world style setup.

## Viewing Mermaid Diagrams

Some documentation files in `docs/` include Mermaid diagrams, for example `docs/guest-vs-authenticated-data-flow.md`.

You can view them in a few ways:

- **VS Code Markdown Preview**: open the Markdown file and press `Ctrl+Shift+V`, or use **Open Preview to the Side**.
- **GitHub**: Mermaid code blocks render automatically when viewing the Markdown file in the repository web UI.
- **Other editors/viewers**: use any Markdown viewer that supports Mermaid fenced blocks (` ```mermaid `).

## Local Setup (PostgreSQL + API)

1. Create local environment file:

```bash
cp .env.example .env
```

2. Start local PostgreSQL with Docker Compose:

```bash
docker compose up -d
```

3. Start API:

```bash
pnpm nx serve backend
```

The API reads database connection settings from environment variables (`DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_URL`) and is expected to connect to the local PostgreSQL instance from Docker Compose.

## Basic Nx Commands

Use these commands from the workspace root.

```bash
# Start apps in development mode
pnpm nx serve frontend
pnpm nx serve backend

# Build projects
pnpm nx build frontend
pnpm nx build backend
pnpm nx build types
pnpm nx build utils

# Run tests
pnpm nx test frontend
pnpm nx test backend

# Run frontend e2e tests
pnpm exec playwright install #run only once before first test execution
pnpm nx e2e frontend-e2e

# Lint projects
pnpm nx lint frontend
pnpm nx lint backend

# Run one target across many projects
pnpm nx run-many -t build
pnpm nx run-many -t test

# Run target only for changed/affected projects
pnpm nx affected -t lint
pnpm nx affected -t test
pnpm nx affected -t build

# Inspect dependency graph
pnpm nx graph
pnpm nx graph --affected
```
