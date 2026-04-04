# Session-Based Write Flow with NgRx Store and API Persistence

## Context

Guest mode writes locally, while authenticated mode persists through API and PostgreSQL.

## Diagram

```mermaid
flowchart TD
    A[User Input] --> B[Feature UI]
    B --> C[Session Check]
    C --> D{Mode}
    D -->|Guest| E[Write to local guest state]
    E --> F[NgRx / Signal Store]
    F --> G[UI Refresh]
    D -->|Authenticated| H[HTTP Data Access]
    H --> I[NestJS API]
    I --> J[(PostgreSQL)]
    J --> I
    I --> K[Returned data + computed data]
    K --> F
```

## Notes

- Feature components should not depend directly on auth state.
- Session mode decides which write path is used.
- Authenticated writes are confirmed by the backend before store update.
