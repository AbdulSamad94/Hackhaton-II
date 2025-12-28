"""
Todo App - Phase I
User interface utilities (display, input)
"""
from task_manager import TaskManager
from utils import validate_title, validate_description, validate_task_id, validate_menu_choice
import sys


def cprint(text, color_code="0"):
    """
    Print colored text using ANSI escape codes
    """
    try:
        # Try to use ANSI codes if supported
        print(f"\033[{color_code}m{text}\033[0m")
    except:
        # Fallback to plain text if ANSI codes don't work
        print(text)


def display_welcome():
    """
    Display a beautiful welcome message
    """
    print()
    cprint("+" + "="*60 + "+", "1;36")  # Bold Cyan
    cprint("|" + " "*60 + "|", "1;36")
    cprint("|" + " "*22 + "TODO APP" + " "*22 + "|", "1;33")  # Bold Yellow
    cprint("|" + " "*60 + "|", "1;36")
    cprint("|" + " "*18 + "Your Personal Task Manager" + " "*18 + "|", "1;36")
    cprint("|" + " "*60 + "|", "1;36")
    cprint("+" + "="*60 + "+", "1;36")


def display_menu() -> None:
    """
    Print menu options with colors
    """
    print()
    cprint("+" + "="*60 + "+", "1;34")  # Bold Blue
    cprint("|" + " "*20 + "MENU" + " "*36 + "|", "1;35")  # Bold Magenta
    cprint("+" + "="*60 + "+", "1;34")
    cprint("| 1. [+] Add Task" + " "*43 + "|", "1;32")  # Bold Green
    cprint("| 2. [V] View Tasks" + " "*41 + "|", "1;36")  # Bold Cyan
    cprint("| 3. [U] Update Task" + " "*40 + "|", "1;33")  # Bold Yellow
    cprint("| 4. [D] Delete Task" + " "*40 + "|", "1;31")  # Bold Red
    cprint("| 5. [C] Mark Complete/Incomplete" + " "*26 + "|", "1;32")
    cprint("| 6. [X] Exit" + " "*47 + "|", "1;37")  # Bold White
    cprint("+" + "="*60 + "+", "1;34")


def get_menu_choice() -> int:
    """
    Get and validate user's menu selection
    Returns: int (1-6)
    """
    while True:
        try:
            cprint("Choose option (1-6): ", "1;34")  # Blue
            choice = input().strip()
            choice_int = validate_menu_choice(choice)
            return choice_int
        except ValueError as e:
            cprint(f"✗ Error: {str(e)}", "1;31")  # Red


def handle_add_task(task_manager: TaskManager) -> None:
    """
    Handle the add task UI flow
    """
    try:
        title = input("Enter task title: ").strip()

        # Validate title
        validate_title(title)

        description = input("Enter description (optional): ").strip()

        # Validate description
        validate_description(description)

        task = task_manager.add_task(title, description)
        cprint(f"✓ Task added successfully! (ID: {task.id})", "1;32")  # Green
    except ValueError as e:
        cprint(f"✗ Error: {str(e)}", "1;31")  # Red
    except Exception as e:
        cprint(f"✗ Error adding task: {str(e)}", "1;31")  # Red


def handle_view_tasks(task_manager: TaskManager) -> None:
    """
    Handle the view tasks UI display
    """
    tasks = task_manager.get_all_tasks()

    if not tasks:
        cprint("No tasks found. Add a task to get started!", "1;33")  # Yellow
        return

    print()
    cprint("+" + "="*60 + "+", "1;36")  # Cyan
    cprint("|" + " "*20 + "YOUR TASKS" + " "*30 + "|", "1;35")  # Magenta
    cprint("+" + "-"*60 + "+", "1;36")

    pending_count = 0
    completed_count = 0

    for i, task in enumerate(tasks):
        status = "[x]" if task.completed else "[ ]"
        title_str = f"| {status} [{task.id:2d}] {task.title:<40} |"

        cprint(title_str, "1;37" if task.completed else "1;37")  # White for both

        if task.description:
            desc_str = f"|     Description: {task.description:<36} |"
            cprint(desc_str, "1;37")  # White

        date_str = f"|     Created: {task.created_at.strftime('%Y-%m-%d %H:%M')}{'':<19} |"
        cprint(date_str, "1;37")  # White

        if task.completed:
            completed_count += 1
        else:
            pending_count += 1

    cprint("+" + "-"*60 + "+", "1;36")
    summary = f"| Total: {len(tasks)} tasks ({pending_count} pending, {completed_count} completed)        |"
    cprint(summary, "1;36")  # Cyan
    cprint("+" + "="*60 + "+", "1;36")


