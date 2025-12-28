---
id: 3
title: Todo App Planning
stage: plan
date: 2025-12-29
surface: agent
model: claude-sonnet-4-5-20250929
feature: todo-app
branch: 001-todo-app
user: claude
command: sp.plan
labels: [planning, todo-app, architecture, design]
links:
  spec: specs/001-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-todo-app/plan.md
 - specs/001-todo-app/research.md
 - specs/001-todo-app/data-model.md
 - specs/001-todo-app/quickstart.md
 - specs/001-todo-app/contracts/operations.md
tests:
 - none
---

## Prompt

```text
# Todo App Technical Plan - Phase I

## 1. Architecture Overview

### 1.1 System Architecture
```
┌─────────────────────────────────┐
│      User (Terminal)            │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│         CLI Interface           │
│    (menu display, input)        │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│     Application Logic           │
│  (add, update, delete, view)    │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│      Data Storage               │
│   (in-memory Python list)       │
└─────────────────────────────────┘
```

### 1.2 Component Breakdown
- **main.py**: Entry point, menu loop
- **task_manager.py**: Business logic for CRUD operations
- **task.py**: Task data model
- **ui.py**: User interface utilities (display, input)
- **utils.py**: Helper functions (validation, formatting)

## 2. Data Model Design

### 2.1 Task Class
```python
class Task:
    """
    Represents a single todo task
    """
    Properties:
        - id: int (auto-generated)
        - title: str (required, max 200 chars)
        - description: str (optional, max 1000 chars)
        - completed: bool (default False)
        - created_at: datetime (auto-generated)

    Methods:
        - __init__(title, description)
        - to_dict() -> dict
        - __str__() -> str (for display)
        - toggle_complete() -> None
```

### 2.2 Data Storage
```python
# Global in-memory storage
tasks: List[Task] = []
next_task_id: int = 1
```

## 3. Module Design

### 3.1 main.py
**Responsibility**: Program entry, main loop, menu display

**Functions:**
```python
def main() -> None:
    """
    Main application loop
    - Display menu
    - Get user choice
    - Route to appropriate function
    - Loop until exit
    """

def display_menu() -> None:
    """
    Print menu options
    """

def get_menu_choice() -> int:
    """
    Get and validate user's menu selection
    Returns: int (1-6)
    """
```

**Flow:**
```
START
  ↓
Initialize (empty task list)
  ↓
LOOP:
  - Display menu
  - Get user choice
  - Execute operation
  - Show result
  - Continue until exit
  ↓
