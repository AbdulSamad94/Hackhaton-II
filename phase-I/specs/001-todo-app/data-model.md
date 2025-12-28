# Data Model: Todo App

## Task Entity

### Properties
- **id**: `int` (auto-generated, unique, immutable)
  - Purpose: Unique identifier for each task
  - Constraints: Positive integer, auto-incremented
  - Validation: Must be unique within the session

- **title**: `str` (required, max 200 characters)
  - Purpose: The main description of the task
  - Constraints: Required field, maximum 200 characters
  - Validation: Cannot be empty or whitespace-only

- **description**: `str` (optional, max 1000 characters)
  - Purpose: Additional details about the task
  - Constraints: Optional field, maximum 1000 characters
  - Validation: Can be empty, but if provided, must be ≤ 1000 characters

- **completed**: `bool` (default False)
  - Purpose: Tracks whether the task has been completed
  - Constraints: Boolean value, default is False
  - Validation: Must be a boolean value

- **created_at**: `datetime` (auto-generated)
  - Purpose: Timestamp when the task was created
  - Constraints: Automatically set to current time when task is created
  - Validation: Must be a valid datetime object

### Methods
- **`__init__(title: str, description: str = "")`**
  - Initializes a new Task instance
  - Sets completed to False by default
  - Sets created_at to current datetime

- **`toggle_complete() -> None`**
  - Toggles the completed status between True and False

- **`to_dict() -> dict`**
  - Returns a dictionary representation of the task

- **`__str__() -> str`**
  - Returns a string representation suitable for display

### State Transitions
- **Created**: Task is initialized with completed=False
- **Completed**: Task status changes to completed=True via toggle
- **Uncompleted**: Task status changes back to completed=False via toggle

## Storage Model

### In-Memory Task Storage
- **`tasks: List[Task]`**: List to store all Task instances
- **`next_task_id: int`**: Counter for generating unique IDs
- **Location**: Module-level variables in task_manager.py
- **Scope**: Session-limited (lost when application exits)
- **Constraints**: Must handle up to 1000 tasks efficiently