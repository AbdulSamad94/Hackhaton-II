# Todo App Chatbot Constitution
<!-- AI Chatbot interface for Phase II Todo Web Application -->

## Core Principles

### Architecture-First (NON-NEGOTIABLE)
<!-- Chatbot is an ADDITIONAL interface, not a replacement - Phase II web UI stays functional; Stateless chat backend - all conversation history stored in PostgreSQL database; Clear separation: ChatKit UI (frontend) ↔ Chat API (backend) ↔ OpenAI Agents SDK; Use Gemini API (not OpenAI API) for the AI agent; RESTful chat endpoint follows same auth pattern as existing API -->
Chatbot implementation must follow architecture-first principles: The chatbot is an additional interface that preserves existing Phase II functionality; backend must be stateless with all conversation history persisted to PostgreSQL; Clear separation of concerns between UI, API, and AI layers; Gemini API must be used instead of OpenAI API for cost control; Chat endpoints must follow the same authentication patterns as existing API; No breaking changes to existing architecture.

### Code Quality Standards
<!-- Type safety: TypeScript for chatbot components, Python type hints for chat endpoint; Reuse existing authentication - JWT tokens work for chat endpoint too; Component isolation - chatbot is self-contained, doesn't interfere with existing UI; Error handling for AI failures, API timeouts, network issues; Graceful degradation - if chatbot fails, users can still use web UI -->
All code must maintain high quality standards: Use TypeScript for frontend chatbot components and Python type hints for backend endpoints; Reuse existing JWT authentication system for chat endpoints; Ensure component isolation so chatbot doesn't interfere with existing UI; Implement comprehensive error handling for AI failures, API timeouts, and network issues; Maintain graceful degradation so web UI remains functional if chatbot fails; All code must be well-documented and maintainable.

### Test-First (NON-NEGOTIABLE)
<!-- All chatbot features must be tested before implementation -->
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced for all chatbot features; Both unit and integration tests required for AI interactions and database operations; Manual testing checklist must cover all specified requirements.

### User Experience Consistency
<!-- Chat window doesn't block main app functionality; Smooth open/close animations (slide up from bottom-left); Message bubbles clearly distinguish user vs assistant; Typing indicators while AI is thinking; Error messages displayed inline in chat; Auto-scroll to newest messages -->
All user interactions must maintain consistent experience: Chat window must not block main app functionality; Smooth animations for open/close actions from bottom-left; Clear visual distinction between user and assistant messages; Typing indicators during AI processing; Inline error display; Auto-scroll to latest messages; Responsive design works on desktop and mobile; Accessible keyboard navigation and screen reader support.

### Performance Requirements
<!-- Chat window renders in < 100ms; AI responses stream or show within 3 seconds; Smooth 60fps animations on open/close; Chat history loads incrementally (pagination); No performance impact on Phase II features -->
Performance standards must be maintained: Chat window renders in under 100ms; AI responses appear within 3 seconds; 60fps animations for all interactions; Incremental chat history loading; Zero performance impact on existing Phase II features; Chat component bundle size under 50KB gzipped; Database queries complete in under 100ms; Animation frames maintain 60fps minimum.

### Security-First Approach
<!-- Same JWT authentication as Phase II; Gemini API key stored in backend environment variables only; Never expose API keys to frontend; Validate user_id from JWT matches chat request; Sanitize user messages before sending to AI; Rate limiting on chat endpoint (10 requests per minute per user) -->
Security must be prioritized: Use existing JWT authentication system; Store Gemini API key only in backend environment variables; Never expose API keys to frontend; Validate JWT user_id matches chat request; Sanitize all user messages before AI processing; Implement rate limiting (10 requests per minute per user); Validate user_id from JWT matches chat request; Sanitize user messages before sending to AI; Follow same auth pattern as existing API.

## Development Constraints
<!-- 100% Spec-Driven Development with Claude Code; Use Context7 MCP server to access OpenAI Agents SDK documentation; Claude Code must use MCP tools: resolve-library-id, query-docs; Implement with Gemini API (Google AI Studio free tier); Reuse Phase II database connection and models; No breaking changes to Phase II code -->