def handle_update_task(task_manager: TaskManager) -> None:
    """
    Handle the update task UI flow
    """
    try:
        task_id_input = input("Enter task ID to update: ").strip()
        task_id = validate_task_id(task_id_input)

        task = task_manager.get_task_by_id(task_id)
        if not task:
            cprint("✗ Error: Task ID not found.", "1;31")  # Red
            return

        cprint(f"Current task: {task.title}", "1;37")  # White
        if task.description:
            cprint(f"Current description: {task.description}", "1;37")  # White

        new_title = input(f"Enter new title (press Enter to keep '{task.title}'): ").strip()
        if not new_title:
            new_title = None
        elif new_title != task.title:
            validate_title(new_title)

        new_description = input(f"Enter new description (press Enter to keep current): ").strip()
        if not new_description:
            new_description = None
        elif new_description != task.description:
            validate_description(new_description)

        updated_task = task_manager.update_task(task_id, new_title, new_description)
        if updated_task:
            cprint("✓ Task updated successfully!", "1;32")  # Green
        else:
            cprint("✗ Error updating task.", "1;31")  # Red
    except ValueError as e:
        cprint(f"✗ Error: {str(e)}", "1;31")  # Red
    except Exception as e:
        cprint(f"✗ Error updating task: {str(e)}", "1;31")  # Red


def handle_delete_task(task_manager: TaskManager) -> None:
    """
    Handle the delete task UI flow
    """
    try:
        task_id_input = input("Enter task ID to delete: ").strip()
        task_id = validate_task_id(task_id_input)

        task = task_manager.get_task_by_id(task_id)
        if not task:
            cprint("✗ Error: Task ID not found.", "1;31")  # Red
            return

        cprint(f"Task to delete: {task.title}", "1;37")  # White
        confirm = input("Confirm deletion (y/N): ").strip().lower()

        if confirm in ['y', 'yes']:
            if task_manager.delete_task(task_id):
                cprint("✓ Task deleted successfully!", "1;32")  # Green
            else:
                cprint("✗ Error deleting task.", "1;31")  # Red
        else:
            cprint("Deletion cancelled.", "1;33")  # Yellow
    except ValueError as e:
        cprint(f"✗ Error: {str(e)}", "1;31")  # Red
    except Exception as e:
        cprint(f"✗ Error deleting task: {str(e)}", "1;31")  # Red


def handle_toggle_complete(task_manager: TaskManager) -> None:
    """
    Handle the mark complete/incomplete UI flow
    """
    try:
        task_id_input = input("Enter task ID to toggle: ").strip()
        task_id = validate_task_id(task_id_input)

        task = task_manager.get_task_by_id(task_id)
        if not task:
            cprint("✗ Error: Task ID not found.", "1;31")  # Red
            return

        updated_task = task_manager.toggle_task_complete(task_id)
        if updated_task:
            status = "COMPLETED" if updated_task.completed else "IN-COMPLETE"
            cprint(f"✓ Task marked as {status}!", "1;32")  # Green
        else:
            cprint("✗ Error toggling task completion.", "1;31")  # Red
    except ValueError as e:
        cprint(f"✗ Error: {str(e)}", "1;31")  # Red
    except Exception as e:
        cprint(f"✗ Error toggling task: {str(e)}", "1;31")  # Red