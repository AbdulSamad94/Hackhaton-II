# Phase V: Advanced Cloud Deployment - Complete Guide

Welcome to the final phase! This is where you take your Todo Chatbot from local Kubernetes (Minikube) to production-ready cloud deployment with advanced features.

---

## 🎯 Phase V Overview

### What You'll Build:

**Part A: Advanced Features**

- Recurring Tasks (auto-reschedule repeating tasks)
- Due Dates & Time Reminders (browser notifications)
- Priorities & Tags/Categories
- Search & Filter
- Sort Tasks

**Part B: Event-Driven Architecture**

- Kafka for event streaming
- Dapr for microservices runtime

**Part C: Cloud Deployment**

- Deploy to real cloud Kubernetes (Azure AKS, Google GKE, or Oracle OKE)
- Production-grade setup
- CI/CD with GitHub Actions

---

## The Big Picture: What Changes in Phase V

```
Phase IV (Local):                    Phase V (Cloud):
┌─────────────────┐                 ┌─────────────────────────────────┐
│   Minikube      │                 │   Cloud Kubernetes (AKS/GKE)    │
│                 │                 │                                 │
│ ┌─────────────┐ │                 │ ┌─────────────────────────────┐ │
│ │ Frontend    │ │                 │ │ Frontend (with LoadBalancer)│ │
│ └─────────────┘ │                 │ └─────────────────────────────┘ │
│ ┌─────────────┐ │                 │ ┌─────────────────────────────┐ │
│ │ Backend     │ │    ──────▶      │ │ Backend + Dapr Sidecar      │ │
│ └─────────────┘ │                 │ └─────────────────────────────┘ │
│                 │                 │ ┌─────────────────────────────┐ │
│                 │                 │ │ Kafka Cluster (Events)      │ │
│                 │                 │ └─────────────────────────────┘ │
│                 │                 │ ┌─────────────────────────────┐ │
│                 │                 │ │ Notification Service        │ │
│                 │                 │ └─────────────────────────────┘ │
│                 │                 │ ┌─────────────────────────────┐ │
│                 │                 │ │ Recurring Task Service      │ │
└─────────────────┘                 │ └─────────────────────────────┘ │
                                    └─────────────────────────────────┘
```

---

## Prerequisites

Before starting Phase V, you must have:

- ✅ Completed Phase IV (Minikube deployment working)
- ✅ Docker images built and working
- ✅ Helm charts created and tested
- ✅ Basic todo operations working

---

## Phase V Journey - 3 Main Parts

### Part A: Add Advanced Features (Local First)

### Part B: Add Kafka & Dapr (Local Testing)

### Part C: Deploy to Cloud (Production)

---

# PART A: ADVANCED FEATURES

## Step 1: Add Due Dates & Reminders

### 1.1 Update Database Schema

Add new fields to your Task model:

**Backend: Update your SQLModel Task class:**

```python
from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str
    title: str
    description: Optional[str] = None
    completed: bool = False

    # NEW FIELDS
    due_date: Optional[datetime] = None
    priority: Optional[str] = "medium"  # low, medium, high
    tags: Optional[str] = None  # comma-separated
    recurring: Optional[str] = None  # daily, weekly, monthly

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 1.2 Update MCP Tools

Add parameters to your MCP tools to support new fields:

**MCP Tool: add_task (updated)**

```python
{
    "name": "add_task",
    "parameters": {
        "user_id": "string",
        "title": "string",
        "description": "string (optional)",
        "due_date": "datetime (optional)",
        "priority": "string (optional): low|medium|high",
        "tags": "string (optional): comma-separated",
        "recurring": "string (optional): daily|weekly|monthly"
    }
}
```

### 1.3 Frontend: Add Date Picker

**Install date picker library:**

```bash
npm install react-datepicker
```

**Update your task form:**

```typescript
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// In your form component
const [dueDate, setDueDate] = useState<Date | null>(null);
const [priority, setPriority] = useState("medium");
const [tags, setTags] = useState("");

