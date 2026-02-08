# Phase IV: Dockerization & Kubernetes Deployment

Phase IV of the TodoFlow project focuses on containerizing the entire application stack and deploying it to a local Kubernetes cluster using Helm.

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) installed
- [Helm](https://helm.sh/docs/intro/install/) installed
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed

---

## Option 1: Docker Compose (Simple)

Best for quick local development.

### Step 1: Setup Environment

```bash
cd phase-IV
cp .env.example .env
# Edit .env with your actual credentials
```

### Step 2: Run

```bash
docker compose up --build
```

### Step 3: Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/docs

---

## Option 2: Kubernetes with Helm (Production-like)

Best for testing production deployment workflows.

### Step 1: Start Minikube

```powershell
minikube start
minikube addons enable ingress
```

### Step 2: Setup Environment

```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### Step 3: Build Docker Images

```powershell
# Build Backend
docker build -t todo-backend:latest ./backend

# Build Frontend (with API URL for localhost)
docker build -t todo-frontend:latest --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000/api ./frontend
```

### Step 4: Load Images into Minikube

```powershell
minikube image load todo-backend:latest
minikube image load todo-frontend:latest
```

### Step 5: Deploy with Script

```powershell
./scripts/deploy.ps1
```

When prompted with "Do you want to start LOCAL PORT-FORWARDING instead? (y/n)", enter `y`.

### Step 6: Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/docs

---

## 📁 Project Structure

```
phase-IV/
├── backend/                 # FastAPI backend
│   ├── Dockerfile
│   └── ...
├── frontend/                # Next.js frontend
│   ├── Dockerfile
│   └── ...
├── helm-chart/              # Helm chart for Kubernetes
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
├── scripts/
│   └── deploy.ps1           # Automated deployment script
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔧 Useful Commands

### Check Pod Status

```powershell
kubectl get pods
```

### View Pod Logs

```powershell
kubectl logs -l app=todo-backend
kubectl logs -l app=todo-frontend
```

### Manual Port Forwarding

```powershell
kubectl port-forward svc/todo-frontend 3000:80
kubectl port-forward svc/todo-backend 8000:8000
```

### Helm Commands

```powershell
helm list                    # List releases
helm status todo-app         # Check release status
helm uninstall todo-app      # Remove deployment
```

### Minikube Commands

```powershell
minikube status              # Check cluster status
minikube stop                # Stop cluster
minikube delete              # Delete cluster
```

---

## 🔒 Security Notes

- **Never commit `.env`** - It contains your real secrets
- **`.env.example`** is safe to commit - It only contains placeholders
- **`values.yaml`** uses placeholder values - Real secrets are injected at deploy time by `deploy.ps1`

---

## 🏗️ Architecture

### Docker Images

- **Backend**: `python:3.12-slim` with `uv` package manager
- **Frontend**: `node:20-alpine` with Next.js standalone output

### Kubernetes Resources

- **Deployments**: Backend and Frontend pods
- **Services**: ClusterIP services for internal communication
- **Secrets**: Managed via Helm from `.env` file
- **Ingress**: Optional nginx ingress for domain-based access

---

## 🐛 Troubleshooting

### Pods not starting?

```powershell
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Port already in use?

Close any existing port-forward terminals before running `deploy.ps1` again.

### Image not updating?

```powershell
docker build --no-cache -t todo-frontend:latest ./frontend
minikube image load todo-frontend:latest
./scripts/deploy.ps1
```
