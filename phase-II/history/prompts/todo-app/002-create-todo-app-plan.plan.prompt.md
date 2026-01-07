---
id: 002
title: create-todo-app-plan
stage: plan
date: 2026-01-02
surface: agent
model: Claude Sonnet 4.5
feature: todo-app
branch: 001-todo-app
user: unknown
command: /sp.plan
labels: ["plan", "todo-app", "architecture", "data-model", "api-contract"]
links:
  spec: "../specs/001-todo-app/spec.md"
  plan: "../specs/001-todo-app/plan.md"
  ticket: null
  adr: null
  pr: null
files:
 - ../specs/001-todo-app/plan.md
 - ../specs/001-todo-app/research.md
 - ../specs/001-todo-app/data-model.md
 - ../specs/001-todo-app/quickstart.md
 - ../specs/001-todo-app/contracts/tasks-api.yaml
tests:
 - none
---

## Prompt

# Phase II Technical Plan - Full-Stack Todo Web Application

## TECHNOLOGY STACK

### Frontend:
- Next.js 16+ with App Router (not Pages Router)
- TypeScript for type safety
- Tailwind CSS for styling (utility-first approach)
- Better Auth client library for authentication
- React Server Components for initial page loads
- Client Components only for interactive elements

### Backend:
- Python 3.13+ with FastAPI framework
- SQLModel as ORM (combines SQLAlchemy + Pydantic)
- Neon Serverless PostgreSQL as database
- Better Auth JWT verification library
- Pydantic models for request/response validation
- python-jose for JWT token verification
- bcrypt for password hashing
- CORS middleware for cross-origin requests

## ARCHITECTURE APPROACH

Monorepo structure with two main folders:
- /frontend - Next.js application
- /backend - FastAPI application

The frontend and backend are completely separate services that communicate via HTTP REST API. Frontend makes fetch requests to backend API endpoints. Backend validates JWT tokens on every protected request and returns JSON responses.

## DATABASE SCHEMA

### Users table (managed by Better Auth):
- id: string (UUID primary key)
- email: string (unique, not null)
- name: string (nullable)
- password_hash: string (not null)
- created_at: timestamp

### Tasks table:
- id: integer (auto-increment primary key)
- user_id: string (foreign key to users.id)
- title: string (max 200 chars, not null)
- description: text (max 1000 chars, nullable)
- completed: boolean (default false)
- created_at: timestamp (auto-generated)
- updated_at: timestamp (auto-updated)

Index on tasks.user_id for fast queries filtering by user.

## API ENDPOINT DESIGN

### Authentication endpoints (handled by Better Auth):
- POST /api/auth/signup - Create new user account
- POST /api/auth/signin - Authenticate and get JWT token
- POST /api/auth/signout - End session
- GET /api/auth/session - Check current session

### Task endpoints (custom FastAPI):
- GET /api/{user_id}/tasks - List all tasks for authenticated user
- POST /api/{user_id}/tasks - Create new task
- GET /api/{user_id}/tasks/{id} - Get single task details
- PUT /api/{user_id}/tasks/{id} - Update task title/description
- DELETE /api/{user_id}/tasks/{id} - Delete task
- PATCH /api/{user_id}/tasks/{id}/complete - Toggle completion status

All task endpoints require Authorization: Bearer <jwt_token> header.

## AUTHENTICATION FLOW

1. User submits signup form on frontend
2. Frontend calls Better Auth signup endpoint
3. Better Auth creates user in database, returns JWT token
4. Frontend stores JWT in httpOnly cookie
5. Future API requests include JWT in Authorization header
6. Backend middleware verifies JWT signature using shared secret
7. Backend extracts user_id from JWT payload
8. Backend validates URL user_id matches JWT user_id
9. Backend executes operation only if authorized

## FRONTEND STRUCTURE

```
/app - Next.js App Router pages
  /page.tsx - Landing/redirect page
  /signup/page.tsx - Signup form
  /login/page.tsx - Login form
  /dashboard/page.tsx - Main task list (protected route)
  /layout.tsx - Root layout with auth provider

/components - Reusable React components
  /TaskList.tsx - Display tasks (client component)
  /TaskItem.tsx - Single task display
  /AddTaskForm.tsx - Form to create task (client component)
  /EditTaskModal.tsx - Modal for editing (client component)
  /DeleteConfirmModal.tsx - Confirmation dialog

/lib - Utility functions
  /api.ts - API client with fetch wrappers
  /auth.ts - Better Auth configuration
  /types.ts - TypeScript interfaces

/styles - Global styles and Tailwind config
```

## BACKEND STRUCTURE

```
/main.py - FastAPI app initialization, CORS setup
/routes - API route handlers
  /auth.py - Better Auth integration
  /tasks.py - Task CRUD endpoints
/models - Database models
  /task.py - SQLModel Task model
  /user.py - SQLModel User model (Better Auth)
/schemas - Pydantic schemas
  /task_schemas.py - Request/ Set up Tailwind CSS
13. Configure Better Auth client
14. Create auth pages (signup/login)

### Phase 5 - Frontend Task UI:
15. Create task list component
16. Create add task form
17. Create edit/delete modals
18. Wire up API calls

### Phase 6 - Integration & Testing:
19. Connect frontend to backend
20. Test full user flows
21. Fix bugs and edge cases
22. Deploy to production

## ENVIRONMENT VARIABLES

### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-32-char-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

### Backend (.env):
```
DATABASE_URL=postgresql://user:pass@neon-host/dbname
BETTER_AUTH_SECRET=same-secret-as-frontend
ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app
```

## SUCCESS CRITERIA

Phase II is complete when:
- Users can sign up and log in via web interface
- Authenticated users can perform all 5 CRUD operations
- Each user only sees their own tasks (data isolation verified)
- JWT authentication works correctly
- Responsive design works on mobile and desktop
- Frontend deployed to Vercel
- Backend deployed and accessible
- All code generated via Claude Code using Spec-Driven Development
- README includes setup instructions
- Demo video shows complete user flow (90 seconds)

## Response snapshot

Created comprehensive technical implementation plan for the Todo Web Application, including architecture decisions, technology stack, data models, API contracts, project structure, and quickstart guide.

## Outcome

- ✅ Impact: Created complete technical plan with architecture, data models, API contracts, and implementation guide
- 🧪 Tests: none
- 📁 Files: ../specs/001-todo-app/plan.md, ../specs/001-todo-app/research.md, ../specs/001-todo-app/data-model.md, ../specs/001-todo-app/quickstart.md, ../specs/001-todo-app/contracts/tasks-api.yaml
- 🔁 Next prompts: /sp.tasks to generate implementation tasks
- 🧠 Reflection: The plan follows SDD principles with clear architecture decisions, data models, and API contracts that align with the feature specification.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Generate implementation tasks from the plan