// Add to your form JSX
<DatePicker
  selected={dueDate}
  onChange={(date) => setDueDate(date)}
  showTimeSelect
  dateFormat="Pp"
  placeholderText="Select due date"
/>

<select value={priority} onChange={(e) => setPriority(e.target.value)}>
  <option value="low">Low Priority</option>
  <option value="medium">Medium Priority</option>
  <option value="high">High Priority</option>
</select>
```

---

## Step 2: Add Search & Filter

### 2.1 Backend: Update list_tasks endpoint

```python
@app.get("/api/{user_id}/tasks")
async def list_tasks(
    user_id: str,
    status: Optional[str] = "all",
    priority: Optional[str] = None,
    tag: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = "created_at"
):
    query = select(Task).where(Task.user_id == user_id)

    # Filter by status
    if status == "pending":
        query = query.where(Task.completed == False)
    elif status == "completed":
        query = query.where(Task.completed == True)

    # Filter by priority
    if priority:
        query = query.where(Task.priority == priority)

    # Filter by tag
    if tag:
        query = query.where(Task.tags.contains(tag))

    # Search in title/description
    if search:
        query = query.where(
            or_(
                Task.title.contains(search),
                Task.description.contains(search)
            )
        )

    # Sort
    if sort_by == "due_date":
        query = query.order_by(Task.due_date)
    elif sort_by == "priority":
        query = query.order_by(Task.priority)
    else:
        query = query.order_by(Task.created_at.desc())

    tasks = session.exec(query).all()
    return tasks
```

### 2.2 Frontend: Add Search Bar and Filters

```typescript
const [searchQuery, setSearchQuery] = useState("");
const [filterPriority, setFilterPriority] = useState("");
const [filterTag, setFilterTag] = useState("");

// Fetch tasks with filters
const fetchTasks = async () => {
  const params = new URLSearchParams({
    status: statusFilter,
    ...(searchQuery && { search: searchQuery }),
    ...(filterPriority && { priority: filterPriority }),
    ...(filterTag && { tag: filterTag }),
  });

  const response = await fetch(`/api/${userId}/tasks?${params}`);
  const tasks = await response.json();
  setTasks(tasks);
};
```

---

# PART B: KAFKA & DAPR SETUP

## Step 3: Install Kafka Locally (Minikube)

### 3.1 Install Strimzi Operator (Kafka on Kubernetes)

```bash
# Create Kafka namespace
kubectl create namespace kafka

# Install Strimzi operator
kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n kafka

# Wait for operator to be ready
kubectl get pods -n kafka -w
```

### 3.2 Create Kafka Cluster

**Create file:** `kafka-cluster.yaml`

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: todo-kafka
  namespace: kafka
spec:
  kafka:
    version: 3.6.0
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
      - name: tls
        port: 9093
        type: internal
        tls: true
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
      default.replication.factor: 1
      min.insync.replicas: 1
    storage:
      type: ephemeral
  zookeeper:
    replicas: 1
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
```

**Deploy Kafka:**

```bash
kubectl apply -f kafka-cluster.yaml -n kafka

# Wait for Kafka to be ready (takes 2-5 minutes)
kubectl get pods -n kafka -w
```

### 3.3 Create Kafka Topics

**Create file:** `kafka-topics.yaml`

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: task-events
  namespace: kafka
  labels:
    strimzi.io/cluster: todo-kafka
spec:
  partitions: 3
  replicas: 1
  config:
    retention.ms: 604800000 # 7 days
---
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: reminders
  namespace: kafka
  labels:
    strimzi.io/cluster: todo-kafka
spec:
  partitions: 3
  replicas: 1
---
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: task-updates
  namespace: kafka
  labels:
    strimzi.io/cluster: todo-kafka
spec:
  partitions: 3
  replicas: 1
