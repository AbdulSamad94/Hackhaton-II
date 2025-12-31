<!--
Sync Impact Report:
- Version change: N/A (initial constitution) → 1.0.0
- Added sections: All principles and sections based on user requirements
- Templates requiring updates: N/A
- Follow-up TODOs: None
-->
# Phase II Todo Web Application Constitution

## Core Principles

### Architecture Principles
Monorepo structure with clear frontend/backend separation; RESTful API design with consistent endpoint patterns; Stateless backend architecture for horizontal scalability; JWT-based authentication with Better Auth; Database-first approach using SQLModel ORM.

### Code Quality Standards
Type safety: TypeScript for frontend, Python type hints for backend; Component composition over inheritance; Single responsibility principle for all functions/components; Clear separation: presentation layer (Next.js) vs business logic (FastAPI); Error handling at every API boundary.

### Testing Standards
API endpoints must handle invalid inputs gracefully; Database operations must validate data before persistence; JWT tokens must be verified on every protected endpoint; User data isolation - users can only access their own tasks.

### User Experience Consistency
Responsive design - mobile-first approach with Tailwind CSS; Loading states for all async operations; Clear error messages for failed operations; Optimistic UI updates with rollback on failure; Accessible interfaces (ARIA labels, keyboard navigation).

### Performance Requirements
API responses under 200ms for CRUD operations; Database queries optimized with proper indexing; Connection pooling for database efficiency; Next.js server components for faster initial page loads; Client-side state management minimized.

### Security Requirements
All passwords hashed with bcrypt; JWT tokens expire after 7 days; CORS configured for specific origins only; SQL injection prevention via ORM parameterization; Rate limiting on authentication endpoints.

## Development Constraints

All development follows 100% Spec-Driven Development - no manual coding; Use Claude Code for all implementation; All API changes must update OpenAPI documentation; Database schema changes require migration scripts; Environment variables for all sensitive configuration.

## Technology Stack Requirements

Frontend: Next.js 16+ with App Router, TypeScript, Tailwind CSS; Backend: Python FastAPI with SQLModel ORM; Database: Neon Serverless PostgreSQL; Authentication: Better Auth with JWT tokens; Deployment: Frontend on Vercel, Backend separate deployment; Package Management: npm/pnpm for frontend, UV for backend.

## Feature Scope (Phase II)

Must have: User signup and signin with Better Auth; RESTful API for all 5 basic CRUD operations; Multi-user support with data isolation; Persistent storage in PostgreSQL; Responsive web interface; JWT authentication on all protected endpoints. Must not have: AI chatbot interface; Kubernetes deployment; Event-driven architecture; Advanced features (priorities, tags, recurring tasks).

## Data Model Requirements

Users table managed by Better Auth; Tasks table with user_id foreign key; Proper indexing on user_id for query performance; Timestamps (created_at, updated_at) on all entities; Soft deletes not required (hard delete acceptable).

## API Design Principles

RESTful conventions: GET for read, POST for create, PUT for update, DELETE for remove; Consistent response format: {data, error, message}; HTTP status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error); All endpoints prefixed with /api/{user_id}/; User ID validation against JWT token on every request.

## Deployment Standards

Frontend deployed to Vercel with automatic HTTPS; Backend deployed with CORS configured for Vercel domain; Database connection string via environment variable.

## Governance

This constitution supersedes all other development practices and must be followed for all implementation work. Amendments require explicit documentation, approval, and migration plan. All pull requests and code reviews must verify compliance with these principles. Development must follow the Spec-Driven Development workflow using Claude Code as the primary implementation tool.

**Version**: 1.0.0 | **Ratified**: 2025-12-31 | **Last Amended**: 2025-12-31