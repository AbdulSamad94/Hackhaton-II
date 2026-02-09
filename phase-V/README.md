# Phase V: Advanced Cloud Deployment & Event-Driven Architecture

Phase V transforms the TodoFlow application into a scalable, event-driven microservices architecture using **Kafka** and **Dapr**, ready for cloud deployment.

## 🚀 Key Features

- **Advanced Task Management**: Due dates, priorities, tags, and recurrence.
- **Event-Driven Architecture**: Decoupled services communicating via Kafka topics.
- **Microservices**:
  - **Backend**: Core API (FastAPI).
  - **Notification Service**: Handles reminders (Python/Dapr).
  - **Recurring Task Service**: Manages recurring task logic (Python/Dapr).
- **Infrastructure**:
  - **Kubernetes**: Orchestration with Helm charts.
  - **Dapr**: Sidecar pattern for pub/sub and state management.
  - **Strimzi**: Kafka operator for Kubernetes.
  - **Neon DB**: Serverless PostgreSQL for state store.
- **CI/CD**: GitHub Actions for automated build and deploy.

## 🛠️ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) with `ingress` addon
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [GitHub Account](https://github.com/) (for GHCR and Actions)

---

## 📦 Architecture Overview

### Components

1.  **Frontend**: Next.js application (LoadBalancer/Ingress).
2.  **Backend**: FastAPI application with Dapr sidecar.
3.  **Kafka**: Message broker managed by Strimzi.
4.  **Dapr**:
    - **PubSub**: Interfaces with Kafka (`task-updates`, `reminders`).
    - **StateStore**: Interfaces with PostgreSQL (`statestore`).
5.  **Microservices**: Independent Dapr-enabled Python services.

### Event Flow

- **Task Created/Updated** -> Backend publishes to `task-updates` -> Recurring Service consumes.
- **Task Due** -> Backend/Scheduler publishes to `reminders` -> Notification Service consumes.

---

## 🏃 Quick Start (Local Kubernetes)

### 1. Start Infrastructure

```bash
minikube start
minikube addons enable ingress
```

### 2. Install Operators

```bash
# Strimzi Kafka
helm repo add strimzi https://strimzi.io/charts/
helm install strimzi-kafka-operator strimzi/strimzi-kafka-operator --namespace kafka --create-namespace

# Dapr
helm repo add dapr https://dapr.github.io/helm-charts/
helm upgrade --install dapr dapr/dapr --namespace dapr-system --create-namespace
```

### 3. Deploy Configuration

```bash
# Kafka Cluster & Topics
kubectl apply -f kafka/

# Dapr Components (requires DB secret)
kubectl create secret generic postgres-secret --from-literal=connectionString="YOUR_CONNECTION_STRING"
kubectl apply -f dapr-components/
```

### 4. Deploy Application

```bash
# Update dependencies
helm dependency update ./helm-chart

# Deploy
helm upgrade --install todo-app ./helm-chart \
  --set secrets.DATABASE_URL="..." \
  --set secrets.SECRET_KEY="..."
  # ... other secrets
```

---

## ☁️ Cloud Deployment (CI/CD)

The project includes a GitHub Actions workflow `.github/workflows/deploy.yml` that:

1.  Builds Docker images for all services.
2.  Pushes images to GitHub Container Registry (GHCR).
3.  Deploys to the configured Kubernetes cluster using Helm.

### Setup

1.  Add `KUBECONFIG` secret to GitHub Repository.
2.  Add application secrets (`DATABASE_URL`, `SECRET_KEY`, etc.) to GitHub Secrets.
3.  Push to `main` branch to trigger deployment.

---

## 📂 Project Structure

```
phase-V/
├── backend/                 # Core API
├── frontend/                # Next.js UI
├── services/                # Microservices
│   ├── notification-service/
│   └── recurring-task-service/
├── kafka/                   # Strimzi manifests
├── dapr-components/         # Dapr CRDs
├── helm-chart/              # Unified Helm chart
└── .github/workflows/       # CI/CD pipeline
```