```

**Deploy topics:**

```bash
kubectl apply -f kafka-topics.yaml -n kafka

# Verify topics created
kubectl get kafkatopics -n kafka
```

---

## Step 4: Install Dapr

### 4.1 Install Dapr CLI

**Windows:**

```powershell
powershell -Command "iwr -useb https://raw.githubusercontent.com/dapr/cli/master/install/install.ps1 | iex"
```

**Mac/Linux:**

```bash
wget -q https://raw.githubusercontent.com/dapr/cli/master/install/install.sh -O - | /bin/bash
```

### 4.2 Initialize Dapr on Kubernetes

```bash
# Initialize Dapr on your Minikube cluster
dapr init -k

# Verify Dapr is installed
kubectl get pods -n dapr-system

# Should see:
# dapr-operator
# dapr-placement-server
# dapr-sentry
# dapr-sidecar-injector
```

### 4.3 Create Dapr Components

**Create file:** `dapr-components/pubsub.yaml`

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: kafka-pubsub
  namespace: default
spec:
  type: pubsub.kafka
  version: v1
  metadata:
    - name: brokers
      value: "todo-kafka-kafka-bootstrap.kafka.svc.cluster.local:9092"
    - name: consumerGroup
      value: "todo-service"
    - name: authType
      value: "none"
```

**Create file:** `dapr-components/statestore.yaml`

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
  namespace: default
spec:
  type: state.postgresql
  version: v1
  metadata:
    - name: connectionString
      secretKeyRef:
        name: todo-secrets
        key: database-url
```

**Deploy Dapr components:**

```bash
kubectl apply -f dapr-components/
```

---

## Step 5: Create Event-Driven Services

### 5.1 Notification Service

**Create:** `services/notification-service/main.py`

```python
from fastapi import FastAPI
from dapr.clients import DaprClient
import json

app = FastAPI()

@app.post("/reminders")
async def handle_reminder(event: dict):
    """Dapr will call this when reminder event is published"""

    task_id = event["data"]["task_id"]
    user_id = event["data"]["user_id"]
    title = event["data"]["title"]

    # Send notification (email, push, etc.)
    print(f"🔔 Reminder: {title} for user {user_id}")

    # TODO: Implement actual notification logic
    # - Send email via SendGrid
    # - Send push notification
    # - Send SMS via Twilio

    return {"status": "notification_sent"}

# Dapr subscription
@app.get("/dapr/subscribe")
def subscribe():
    return [
        {
            "pubsubname": "kafka-pubsub",
            "topic": "reminders",
            "route": "/reminders"
        }
    ]
```

**Create Dockerfile:** `services/notification-service/Dockerfile`

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
```

**requirements.txt:**

```
fastapi==0.115.0
uvicorn[standard]==0.32.0
dapr==1.13.0
```

### 5.2 Recurring Task Service

**Create:** `services/recurring-task-service/main.py`

```python
from fastapi import FastAPI
from dapr.clients import DaprClient
from datetime import datetime, timedelta
import json

app = FastAPI()

@app.post("/task-completed")
async def handle_task_completed(event: dict):
    """When a recurring task is completed, create the next occurrence"""

    task = event["data"]["task"]

    if task.get("recurring"):
        # Calculate next due date
        if task["recurring"] == "daily":
            next_due = datetime.now() + timedelta(days=1)
        elif task["recurring"] == "weekly":
            next_due = datetime.now() + timedelta(weeks=1)
        elif task["recurring"] == "monthly":
            next_due = datetime.now() + timedelta(days=30)

        # Create new task via Dapr state
        with DaprClient() as client:
            new_task = {
                "user_id": task["user_id"],
                "title": task["title"],
                "description": task["description"],
                "due_date": next_due.isoformat(),
                "recurring": task["recurring"],
                "completed": False
            }

            # Publish event to create new task
            client.publish_event(
                pubsub_name="kafka-pubsub",
                topic_name="task-events",
                data=json.dumps({"type": "create", "task": new_task})
            )

    return {"status": "recurring_task_created"}

@app.get("/dapr/subscribe")
def subscribe():
    return [
        {
            "pubsubname": "kafka-pubsub",
            "topic": "task-events",
            "route": "/task-completed"
        }
    ]
```

