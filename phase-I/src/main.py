"""
Todo App - Phase I
Main application entry point with menu loop
"""
import sys
from task_manager import TaskManager
from ui import display_menu, get_menu_choice, handle_add_task, handle_view_tasks, handle_update_task, handle_delete_task, handle_toggle_complete, display_welcome


def main():
    """
    Main application loop
    - Display menu
    - Get user choice
    - Route to appropriate function
    - Loop until exit
    """
    display_welcome()

    task_manager = TaskManager()

    while True:
        display_menu()
        choice = get_menu_choice()

        if choice == 1:
            handle_add_task(task_manager)
        elif choice == 2:
            handle_view_tasks(task_manager)
        elif choice == 3:
            handle_update_task(task_manager)
        elif choice == 4:
            handle_delete_task(task_manager)
        elif choice == 5:
            handle_toggle_complete(task_manager)
        elif choice == 6:
            from ui import cprint
            cprint("Goodbye! Thanks for using TODO APP!", "1;35")  # Magenta
            sys.exit(0)


if __name__ == "__main__":
    main()