EXIT (Goodbye message)
```

---

### 3.2 task_manager.py
**Responsibility**: Core business logic for task operations

**Functions:**
```python
def add_task(title: str, description: str = "") -> Task:
    """
    Create and add new task
    - Generate unique ID
    - Create d
  ↓
Prompt for description (optional)
  ↓
Call task_manager.add_task()
  ↓
Generate unique ID
  ↓
Create Task instance
  ↓
Add to tasks list
  ↓
Print success message
  ↓
Return to menu
```

### 4.2 View Tasks Flow
```
User selects "View Tasks"
  ↓
Call task_manager.get_all_tasks()
  ↓
If empty:
  - Print "No tasks found"
Else:
  - Print header
  - For each task:
    - Print ID, status, title
    - Print description (if exists)
    - Print created date
  - Print stats summary
  ↓
Return to menu
```

### 4.3 Update Task Flow
```
User selects "Update Task"
  ↓
Prompt for task ID → validate → retry if invalid
  ↓
Call task_manager.get_task_by_id()
  ↓
If not found:
  - Print error
  - Return to menu
Else:
  - Display current values
  - Prompt for new title (press Enter to keep)
  - Prompt for new description (press Enter to keep)
  - Call task_manager.update_task()
  - Print success
  ↓
Return to menu
```

### 4.4 Delete Task Flow
```
User selects "Delete Task"
  ↓
Prompt for task ID → validate
  ↓
Call task_manager.get_task_by_id()
  ↓
If not found:
  - Print error
  - Return to menu
Else:
  - Display task details
  - Confirm deletion (Y/N)
  - If confirmed:
    - Call task_manager.delete_task()
    - Print success
  - Else:
    - Print "Cancelled"
  ↓
Return to menu
```

### 4.5 Toggle Complete Flow
```
User selects "Mark Complete/Incomplete"
  ↓
Prompt for task ID → validate
  ↓
Call task_manager.get_task_by_id()
  ↓
If not found:
  - Print error
  - Return to menu
Else:
  - Call task_manager.toggle_task_complete()
  - Print new status
  - Print success
  ↓
Return to menu
```

## 5. Error Handling Strategy

### 5.1 Input Validation Errors
| Error | Handling |
|-------|----------|
| Empty title | Print error, re-prompt |
| Title too long | Print error, re-prompt |
| Invalid task ID | Print error, return to menu |
| Non-numeric ID | Print error, re-prompt |
| Invalid menu choice | Print error, re-display menu |

### 5.2 Operation Errors
| Error | Handling |
|-------|----------|
| Task not found | Print friendly error, return to menu |
| Empty task list | Print "No tasks found" message |
| Unexpected exception | Print generic error, don't crash |

## 6. Project Structure
```
hackathon-todo-phase1/
├── speckit.constitution
├── specs/
│   ├── speckit.specify
│   ├── speckit.plan
│   └── speckit.tasks
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── task.py
│   ├── task_manager.py
│   ├── ui.py
│   └── utils.py
├── tests/ (optional)
│   └── test_task_manager.py
├── README.md
├── CLAUDE.md
├── .gitignore
└── pyproject.toml (UV config)
```

## 7. Dependencies

### 7.1 Python Standard Library Only
- `datetime` - timestamps
- `dataclasses` - Task model
- `typing` - type hints
- `sys` - system operations (optional for clear screen)
- `os` - OS operations (optional for clear screen)

### 7.2 No External Packages Required
All functionality achievable with standard library.

## 8. Testing Strategy

### 8.1 Manual Testing Checklist
- [ ] Add task with valid title → Success
- [ ] Add task with empty title → Error, re-prompt
- [ ] Add task with long title (>200 chars) → Error
- [ ] View empty task list → "No tasks" message
- [ ] View multiple tasks → All displayed correctly
- [ ] Update existing task → Success
- [ ] Update non-existent task → Error
- [ ] Delete existing task → Success after confirmation
- [ ] Delete with cancel → Task preserved
- [ ] Toggle complete → Status changes
- [ ] Invalid menu choice → Error, re-display menu
- [ ] Exit → Clean shutdown

### 8.2 Edge Case Testing
- [ ] Add 100 tasks → Performance acceptable
- [ ] Very long description (900 chars) → Accepted
- [ ] Special characters in title → Handled correctly
- [ ] Unicode characters → Displayed correctly

## 9. Development Sequence

### Phase 1: Foundation (Tasks 1-3)
1. Create project structure
2. Implement Task data model
3. Set up in-memory storage

### Phase 2: Core Operations (Tasks 4-7)
4. Implement add_task
5. Implement view_tasks
6. Implement update_task
7. Implement delete_task
8. Implement toggle_complete

### Phase 3: User Interface (Tasks 8-10)
9. Implement menu system
10. Implement input validation
11. Implement UI utilities

### Phase 4: Integration (Tasks 11-12)
12. Wire everything in main.py
13. Add error handling

### Phase 5: Polish (Task 13)
14. Test all features
15. Write documentation
16. Create demo video

## 10. Success Metrics

### Functionality
- ✅ All 5 CRUD operations work
- ✅ Error handling is graceful
- ✅ Input validation works

### Code Quality
- ✅ Clean, readable code
- ✅ Proper separation of concerns
- ✅ Type hints used
- ✅ Comments where needed

### User Experience
- ✅ Clear prompts and feedback
- ✅ Intuitive menu flow
- ✅ Helpful error messages
- ✅ Consistent formatting

### Documentation
- ✅ README with setup instructions
- ✅ CLAUDE.md for AI context
- ✅ All spec files complete
- ✅ Demo video created

## 11. Deployment Plan

### Local Development
```bash
# Clone repository
git clone <repo-url>
cd hackathon-todo-phase1

# Install UV (if needed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Run application
uv run src/main.py
```

### Submission
1. Push to public GitHub repository
2. Record 90-second demo video
3. Submit via Google Form
4. Prepare for live presentation (if invited)

## 12. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Claude Code generates incorrect implementation | Refine specs, iterate until correct |
| Unclear requirements | Reference constitution and specify docs |
| Time constraint | Focus on core features first, polish later |
| Testing gaps | Manual test checklist ensures coverage |

## 13. Next Phase Preview

Phase II will add:
- Web interface (Next.js frontend)
- REST API (FastAPI backend)
- Persistent storage (Neon PostgreSQL)
- User authentication (Better Auth)

**Current Phase I code will be refactored, not discarded.**
```

## Response snapshot

Completed the implementation planning for the Todo App - Phase I. The planning included:

1. **Implementation Plan** (plan.md): Detailed architecture overview with system components breakdown, technical context, and project structure. The plan specifies the 5 main modules: main.py, task.py, task_manager.py, ui.py, and utils.py.

2. **Research Document** (research.md): Technical research and decisions on Task data model implementation, in-memory storage approach, CLI interface pattern, error handling strategy, and input validation approach.

3. **Data Model** (data-model.md): Detailed specification of the Task entity with properties (id, title, description, completed, created_at), methods, and state transitions. Also includes the in-memory storage model.

4. **Quickstart Guide** (quickstart.md): Setup instructions, running the application, using the application, example workflow, and troubleshooting tips.

5. **API Contracts** (contracts/operations.md): CLI operations contract defining the 6 main operations: Add Task, View Tasks, Update Task, Delete Task, Toggle Task Completion, and Get Task by ID with their inputs, outputs, errors, and side effects.

The planning phase is now complete and all artifacts have been created. The implementation plan follows the constitution requirements for Python 3.13+, standard library only, in-memory storage, and CLI interface. The agent context was updated with the relevant technologies for the todo app feature.

## Outcome

- ✅ Impact: Created comprehensive technical plan for Todo App implementation
- 🧪 Tests: none
- 📁 Files: specs/001-todo-app/plan.md, specs/001-todo-app/research.md, specs/001-todo-app/data-model.md, specs/001-todo-app/quickstart.md, specs/001-todo-app/contracts/operations.md
- 🔁 Next prompts: Proceed with task generation based on this plan
- 🧠 Reflection: Planning phase completed successfully with all required artifacts generated according to the specification and constitution requirements

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Generate tasks based on this plan