# Stage 1: Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copy project files
COPY pyproject.toml ./

# Install dependencies into a prefix
RUN uv pip install --no-cache --prefix=/install -r pyproject.toml

# Stage 2: Final image
FROM python:3.11-slim

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY main.py .

# Expose the port
EXPOSE 8002

# Command to run the application
CMD ["python", "main.py"]
