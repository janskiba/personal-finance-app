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
pnpm nx test backend-e2e
pnpm nx test frontend-e2e

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
