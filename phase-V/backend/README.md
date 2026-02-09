# Backend - Dockerized FastAPI

This is the containerized FastAPI backend for Phase IV, optimized for performance, security, and cloud deployment.

## Dockerization Strategy

### 1. High-Performance Base

- Uses `python:3.12-slim` for a balance between size and compatibility.
- Leverages **`uv`** (the fastest Python package manager) for near-instant dependency installation inside the container.

### 2. Multi-Stage Build

Our `Dockerfile` uses two stages:

- **Builder Stage**: Installs `uv` and all dependencies from `pyproject.toml` into a specific directory.
- **Final Stage**: Copies only the installed packages and the application code. This keeps the final image small and secure (no build tools left in the final box).

### 3. Security Hardening

- **Non-Root User**: The application runs under `appuser` instead of `root`, preventing attackers from gaining full system access if a vulnerability is exploited.
- **Dockerignore**: Explicitly excludes `.venv`, `__pycache__`, and sensitive local `.env` files from being copied into the image.

---

## Configuration

The backend is designed for **Production-Ready Environment Management**:

- **Run-time Variables**: Sensitive data (DB URLs, API Keys) are injected at run-time via Docker Compose.
- **No Hardcoding**: The application reads from the container environment, making it perfect for cloud platforms like Render or Railway.

---

## Local Development (Docker)

To run the backend as part of the full stack:

```bash
# From the phase-IV root
docker compose up --build backend
```

## Local Development (Manual)

If you need to run it without Docker for debugging:

```bash
# Using uv
uv sync
uvicorn main:app --reload
```
