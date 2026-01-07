---
description: "Task list for Todo Web Application implementation"
---

# Tasks: Todo Web Application

**Input**: Design documents from `/specs/001-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/`, `frontend/` at repository root
- Paths shown below follow the project structure from plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure with backend/ and frontend/ directories
- [X] T002 [P] Initialize backend with FastAPI dependencies in backend/pyproject.toml
- [X] T003 [P] Initialize frontend with Next.js dependencies in frontend/package.json
- [X] T004 [P] Configure linting and formatting tools for both frontend and backend
- [X] T005 Create initial .env files for both frontend and backend

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 [P] Set up Better Auth for user authentication in backend/main.py
- [X] T007 [P] Configure PostgreSQL database connection with SQLModel in backend/database.py
- [X] T008 Create Task model in backend/models/task.py following data-model.md
- [X] T009 [P] Set up API routing structure in backend/routes/tasks.py
- [X] T010 [P] Implement authentication middleware in backend/dependencies/auth.py
- [X] T011 Configure CORS settings in backend/main.py
- [X] T012 [P] Create initial database tables/migrations
- [X] T013 [P] Set up error handling and logging infrastructure in backend/utils/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Registration and Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable users to create accounts with email and password, authenticate, and receive JWT tokens that expire after 7 days

**Independent Test**: Create a new account with valid email/password, log in successfully, and receive a valid JWT token that allows access to the application

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T014 [P] [US1] Contract test for authentication endpoints in backend/tests/test_auth.py
- [X] T015 [P] [US1] Integration test for user registration flow in backend/tests/test_auth.py

### Implementation for User Story 1

- [X] T016 [P] [US1] Create auth routes in backend/routes/auth.py
- [X] T017 [US1] Implement user registration endpoint in backend/routes/auth.py
- [X] T018 [US1] Implement user login endpoint in backend/routes/auth.py
- [X] T019 [US1] Implement JWT token generation with 7-day expiration in backend/auth/jwt.py
- [X] T020 [P] [US1] Create signup page in frontend/app/signup/page.tsx
- [X] T021 [P] [US1] Create login page in frontend/app/login/page.tsx
- [X] T022 [US1] Implement auth context in frontend/lib/auth.ts for managing session
- [X] T023 [US1] Implement navigation flow from signup → login → dashboard
- [X] T024 [US1] Add form validation for email and password in frontend/lib/auth.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management Interface (Priority: P1)

**Goal**: Allow logged-in users to manage personal tasks by adding, viewing, updating, deleting, and marking them as complete with data isolation between users

**Independent Test**: Log in as a user, create tasks, view them in a list, update their details, mark them complete/incomplete, and delete them

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [X] T025 [P] [US2] Contract test for tasks API endpoints in backend/tests/test_tasks.py
- [X] T026 [P] [US2] Integration test for task CRUD operations in backend/tests/test_tasks.py

### Implementation for User Story 2

- [X] T027 [P] [US2] Implement GET /api/{user_id}/tasks endpoint in backend/routes/tasks.py
- [X] T028 [P] [US2] Implement POST /api/{user_id}/tasks endpoint in backend/routes/tasks.py
- [X] T029 [P] [US2] Implement GET /api/{user_id}/tasks/{task_id} endpoint in backend/routes/tasks.py
- [X] T030 [P] [US2] Implement PUT /api/{user_id}/tasks/{task_id} endpoint in backend/routes/tasks.py
- [X] T031 [P] [US2] Implement DELETE /api/{user_id}/tasks/{task_id} endpoint in backend/routes/tasks.py
- [X] T032 [P] [US2] Implement PATCH /api/{user_id}/tasks/{task_id}/complete endpoint in backend/routes/tasks.py
- [X] T033 [US2] Add user ID validation middleware to ensure data isolation in backend/dependencies/auth.py
- [X] T034 [P] [US2] Create TaskList component in frontend/components/TaskList.tsx
- [X] T035 [P] [US2] Create TaskItem component in frontend/components/TaskItem.tsx
- [X] T036 [P] [US2] Create AddTaskForm component in frontend/components/AddTaskForm.tsx
- [X] T037 [P] [US2] Create EditTaskModal component in frontend/components/EditTaskModal.tsx
- [X] T038 [P] [US2] Create DeleteConfirmModal component in frontend/components/DeleteConfirmModal.tsx
- [X] T039 [US2] Implement API service for tasks in frontend/lib/api.ts
- [X] T040 [US2] Create dashboard page to display tasks in frontend/app/dashboard/page.tsx
- [X] T041 [US2] Implement task validation (title required, max 200 chars, description max 1000 chars)
- [X] T042 [US2] Add optimistic UI updates for better user experience
- [X] T043 [US2] Implement strikethrough effect for completed tasks

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Responsive Design and User Experience (Priority: P2)