### 5.3 Update Backend to Publish Events

**In your backend main.py, add Dapr client:**

```python
from dapr.clients import DaprClient
import json

# After creating a task
@app.post("/api/{user_id}/tasks")
async def create_task(user_id: str, task: TaskCreate):
    # ... create task in database ...

    # Publish event to Kafka via Dapr
    with DaprClient() as client:
        event_data = {
            "type": "created",
            "task_id": new_task.id,
            "user_id": user_id,
            "task": {
                "title": new_task.title,
                "due_date": new_task.due_date.isoformat() if new_task.due_date else None,
                "recurring": new_task.recurring
            }
        }

        client.publish_event(
            pubsub_name="kafka-pubsub",
            topic_name="task-events",
            data=json.dumps(event_data)
        )

    return new_task

# When task is completed
@app.patch("/api/{user_id}/tasks/{task_id}/complete")
async def complete_task(user_id: str, task_id: int):
    # ... mark task as complete in database ...

    # Publish completion event
    with DaprClient() as client:
        event_data = {
            "type": "completed",
            "task_id": task_id,
            "task": task_dict
        }

        client.publish_event(
            pubsub_name="kafka-pubsub",
            topic_name="task-events",
            data=json.dumps(event_data)
        )

    return task
```

### 5.4 Update Backend Deployment with Dapr Sidecar

**In your Helm chart:** `templates/backend-deployment.yaml`

Add Dapr annotations:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "todo-app.fullname" . }}-backend
spec:
  template:
    metadata:
      labels:
        app: {{ include "todo-app.name" . }}-backend
      annotations:
        dapr.io/enabled: "true"
        dapr.io/app-id: "todo-backend"
        dapr.io/app-port: "8000"
        dapr.io/log-level: "debug"
    spec:
      containers:
      - name: backend
        # ... rest of container spec ...
```

---

## Step 6: Build and Deploy Event-Driven Services

### 6.1 Build Notification Service Image

```bash
cd services/notification-service

docker build -t notification-service:latest .
minikube image load notification-service:latest
```

### 6.2 Build Recurring Task Service Image

```bash
cd ../recurring-task-service

docker build -t recurring-task-service:latest .
minikube image load recurring-task-service:latest
```

### 6.3 Add to Helm Chart

**Create:** `helm-charts/todo-app/templates/notification-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notification-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: notification-service
  template:
    metadata:
      labels:
        app: notification-service
      annotations:
        dapr.io/enabled: "true"
        dapr.io/app-id: "notification-service"
        dapr.io/app-port: "8001"
    spec:
      containers:
        - name: notification
          image: notification-service:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 8001
```

Similar for recurring-task-service.

### 6.4 Deploy Updated Chart

```bash
# Upgrade your Helm deployment
helm upgrade todo-app ./helm-charts/todo-app

# Check all pods
kubectl get pods
```

You should now see:

- Frontend pods
- Backend pods (with Dapr sidecar)
- Notification service pods (with Dapr sidecar)
- Recurring task service pods (with Dapr sidecar)
- Kafka pods
- Dapr system pods

---

# PART C: CLOUD DEPLOYMENT

## Step 7: Choose Your Cloud Provider

You have 3 options (all have free credits):

### Option 1: Azure AKS (Recommended)

- **Free Credit:** $200 for 30 days
- **Sign up:** https://azure.microsoft.com/free
- **Best for:** Enterprise features, good documentation

### Option 2: Google Cloud GKE

- **Free Credit:** $300 for 90 days
- **Sign up:** https://cloud.google.com/free
- **Best for:** Kubernetes features, autopilot mode

### Option 3: Oracle Cloud OKE (Always Free!)

- **Free Credit:** $300 + Always Free tier
- **Sign up:** https://www.oracle.com/cloud/free
- **Best for:** Long-term learning, no credit card charges

---

## Step 8: Create Cloud Kubernetes Cluster

### For Azure AKS:

```bash
# Install Azure CLI
# Windows: Download from https://aka.ms/installazurecliwindows

# Login
az login

# Create resource group
az group create --name todo-app-rg --location eastus

# Create AKS cluster
az aks create \
  --resource-group todo-app-rg \
  --name todo-app-cluster \
  --node-count 2 \
  --node-vm-size Standard_B2s \
  --enable-addons monitoring \
  --generate-ssh-keys

# Get credentials
az aks get-credentials --resource-group todo-app-rg --name todo-app-cluster

# Verify connection
kubectl get nodes
```

### For Google Cloud GKE:

```bash
# Install gcloud CLI
# Windows: Download from https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Create cluster
gcloud container clusters create todo-app-cluster \
  --zone us-central1-a \
  --num-nodes 2 \
  --machine-type e2-medium

# Get credentials
gcloud container clusters get-credentials todo-app-cluster --zone us-central1-a

# Verify
kubectl get nodes
```

### For Oracle Cloud OKE:

```bash
# Install OCI CLI
# Follow: https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm

# Configure
oci setup config

# Create cluster via web console
# https://cloud.oracle.com/containers/clusters

# Download kubeconfig from console
# Set KUBECONFIG environment variable

kubectl get nodes
```

---

## Step 9: Push Images to Container Registry

You need a container registry for cloud deployment.

### Azure Container Registry:

```bash
# Create ACR
az acr create --resource-group todo-app-rg --name todoappregistry --sku Basic

# Login
az acr login --name todoappregistry

# Tag images
docker tag todo-frontend:latest todoappregistry.azurecr.io/todo-frontend:latest
docker tag todo-backend:latest todoappregistry.azurecr.io/todo-backend:latest
docker tag notification-service:latest todoappregistry.azurecr.io/notification-service:latest
docker tag recurring-task-service:latest todoappregistry.azurecr.io/recurring-task-service:latest

# Push images
docker push todoappregistry.azurecr.io/todo-frontend:latest
docker push todoappregistry.azurecr.io/todo-backend:latest
docker push todoappregistry.azurecr.io/notification-service:latest
docker push todoappregistry.azurecr.io/recurring-task-service:latest

# Attach ACR to AKS
az aks update \
  --resource-group todo-app-rg \
  --name todo-app-cluster \
  --attach-acr todoappregistry
```

### Google Container Registry:

```bash
# Tag images
docker tag todo-frontend:latest gcr.io/YOUR_PROJECT_ID/todo-frontend:latest
docker tag todo-backend:latest gcr.io/YOUR_PROJECT_ID/todo-backend:latest

# Push images
docker push gcr.io/YOUR_PROJECT_ID/todo-frontend:latest
docker push gcr.io/YOUR_PROJECT_ID/todo-backend:latest
```

---

## Step 10: Update Helm Chart for Cloud

### Update `values.yaml`:

```yaml
# Cloud-specific values
frontend:
  replicaCount: 2
  image:
    repository: todoappregistry.azurecr.io/todo-frontend
    tag: latest
    pullPolicy: Always # Changed from Never!
  service:
    type: LoadBalancer # Changed from ClusterIP!
    port: 80

backend:
  replicaCount: 2
  image:
    repository: todoappregistry.azurecr.io/todo-backend
    tag: latest
    pullPolicy: Always
  service:
    type: ClusterIP
    port: 8000

