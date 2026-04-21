# Syncer Test

## Health & Status

### HTTP Health Endpoint

The syncer exposes a lightweight health check endpoint for load balancers and uptime monitors.

- **URL**: `GET /health`
- **Example Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-04-21T12:00:00.000Z"
  }
  ```

Start the server with:

```bash
npm start
```

The server listens on port `3000` by default. Set `PORT` to override:

```bash
PORT=8080 npm start
```

### CLI Status Command

Check system status from the command line:

```bash
npx syncer status
```

Example output:

```
Health Endpoint: reachable
Version: 0.0.1
Uptime: 0s
```

The command exits with code `0` when the health endpoint is reachable, and `1` otherwise.

Set `SYNCER_HEALTH_URL` to point to a different health endpoint:

```bash
SYNCER_HEALTH_URL=http://localhost:8080/health npx syncer status
```