**Goal**: Ensure the application works seamlessly across desktop, tablet, and mobile devices with intuitive navigation and immediate visual feedback

**Independent Test**: Access the application on different device sizes and verify that the layout adapts properly and interactions provide appropriate feedback

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [X] T044 [P] [US3] Responsive design tests in frontend/tests/components/TaskList.test.tsx
- [X] T045 [P] [US3] User experience tests for loading indicators and feedback in frontend/tests/components/AddTaskForm.test.tsx

### Implementation for User Story 3

- [X] T046 [P] [US3] Implement responsive layout with Tailwind CSS in frontend/styles/globals.css
- [X] T047 [P] [US3] Create responsive navigation component in frontend/components/Navigation.tsx
- [X] T048 [P] [US3] Add loading indicators during API calls in frontend/components/TaskList.tsx
- [X] T049 [P] [US3] Implement clear success/error messages in frontend/components/Feedback.tsx
- [X] T050 [US3] Add empty task list message "No tasks yet. Add one to get started!" in frontend/components/TaskList.tsx
- [X] T051 [US3] Implement mobile-first design for all components in frontend/components/
- [X] T052 [US3] Add touch-friendly navigation and interactions for mobile devices
- [X] T053 [US3] Create responsive modals and forms for mobile devices

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Session Management and Security (Priority: P1)

**Goal**: Ensure sessions are secure, automatically expire after 7 days, and users can only access their own tasks

**Independent Test**: Log in, use the application, have the session expire after 7 days, and be redirected to login page when JWT token expires

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [X] T054 [P] [US4] Session expiration tests in backend/tests/test_auth.py
- [X] T055 [P] [US4] Data isolation tests in backend/tests/test_tasks.py

### Implementation for User Story 4

- [X] T056 [P] [US4] Implement JWT token validation middleware in backend/dependencies/auth.py
- [X] T057 [P] [US4] Add user ID verification in task endpoints to ensure data isolation in backend/routes/tasks.py
- [X] T058 [US4] Implement automatic redirect to login page when JWT token expires in frontend/lib/auth.ts
- [X] T059 [US4] Add network error handling with friendly messages in frontend/lib/api.ts
- [X] T060 [US4] Implement logout functionality that ends the user session in frontend/lib/auth.ts
- [X] T061 [US4] Add redirect after logout to login page in frontend/components/Navigation.tsx
- [X] T062 [US4] Add security headers to API responses in backend/main.py
- [X] T063 [US4] Implement proper password hashing validation in backend/models/user.py

**Checkpoint**: At this point, all user stories should be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T064 [P] Documentation updates in README.md
- [X] T065 [P] Form validation improvements for all forms in frontend/components/
- [X] T066 [P] Error handling improvements across all API calls
- [X] T067 [P] Performance optimization for task loading
- [X] T068 [P] Add loading states for all API operations
- [X] T069 [P] Additional unit tests in backend/tests/
- [X] T070 [P] Security hardening (CSRF protection, timing attack prevention)
- [X] T071 [P] Run quickstart.md validation to ensure setup instructions work
- [X] T072 [P] Environment configuration for different deployment stages
- [X] T073 [P] Add README with setup instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 authentication
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Can work in parallel with US1/US2
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Depends on US1 authentication and US2 tasks

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 2

```bash
# Launch all endpoints for User Story 2 together:
Task: "Implement GET /api/{user_id}/tasks endpoint in backend/routes/tasks.py"
Task: "Implement POST /api/{user_id}/tasks endpoint in backend/routes/tasks.py"
Task: "Implement GET /api/{user_id}/tasks/{task_id} endpoint in backend/routes/tasks.py"

# Launch all components for User Story 2 together:
Task: "Create TaskList component in frontend/components/TaskList.tsx"
Task: "Create TaskItem component in frontend/components/TaskItem.tsx"
Task: "Create AddTaskForm component in frontend/components/AddTaskForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Authentication)
4. Complete Phase 4: User Story 2 (Core Task Management)
5. **STOP and VALIDATE**: Test User Stories 1 & 2 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Authentication)
   - Developer B: User Story 2 (Task Management)
   - Developer C: User Story 3 (Responsive Design)
   - Developer D: User Story 4 (Security)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence