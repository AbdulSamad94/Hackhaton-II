---
id: 1
title: constitution-update
stage: constitution
date: 2025-12-31
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution
labels: [constitution,spec-driven-development,setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```text
# Phase II Constitution - Full-Stack Todo Web Application

Create principles for a Full-Stack Todo Web Application (Phase II) focused on:

## ARCHITECTURE PRINCIPLES

- Monorepo structure with clear frontend/backend separation
- RESTful API design with consistent endpoint patterns
- Stateless backend architecture for horizontal scalability
- JWT-based authentication with Better Auth
- Database-first approach using SQLModel ORM

## CODE QUALITY STANDARDS

- Type safety: TypeScript for frontend, Python type hints for backend
- Component composition over inheritance
- Single responsibility principle for all functions/components
- Clear separation: presentation layer (Next.js) vs business logic (FastAPI)
- Error handling at every API boundary

## TESTING STANDARDS

- API endpoints must handle invalid inputs gracefully
- Database operations must validate data before persistence
- JWT tokens must be verified on every protected endpoint
- User data isolation - users can only access their own tasks

## USER EXPERIENCE CONSISTENCY

- Responsive design - mobile-first approach with Tailwind CSS
- Loading states for all async operations
- Clear error messages for failed operations
- Optimistic UI updates with rollback on failure
- Accessible interfaces (ARIA labels, keyboard navigation)

## PERFORMANCE REQUIREMENTS

- API responses under 200ms for CRUD operations
- Database queries optimized with proper indexing
- Connection pooling for database efficiency
- Next.js server components for faster initial page loads
- Client-side state management minimized

## SECURITY REQUIREMENTS

- All passwords hashed with bcrypt
- JWT tokens expire after 7 days
- CORS configured for specific origins only
- SQL injection prevention via ORM parameterization
- Rate limiting on authentication endpoints

## DEVELOPMENT CONSTRAINTS

- 100% Spec-Driven Development - no manual coding
- Use Claude Code for all implementation
- All API changes must update OpenAPI documentation
- Database schema changes require migration scripts
- Environment variables for all sensitive configuration

## TECHNOLOGY STACK (Non-Negotiable)

- Frontend: Next.js 16+ with App Router, TypeScript, Tailwind CSS
- Backend: Python FastAPI with SQLModel ORM
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT tokens
- Deployment: Frontend on Vercel, Backend separate deployment
- Package Management: npm/pnpm for frontend, UV for backend

## FEATURE SCOPE (Phase II Only)

### MUST HAVE:
- User signup and signin with Better Auth
- RESTful API for all 5 basic CRUD operations
- Multi-user support with data isolation
- Persistent storage in PostgreSQL
- Responsive web interface
- JWT authentication on all protected endpoints

### MUST NOT HAVE (Future Phases):
- AI chatbot interface
- Kubernetes deployment
- Event-driven architecture
- Advanced features (priorities, tags, recurring tasks)

## DATA MODEL REQUIREMENTS

- Users table managed by Better Auth
- Tasks table with user_id foreign key
- Proper indexing on user_id for query performance
- Timestamps (created_at, updated_at) on all entities
- Soft deletes not required (hard delete acceptable)

## API DESIGN PRINCIPLES

- RESTful conventions: GET for read, POST for create, PUT for update, DELETE for remove
- Consistent response format: {data, error, message}
- HTTP status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)
- All endpoints prefixed with /api/{user_id}/
- User ID validation against JWT token on every request

## DEPLOYMENT STANDARDS

- Frontend deployed to Vercel with automatic HTTPS
- Backend deployed with CORS configured for Vercel domain
- Database connection string via environment variable
```

## Response snapshot

Created a comprehensive constitution file for the Phase II Todo Web Application that includes all the specified principles and requirements. The constitution covers architecture principles, code quality standards, testing standards, user experience consistency, performance requirements, security requirements, development constraints, technology stack requirements, feature scope, data model requirements, API design principles, and deployment standards. The file is saved at `.specify/memory/constitution.md` with version 1.0.0.

## Outcome

- ✅ Impact: Created initial project constitution with comprehensive principles
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with all required principles
- 🔁 Next prompts: Continue with spec, plan, and task creation for the todo application
- 🧠 Reflection: Constitution provides clear guidance for the entire development process

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin creating the feature specification