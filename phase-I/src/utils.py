"""
Todo App - Phase I
Helper functions (validation, formatting)
"""
import re


def validate_title(title: str) -> bool:
    """
    Validate task title
    - Non-empty
    - Max 200 characters
    """
    if not title or not title.strip():
        raise ValueError("Title cannot be empty")
    if len(title) > 200:
        raise ValueError("Title must be 200 characters or less")
    return True


def validate_description(description: str) -> bool:
    """
    Validate task description
    - Max 1000 characters
    """
    if len(description) > 1000:
        raise ValueError("Description must be 1000 characters or less")
    return True


def validate_task_id(task_id_str: str) -> int:
    """
    Validate task ID
    - Must be a valid integer
    """
    try:
        task_id = int(task_id_str)
        if task_id <= 0:
            raise ValueError("Task ID must be a positive number")
        return task_id
    except ValueError:
        raise ValueError("Task ID must be a valid number")


def validate_menu_choice(choice_str: str) -> int:
    """
    Validate menu choice
    - Must be a valid integer between 1-6
    """
    try:
        choice = int(choice_str)
        if 1 <= choice <= 6:
            return choice
        else:
            raise ValueError("Menu choice must be between 1 and 6")
    except ValueError:
        raise ValueError("Menu choice must be a valid number between 1 and 6")


class ValidationError(Exception):
    """
    Custom exception for validation errors
    """
    pass