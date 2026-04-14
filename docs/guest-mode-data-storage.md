````mermaid
flowchart TD
    A[User enters app in guest mode] --> B{Guest data exists in localStorage?}
    B -- Yes --> C[Load data from localStorage]
    B -- No --> D[Load seed data from static JSON file]
    C --> E[Hydrate NgRx store]
    D --> E[Hydrate NgRx store]
    E --> F[User edits data]
    F --> G[Save updated guest data to localStorage]
````
