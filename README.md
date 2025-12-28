# Hackathon-II:

A demonstration of **Spec-Driven Development** methodology, where AI agents generate code from comprehensive specifications instead of manual coding.

## Documentation

Read the complete hackathon documentation **[here](https://docs.google.com/document/d/1KHxeDNnqG9uew-rEabQc5H8u3VmEN3OaJ_A1ZVVr9vY/edit?tab=t.0)**.

---

## Project Overview

This repository showcases the progressive evolution of a simple todo application into a production-ready, cloud-native AI chatbot through five distinct phases. Each phase builds upon the previous, demonstrating modern software development practices from CLI to distributed systems.

**Core Methodology**: 100% Spec-Driven Development using Claude Code and Spec-Kit Plus

- Write specifications first (Constitution → Specify → Plan → Tasks)
- AI generates implementation from specs
- No manual coding - only spec refinement

---

## Phases

### Phase 1 (Completed)

**Build a Todo In-Memory Python Console App**

A command-line interface application with basic CRUD operations for managing tasks stored in memory.

**Features:**

- Add new tasks with title and description
- View all tasks with completion status
- Update existing task details
- Delete tasks by ID
- Mark tasks as complete or incomplete
- Menu-driven interface with input validation

**Tech Stack:** Python 3.13+, UV, Claude Code, Spec-Kit Plus

**Key Learnings:** Spec-driven workflow, AI-assisted code generation, clean code principles

[View Phase 1 →](./phase-I/README.md)

---

### Phase 2 🔄 (In Progress)

**Build a Todo Full-Stack Web Application**

Transform the console app into a modern web application with persistent database storage and multi-user support.

**Features:**

- Responsive web interface built with modern framework
- RESTful API with complete CRUD endpoints
- PostgreSQL database for persistent storage
- User authentication and authorization with JWT
- Multi-user support with isolated data
- Secure API endpoints with Better Auth integration

**Tech Stack:** Next.js 16 (App Router), FastAPI, SQLModel, Neon Serverless PostgreSQL, Better Auth

**Key Learnings:** Full-stack architecture, REST API design, database modeling, JWT authentication, monorepo organization

[View Phase 2 →](./phase-II/README.md)

---

### Phase 3 ⏳ (Pending)

**Build a Todo AI-Powered Chatbot Application**

Add conversational AI interface using natural language to manage tasks through chat interactions.

**Features:**

- Natural language task management ("Add buy groceries to my list")
- Conversational AI powered by OpenAI Agents SDK
- MCP (Model Context Protocol) server for tool-based interactions
- Stateless chat endpoint with database-persisted conversations
- Support for complex queries ("Show pending tasks from this week")
- Real-time chat interface with OpenAI ChatKit

**Tech Stack:** OpenAI ChatKit, OpenAI Agents SDK, Official MCP SDK, FastAPI, Neon PostgreSQL

**Key Learnings:** AI agent development, MCP architecture, stateless design, conversational UX

[View Phase 3 →](./phase-III/README.md)

---

### Phase 4 ⏳ (Pending)

**Build a Todo Application with Local Kubernetes Deployment**

Containerize the application and deploy on local Kubernetes cluster with infrastructure as code.

**Features:**

- Docker containerization for frontend and backend
- Kubernetes deployment on Minikube locally
- Helm charts for declarative infrastructure management
- AI-assisted DevOps with kubectl-ai and kagent
- Service discovery and load balancing
- Health checks and rolling updates

**Tech Stack:** Docker, Kubernetes (Minikube), Helm Charts, kubectl-ai, kagent, Gordon (Docker AI)

**Key Learnings:** Containerization, Kubernetes orchestration, Helm packaging, AIOps, cloud-native patterns

[View Phase 4 →](./phase-IV/README.md)

---

### Phase 5 ⏳ (Pending)

**Build an Advanced Todo Application with Cloud Deployment**

Production-ready deployment with event-driven architecture, advanced features, and cloud Kubernetes.

**Features:**

- **Advanced Task Management:**

  - Recurring tasks (daily, weekly, monthly patterns)
  - Due dates with automatic reminders
  - Priority levels (high, medium, low)
  - Tags and categories for organization
  - Search and filter capabilities
  - Sort by multiple criteria

- **Event-Driven Architecture:**

  - Kafka message streaming for decoupled services
  - Notification service for reminders
  - Recurring task engine for auto-scheduling
  - Activity/audit logging system
  - Real-time sync across multiple clients

- **Distributed Runtime:**

  - Dapr for microservices abstraction
  - Service invocation with built-in retries
  - Pub/Sub for event streaming
  - State management for conversation history
  - Secrets management for credentials

- **Production Infrastructure:**
  - Cloud Kubernetes (Azure AKS / Google GKE / Oracle OKE)
  - CI/CD pipeline with GitHub Actions
  - Monitoring and observability
  - Horizontal pod autoscaling
  - Multi-region deployment capability

**Tech Stack:** Kubernetes (Cloud), Kafka/Redpanda, Dapr, FastAPI, Next.js, Neon PostgreSQL, Helm, GitHub Actions

**Key Learnings:** Event-driven design, Kafka streaming, Dapr distributed runtime, production deployment, observability, CI/CD pipelines

[View Phase 5 →](./phase-V/README.md)

---

## Bonus Features

Additional implementations for extra credit:

- **Reusable Intelligence** (+200 points) - Create Claude Code Subagents and Agent Skills
- **Cloud-Native Blueprints** (+200 points) - Infrastructure templates via Agent Skills
- **Multi-language Support** (+100 points) - Urdu language support in chatbot
- **Voice Commands** (+200 points) - Voice input for todo operations

**Total Possible Bonus**: +700 points

---

## Progress Summary

| Phase     | Status         | Points       | Due Date         |
| --------- | -------------- | ------------ | ---------------- |
| Phase 1   | ✅ Completed   | 100/100      | Dec 7, 2025      |
| Phase 2   | 🔄 In Progress | 0/150        | Dec 14, 2025     |
| Phase 3   | ⏳ Pending     | 0/200        | Dec 21, 2025     |
| Phase 4   | ⏳ Pending     | 0/250        | Jan 4, 2026      |
| Phase 5   | ⏳ Pending     | 0/300        | Jan 18, 2026     |
| **Total** | **20%**        | **100/1000** | **Jan 18, 2026** |

---

## Technology Evolution

Watch the stack grow in complexity across phases:

```
Phase 1: Python CLI
    ↓
Phase 2: Next.js + FastAPI + PostgreSQL
    ↓
Phase 3: + OpenAI Agents + MCP Server
    ↓
Phase 4: + Docker + Kubernetes + Helm
    ↓
Phase 5: + Kafka + Dapr + Cloud Infrastructure
```

---

## Learning Outcomes

### Spec-Driven Development

- Write specifications before code
- Use AI agents to generate implementations
- Iterate on specs for code quality
- Maintain single source of truth in specs

### Modern Development Stack

- Full-stack web development (Next.js + FastAPI)
- AI agent integration (OpenAI Agents SDK)
- Cloud-native architecture (Kubernetes, Docker)
- Event-driven systems (Kafka, Dapr)

### Professional Practices

- Infrastructure as Code (Helm Charts)
- CI/CD pipelines (GitHub Actions)
- Microservices architecture
- API design and MCP protocols
- Database modeling and ORM usage
- Authentication and security (JWT, Better Auth)

---

## Repository Structure

```
hackathon-II/
│
├── README.md                           # This file
│
├── phase-I/                           # Console App
│   ├── .claude/
│   ├── .specify/
│   ├── .history/
│   ├── specs/
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── task_manager.py
│   │   ├── task.py
│   │   └── ui.py
│   │   └── utils.py
│   ├── CLAUDE.md
│   ├── README.md
│   ├── test_todo_app.py
│
├── phase-II/                           # 🔄 Web App
│   ├── README.md
│   ├── speckit.constitution
│   ├── specs/
│   ├── frontend/                       # Next.js
│   ├── backend/                        # FastAPI
│   └── CLAUDE.md
│
├── phase-III/                          # ⏳ AI Chatbot
│   ├── README.md
│   ├── specs/
│   ├── frontend/                       # ChatKit
│   ├── backend/                        # FastAPI + MCP
│   └── mcp-server/
│
├── phase-IV/                           # ⏳ Kubernetes Local
│   ├── README.md
│   ├── specs/
│   ├── docker/
│   ├── helm-charts/
│   └── k8s-manifests/
│
└── phase-V/                            # ⏳ Cloud Production
    ├── README.md
    ├── specs/
    ├── services/
    ├── infrastructure/
    ├── dapr-components/
    └── .github/workflows/
```

## Live Deployments

| Phase | Environment      | URL            | Status |
| ----- | ---------------- | -------------- | ------ |
| 2     | Vercel           | Coming Soon    | 🔄     |
| 3     | Vercel + Backend | Coming Soon    | ⏳     |
| 4     | Minikube (Local) | localhost:8080 | ⏳     |
| 5     | Cloud Kubernetes | Coming Soon    | ⏳     |

---

## Organized By

This hackathon is organized by **[Panaversity](https://panaversity.org)** in collaboration with **PIAIC** and **GIAIC**.

**Instructors:**

- Zia Khan
- Rehan Aziz
- Junaid Ahmad
- Wania Amir

**Objective:** Master the art of AI-native, spec-driven software development and cloud-native architecture through hands-on implementation.

## Resources

- [Claude Code](https://claude.com/product/claude-code) - AI coding assistant
- [Spec-Kit Plus](https://github.com/panaversity/spec-kit-plus) - Specification management
- [OpenAI Agents SDK](https://platform.openai.com/docs) - AI agent development
- [Panaversity](https://panaversity.org) - Organization website

---

## License

Educational project for Hackathon II demonstration purposes.
