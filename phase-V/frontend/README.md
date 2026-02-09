# Frontend - Dockerized Next.js

This is the containerized Next.js frontend for Phase IV, featuring enterprise-grade build optimizations and safe environment handling.

## Dockerization Strategy

### 1. Standalone Output Optimization

We have enabled `output: 'standalone'` in `next.config.ts`.

- **What it does**: Instead of requiring the entire `node_modules` folder, Next.js builds a single, minimal `server.js` file that contains only the code needed to run the app.
- **Benefit**: Reduces the final Docker image size from ~1GB to **less than 150MB**.

### 2. Multi-Stage Build

Our `Dockerfile` follows three distinct stages for maximum efficiency:

- **`deps` stage**: Installs only the necessary packages (using `pnpm`).
- **`builder` stage**: Compiles the app and generates the standalone output.
- **`runner` stage**: The final production image. It only contains the bare minimum files and is based on the lightweight `node:20-alpine` image.

### 3. Build-Time vs Run-Time Envs

- **Build-Time (`ARG`)**: Next.js requires `NEXT_PUBLIC_` variables to be available during the build phase to "bake" them into the JavaScript. We pass these via Docker `args`.
- **Run-Time (`ENV`)**: Any changes made to environment variables after the build (at run-time) will be picked up by the server if they don't start with `NEXT_PUBLIC_`.

---

## Local Development (Docker)

To run the frontend as part of the full stack:

```bash
# From the phase-IV root
docker compose up --build frontend
```

To run only the frontend:

```bash
docker compose up frontend
```

## Security

- **Non-Root User**: The application is executed by the `nextjs` user for system safety.
- **Sensitive Files**: `.dockerignore` ensures that local logs, node_modules, and build caches are never included in the production image.