Development must follow strict constraints: 100% Spec-Driven Development using Claude Code; Use Context7 MCP server for OpenAI Agents SDK documentation via resolve-library-id and query-docs tools; Implement with Gemini API from Google AI Studio free tier; Reuse existing Phase II database connections and models; No breaking changes to Phase II codebase; All changes must be documented and tested; Claude Code must use MCP tools as required.

## Technology Stack Standards
<!-- Frontend: Existing Next.js 16+ app + new ChatKit component; Backend: Existing FastAPI + new chat route; AI: OpenAI Agents SDK with Gemini as LLM provider; Database: Existing Neon PostgreSQL + new tables (conversations, messages); Auth: Existing Better Auth JWT validation -->

Technology stack requirements: Frontend extends existing Next.js 16+ application with new ChatKit component; Backend extends existing FastAPI with new chat routes; AI functionality uses OpenAI Agents SDK with Gemini as LLM provider; Database extends existing Neon PostgreSQL with new conversations and messages tables; Authentication reuses existing Better Auth JWT validation system; Use Google AI Studio for free Gemini API access with gemini-1.5-flash model.

## Data Model Requirements
<!-- New tables needed: conversations: (id, user_id, created_at, updated_at); messages: (id, conversation_id, user_id, role ['user'|'assistant'], content, created_at); Existing tables unchanged: users (Better Auth), tasks (from Phase II) -->

Data model specifications: New conversations table with (id, user_id, created_at, updated_at); New messages table with (id, conversation_id, user_id, role ['user'|'assistant'], content, created_at); Existing users and tasks tables remain unchanged; All new tables must follow existing naming and structure conventions; Conversation persistence in database ensures stateless backend; Source of truth for conversation history is PostgreSQL.

## API Design Principles
<!-- Chat endpoint: POST /api/{user_id}/chat; Request: {conversation_id?: number, message: string}; Response: {conversation_id: number, response: string, timestamp: string}; Requires Authorization: Bearer <jwt_token>; Returns 401 if unauthorized, 429 if rate limited -->

API design standards: Endpoint at POST /api/{user_id}/chat; Request body includes optional conversation_id and required message; Response includes conversation_id, response text, and timestamp; Authorization via Bearer JWT token; Proper error responses (401 for unauthorized, 429 for rate limiting); Consistent with existing API patterns; RESTful design principles; Clear API contracts with inputs, outputs, and error handling.

## Accessibility and UI Requirements
<!-- Keyboard shortcut to open chat (Alt+C or Cmd+C); Focus trap inside chat when open; Escape key to close; Screen reader announcements for new messages; ARIA labels on all interactive elements; Sufficient color contrast (WCAG AA); Floating chat window in bottom-left corner with smooth animation; Minimized by default - click to expand; Responsive design - works on desktop and mobile; Clear visual distinction from main app UI; Loading indicators during AI response generation -->

Accessibility and UI standards: Keyboard shortcut (Alt+C/Cmd+C) to open chat; Focus trap when chat is open; Escape key closes chat; Screen reader announcements for new messages; ARIA labels on all interactive elements; WCAG AA color contrast compliance; Floating chat window in bottom-left with smooth animation; Minimized by default, click to expand; Fully responsive on desktop and mobile; Clear visual distinction from main UI; Loading indicators during AI responses; Smooth open/close animations (300ms ease-in-out transition); Closed state: 60px × 60px circle button, bottom-left (20px margin); Open state: 400px × 600px chat panel.

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

All development must comply with this constitution: All PRs and reviews must verify constitutional compliance; Any deviations must be documented with justification; New features must align with stated principles; Use CLAUDE.md for runtime development guidance; Breaking changes to core principles require formal amendment process; All outputs strictly follow user intent; Prompt History Records (PHRs) created automatically for every user prompt; Architectural Decision Records (ADRs) suggested for significant decisions; All changes are small, testable, and reference code precisely.

**Version**: 1.0.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13
<!-- Updated for AI Chatbot implementation -->
