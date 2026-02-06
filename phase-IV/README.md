# Phase IV: Dockerization & Production-Ready Setup

Phase IV of the TodoFlow project focuses on containerizing the entire application stack and implementing industry-standard practices for environment management and cloud deployment.

## Key Features

### 1. Full Stack Dockerization

- **Backend**: Multi-stage build using `python:3.12-slim` and **`uv`** for lightweight, high-performance images.
- **Frontend**: Optimized multi-stage build using **Next.js Standalone output**, reducing image size by over 80%.
- **Orchestration**: A unified `docker-compose.yml` that manages both services and their networking.

### 2. Production-Ready Environments

- **Variable Substitution**: Use of `${VARIABLE_NAME}` in Docker Compose allows the same configuration to work locally and in the cloud.
- **Centralized Secrets**: A single `.env` file at the root handles all configuration for both services.
- **Security**: Containers run as **non-root users** (`appuser` and `nextjs`) for enhanced security.

### 3. NeonDB Cloud Integration

- The setup is pre-configured to connect to your **NeonDB** PostgreSQL instance, ensuring your data lives in the cloud while your app runs in containers.

---

## Technical Architecture

### Infrastructure

- **Docker**: Containerization platform.
- **Docker Compose**: Orchestration tool for multi-container applications.
- **Alpine/Slim Images**: Minimal base images for security and speed.

---

## Getting Started (Docker Mode)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 1. Environment Setup

Create a `.env` file in the `phase-IV/` root directory (copy from `.env.example`).
All variables (Backend & Frontend) are now managed from this single file.

### 2. Start the Application

Run the following command from the `phase-IV/` directory:

```bash
docker compose up --build
```

### 3. Access the Services

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Deployment Concepts

- **Images**: Built once, run anywhere.
- **Registry**: Push images to Docker Hub or GitHub Container Registry.
- **Cloud Hosting**: Deploy to platforms like Render, Railway, or DigitalOcean by simply connecting your repo and setting your Enviroment Variables in their dashboard.

## Recent Optimizations

- **Build Arguments**: Resolved Better Auth build-time errors by passing the API URL during the build phase.
- **Fast Builds**: Leveraged Docker layer caching for rapid rebuilds.
- **Standalone Output**: Enabled Next.js standalone mode for professional-grade deployment.
