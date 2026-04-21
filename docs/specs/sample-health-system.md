# Sample Spec: Add Health Check Endpoint and CLI Status Command

## Overview
Add a lightweight health check system to the syncer project so external monitors and users can verify system status without triggering heavy operations.

## Leaves

### Leaf 1: HTTP Health Endpoint
- **What**: Add a `GET /health` endpoint that returns `{ "status": "ok", "timestamp": "ISO8601" }` with HTTP 200.
- **Why**: Load balancers and uptime monitors need a cheap endpoint.
- **Acceptance Criteria**:
  - Returns JSON with `status` and `timestamp` fields.
  - Does not depend on any external service (no DB, no cache).
  - Response time < 50ms.
- **Complexity**: quick
- **Dependencies**: none

### Leaf 2: Health Module Unit Tests
- **What**: Write unit tests for the health endpoint logic.
- **Why**: Prevent regressions if the endpoint logic grows later.
- **Acceptance Criteria**:
  - Tests verify JSON shape and 200 status.
  - Tests verify timestamp is a valid ISO8601 string.
  - Runs with the project's existing test runner.
- **Complexity**: quick
- **Dependencies**: Leaf 1 (endpoint must exist to test)

### Leaf 3: CLI Status Command
- **What**: Add a CLI command `syncer status` that prints a human-readable status table.
- **Why**: Users running the tool locally should see basic diagnostics.
- **Acceptance Criteria**:
  - Prints `Health Endpoint: reachable / unreachable`.
  - Prints `Version: <from package.json>`.
  - Prints `Uptime: <duration>`.
  - Exits with code 0 if healthy, 1 if not.
- **Complexity**: deep
- **Dependencies**: Leaf 1 (needs health endpoint to call)

### Leaf 4: README Documentation
- **What**: Document the new `/health` endpoint and `syncer status` CLI in README.
- **Why**: Users and integrators need to know these exist.
- **Acceptance Criteria**:
  - Section `## Health & Status` added to README.
  - Includes endpoint URL, example JSON response, and CLI usage.
- **Complexity**: quick
- **Dependencies**: Leaf 2, Leaf 3 (docs should cover tested/complete features)

## Dependency Graph

```
Leaf 1 (HTTP Health Endpoint)
  ├── Leaf 2 (Unit Tests)
  └── Leaf 3 (CLI Status)
        └── Leaf 4 (README Docs)
```

Topological order: **1 → 2 → 3 → 4** (2 and 3 are independent after 1)

## Notes
- Keep all code in the existing project structure.
- Use the project's existing dependencies where possible.
- Do not introduce new runtime dependencies.