# Ingress for cloud
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: todo.yourdomain.com # Your actual domain
      paths:
        - path: /
          pathType: Prefix
          service: frontend
        - path: /api
          pathType: Prefix
          service: backend
  tls:
    - secretName: todo-tls
      hosts:
        - todo.yourdomain.com
```

---

## Step 11: Install Kafka on Cloud

### Using Redpanda Cloud (Recommended - Free Tier):

1. Sign up at https://redpanda.com/try-redpanda
2. Create a Serverless cluster (free)
3. Create topics: `task-events`, `reminders`, `task-updates`
4. Get connection details (bootstrap server, credentials)

**Update Dapr pubsub component:**

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: kafka-pubsub
spec:
  type: pubsub.kafka
  version: v1
  metadata:
    - name: brokers
      value: "YOUR-CLUSTER.cloud.redpanda.com:9092"
    - name: authType
      value: "password"
    - name: saslUsername
      value: "your-username"
    - name: saslPassword
      secretKeyRef:
        name: kafka-secrets
        key: password
```

### Or use Strimzi on Cloud Cluster:

Same as Step 3, but on your cloud cluster instead of Minikube.

---

## Step 12: Install Dapr on Cloud

```bash
# Install Dapr on cloud cluster
dapr init -k

# Verify
kubectl get pods -n dapr-system

# Deploy Dapr components
kubectl apply -f dapr-components/
```

---

## Step 13: Create Secrets on Cloud

```bash
# Create application secrets
kubectl create secret generic todo-secrets \
  --from-literal=database-url="YOUR_NEON_DB_URL" \
  --from-literal=openai-api-key="YOUR_OPENAI_KEY" \
  --from-literal=better-auth-secret="YOUR_AUTH_SECRET"

# Create Kafka secrets (if using Redpanda Cloud)
kubectl create secret generic kafka-secrets \
  --from-literal=password="YOUR_KAFKA_PASSWORD"
```

---

## Step 14: Deploy to Cloud

```bash
# Deploy everything
helm install todo-app ./helm-charts/todo-app

# Watch deployment
kubectl get pods -w

# Get external IP (for LoadBalancer)
kubectl get services

# Wait for EXTERNAL-IP to appear for frontend service
```

---

## Step 15: Setup Domain & SSL (Optional but Recommended)

### 15.1 Get a Domain

- Free: Freenom, .tk domains
- Paid: Namecheap, GoDaddy ($10/year)

### 15.2 Point Domain to LoadBalancer IP

In your domain DNS settings:

```
A Record: @ → <EXTERNAL-IP>
A Record: www → <EXTERNAL-IP>
```

### 15.3 Install cert-manager for SSL

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create Let's Encrypt issuer
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

Your app will now have HTTPS! 🔐

---

## Step 16: Setup CI/CD with GitHub Actions

**Create:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloud

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Login to Azure Container Registry
        uses: docker/login-action@v2
        with:
          registry: todoappregistry.azurecr.io
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}

      - name: Build and push frontend
        run: |
          cd frontend
          docker build -t todoappregistry.azurecr.io/todo-frontend:${{ github.sha }} .
          docker push todoappregistry.azurecr.io/todo-frontend:${{ github.sha }}

      - name: Build and push backend
        run: |
          cd backend
          docker build -t todoappregistry.azurecr.io/todo-backend:${{ github.sha }} .
          docker push todoappregistry.azurecr.io/todo-backend:${{ github.sha }}

      - name: Install kubectl
        uses: azure/setup-kubectl@v3

      - name: Set up kubeconfig
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: Deploy to Kubernetes
        run: |
          helm upgrade --install todo-app ./helm-charts/todo-app \
            --set frontend.image.tag=${{ github.sha }} \
            --set backend.image.tag=${{ github.sha }}
