# Quickstart: Todo App

## Setup

1. Ensure Python 3.13+ is installed on your system
2. Install UV package manager if not already installed:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

## Running the Application

1. Navigate to the project directory
2. Run the application:
   ```bash
   python src/main.py
   ```
   Or with UV:
   ```bash
   uv run src/main.py
   ```

## Using the Application

1. The main menu will display 6 options:
   - 1. Add Task
   - 2. View Tasks
   - 3. Update Task
   - 4. Delete Task
   - 5. Mark Complete/Incomplete
   - 6. Exit

2. Select an option by entering the corresponding number

3. Follow the prompts for each operation

## Example Workflow

1. Start the application
2. Select option 1 to add a task
3. Enter a title (required) and description (optional)
4. Select option 2 to view your tasks
5. Use other options to update, delete, or mark tasks as complete

## Troubleshooting

- If you get a Python version error, ensure you're using Python 3.13+
- If modules aren't found, ensure you're running from the project root directory
- If the application crashes, check that your input meets the validation requirements (e.g., non-empty titles, valid task IDs)