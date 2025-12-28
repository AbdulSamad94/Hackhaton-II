# API Contracts: Todo App

## CLI Operations Contract

### 1. Add Task
- **Operation**: `add_task(title: str, description: str = "") -> Task`
- **Input**:
  - title: string, required, max 200 characters
  - description: string, optional, max 1000 characters
- **Output**: Task object with assigned ID and timestamp
- **Errors**:
  - ValidationError if title is empty or exceeds character limit
- **Side Effect**: Task added to in-memory storage

### 2. View Tasks
- **Operation**: `get_all_tasks() -> List[Task]`
- **Input**: None
- **Output**: List of all Task objects, empty list if none exist
- **Errors**: None
- **Side Effect**: None

### 3. Update Task
- **Operation**: `update_task(task_id: int, title: str = None, description: str = None) -> Task`
- **Input**:
  - task_id: integer, required, must exist in storage
  - title: string, optional, max 200 characters if provided
  - description: string, optional, max 1000 characters if provided
- **Output**: Updated Task object
- **Errors**:
  - NotFoundError if task_id doesn't exist
  - ValidationError if inputs exceed character limits
- **Side Effect**: Task modified in storage

### 4. Delete Task
- **Operation**: `delete_task(task_id: int) -> bool`
- **Input**: task_id: integer, required, must exist in storage
- **Output**: True if successful, False otherwise
- **Errors**: NotFoundError if task_id doesn't exist
- **Side Effect**: Task removed from storage

### 5. Toggle Task Completion
- **Operation**: `toggle_task_complete(task_id: int) -> Task`
- **Input**: task_id: integer, required, must exist in storage
- **Output**: Updated Task object with toggled completion status
- **Errors**: NotFoundError if task_id doesn't exist
- **Side Effect**: Task completion status changed in storage

### 6. Get Task by ID
- **Operation**: `get_task_by_id(task_id: int) -> Task`
- **Input**: task_id: integer, required
- **Output**: Task object if found
- **Errors**: NotFoundError if task_id doesn't exist
- **Side Effect**: None