```

**Add secrets to GitHub:**

1. Go to repo Settings → Secrets and variables → Actions
2. Add: `ACR_USERNAME`, `ACR_PASSWORD`, `KUBE_CONFIG`

Now every push to main auto-deploys! 🚀

---

## Testing Checklist

- [ ] All pods running in cloud cluster
- [ ] Frontend accessible via LoadBalancer IP
- [ ] Backend API responding
- [ ] Can create tasks with due dates
- [ ] Can set priorities and tags
- [ ] Search and filter works
- [ ] Kafka events publishing
- [ ] Dapr sidecars attached
- [ ] Notification service receiving events
- [ ] Recurring tasks auto-creating
- [ ] SSL certificate (if domain setup)
- [ ] CI/CD pipeline working

---

## Submission Requirements for Phase V

### 1. GitHub Repository

Must include:

```
├── frontend/
├── backend/
├── services/
│   ├── notification-service/
│   └── recurring-task-service/
├── helm-charts/
├── dapr-components/
├── kafka/
│   ├── kafka-cluster.yaml
│   └── kafka-topics.yaml
├── .github/workflows/
│   └── deploy.yml
└── README.md
```

### 2. Documentation

**README.md must include:**

- Architecture diagram
- Cloud setup instructions
- Kafka topics explanation
- Dapr components explanation
- Event flow diagrams
- Deployment steps
- Domain/SSL setup (if applicable)

### 3. Demo Video (90 seconds)

Show:

1. Cloud cluster running
2. Multiple services deployed
3. Create task with due date and priority
4. Use search and filters
5. Show Kafka events in logs
6. Recurring task auto-creating
7. Browser showing production URL

### 4. Live URLs

- Production app URL
- API documentation URL
- GitHub repository (public)

---

## Bonus Points Opportunities

### +200: Reusable Intelligence

- Create Claude Code Skills for:
  - Kafka setup automation
  - Dapr configuration generation
  - Cloud deployment scripts

### +200: Cloud-Native Blueprints

- Reusable Helm charts for:
  - Event-driven microservices
  - Kafka + Dapr stack
  - Multi-cloud deployment

### +100: Multi-language Support

- Add Urdu language support to chatbot

### +200: Voice Commands

- Add voice input for todo commands

---

## Cost Management

### Free Tier Limits:

- **Azure:** $200 for 30 days (cancel before expiry)
- **GCP:** $300 for 90 days (cancel before expiry)
- **Oracle:** Always free tier + $300 credit

### How to Avoid Charges:

1. Set billing alerts
2. Use smallest instance sizes
3. Delete resources when done
4. Use spot/preemptible instances
5. Monitor usage daily

**Delete everything after submission:**

```bash
# Azure
az aks delete --resource-group todo-app-rg --name todo-app-cluster
az group delete --name todo-app-rg

# GCP
gcloud container clusters delete todo-app-cluster --zone us-central1-a

# Oracle
# Delete via web console
```

---

## Common Issues

### Issue: Can't connect to cloud cluster

**Solution:** Check kubeconfig, verify credentials

### Issue: Images won't pull

**Solution:** Verify registry permissions, check image tags

### Issue: Kafka connection failed

**Solution:** Check Kafka service name, verify credentials

### Issue: Dapr sidecar not injecting

**Solution:** Verify annotations, check Dapr installation

---

## Summary Timeline

**Week 1:**

- Day 1-2: Add advanced features locally
- Day 3-4: Setup Kafka + Dapr locally
- Day 5: Test event-driven flow

**Week 2:**

- Day 1: Create cloud account, setup cluster
- Day 2-3: Push images, deploy to cloud
- Day 4: Setup Kafka cloud, deploy Dapr
- Day 5: Setup domain, SSL, CI/CD
- Day 6-7: Testing, documentation, video

---

## You're Ready! 🚀

Phase V is the culmination of everything you've learned. You're building a production-ready, event-driven, cloud-native application!

**Need help?** Reference the troubleshooting guide or ask specific questions about:

- Kafka setup
- Dapr configuration
- Cloud deployment
- CI/CD pipeline

**Good luck! You've got this! 💪**
