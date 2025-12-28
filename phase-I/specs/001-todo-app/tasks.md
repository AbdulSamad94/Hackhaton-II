---
description: "Task list for Todo App implementation"
---

# Tasks: Todo App - Phase I

**Input**: Design documents from `/specs/001-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan in src/
- [X] T002 [P] Create __init__.py in src/ directory
- [X] T003 [P] Create main.py file with basic structure
- [X] T004 [P] Create task.py file with basic structure
- [X] T005 [P] Create task_manager.py file with basic structure
- [X] T006 [P] Create ui.py file with basic structure
- [X] T007 [P] Create utils.py file with basic structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 [P] Implement Task data model in src/task.py with id, title, description, completed, created_at properties
- [X] T009 [P] Implement Task methods (__init__, toggle_complete, to_dict, __str__) in src/task.py
- [X] T010 [P] Setup in-memory storage (tasks list, next_task_id) in src/task_manager.py
- [X] T011 [P] Implement get_task_by_id function in src/task_manager.py
- [X] T012 [P] Implement input validation utilities in src/utils.py (title length, description length, ID validation)
- [X] T013 [P] Implement error handling utilities in src/utils.py (custom exceptions)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Task (Priority: P1) 🎯 MVP

**Goal**: Allow users to add new tasks with a title and optional description so that they can track what needs to be done

**Independent Test**: Can be fully tested by adding a task and verifying it appears in the task list, delivering the core value of task tracking

### Implementation for User Story 1

- [X] T014 [P] [US1] Implement add_task function in src/task_manager.py with title validation
- [X] T015 [P] [US1] Add description parameter handling to add_task function in src/task_manager.py
- [X] T016 [US1] Implement add task UI flow in src/ui.py (prompt for title, optional description)
- [X] T017 [US1] Connect add_task functionality to main menu in src/main.py (option 1)
- [X] T018 [US1] Add success/error feedback for add task operation in src/main.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Tasks (Priority: P1)

**Goal**: Allow users to see all their tasks with their status so that they can understand what they need to do

**Independent Test**: Can be fully tested by adding tasks and viewing them, delivering visibility into task management

### Implementation for User Story 2

- [X] T019 [P] [US2] Implement get_all_tasks function in src/task_manager.py
- [X] T020 [US2] Implement view tasks UI display in src/ui.py (format task list with status, title, description, timestamp)
- [X] T021 [US2] Handle empty task list case in src/ui.py (show "No tasks found" message)
- [X] T022 [US2] Connect view tasks functionality to main menu in src/main.py (option 2)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Mark Task Complete/Incomplete (Priority: P2)

**Goal**: Allow users to toggle a task's completion status so that they can track progress

**Independent Test**: Can be fully tested by marking tasks complete/incomplete and verifying the status changes, delivering progress tracking value

### Implementation for User Story 3

- [X] T023 [P] [US3] Implement toggle_task_complete function in src/task_manager.py
- [X] T024 [US3] Implement mark complete UI flow in src/ui.py (prompt for task ID, validate, confirm toggle)
- [X] T025 [US3] Connect toggle complete functionality to main menu in src/main.py (option 5)
- [X] T026 [US3] Add success/error feedback for toggle operation in src/main.py

**Checkpoint**: At this point, User Stories 1, 2, and 3 should all work independently

---

## Phase 6: User Story 4 - Update Task (Priority: P3)

**Goal**: Allow users to modify an existing task so that they can keep their task information current

**Independent Test**: Can be fully tested by updating task details and verifying changes persist, delivering task maintenance value

### Implementation for User Story 4

- [X] T027 [P] [US4] Implement update_task function in src/task_manager.py with validation
- [X] T028 [US4] Implement update task UI flow in src/ui.py (prompt for task ID, new title, new description)
- [X] T029 [US4] Connect update task functionality to main menu in src/main.py (option 3)
- [X] T030 [US4] Add success/error feedback for update operation in src/main.py

**Checkpoint**: At this point, User Stories 1, 2, 3, and 4 should all work independently

---

## Phase 7: User Story 5 - Delete Task (Priority: P3)

**Goal**: Allow users to remove a task from their list so that they can clean up completed or unwanted tasks

**Independent Test**: Can be fully tested by deleting tasks and verifying they're removed from the list, delivering task list management value

### Implementation for User Story 5

- [X] T031 [P] [US5] Implement delete_task function in src/task_manager.py
- [X] T032 [US5] Implement delete task UI flow in src/ui.py (prompt for task ID, confirm deletion)
- [X] T033 [US5] Connect delete task functionality to main menu in src/main.py (option 4)
- [X] T034 [US5] Add success/error feedback for delete operation in src/main.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T035 [P] Implement main menu loop in src/main.py with all 6 options (1-6)
- [X] T036 [P] Implement menu validation to handle invalid inputs in src/main.py
- [X] T037 [P] Add error handling for all operations in src/main.py
- [X] T038 [P] Implement consistent success/error message formatting in src/ui.py
- [X] T039 [P] Add character limit validation for titles (200 chars) and descriptions (1000 chars)
- [X] T040 [P] Add numeric validation for task IDs in src/utils.py
- [X] T041 [P] Add performance optimization for handling up to 1000 tasks
- [X] T042 [P] Add graceful exit functionality (option 6) in src/main.py
- [X] T043 [P] Add comprehensive error messages for all edge cases
- [X] T044 [P] Add consistent formatting for task display in src/ui.py
- [X] T045 [P] Add timestamp formatting for task creation in src/ui.py
- [X] T046 [P] Add input sanitization for all user inputs in src/utils.py
- [X] T047 [P] Add documentation comments to all functions
- [X] T048 [P] Add type hints to all functions
- [X] T049 Test complete application flow
- [X] T050 Run quickstart.md validation

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
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3/US4 but should be independently testable

### Within Each User Story

- Core implementation before UI integration
- Validation before operation execution
- Error handling in place before main logic
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All functions within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Implement add_task function in src/task_manager.py with title validation"
Task: "Add description parameter handling to add_task function in src/task_manager.py"
Task: "Implement add task UI flow in src/ui.py (prompt for title, optional description)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence