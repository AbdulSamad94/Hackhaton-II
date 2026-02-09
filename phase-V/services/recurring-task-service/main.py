from fastapi import FastAPI, Body
from dapr.ext.fastapi import DaprApp
import logging
import uvicorn
from datetime import datetime, timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("recurring-task-service")

app = FastAPI()
dapr_app = DaprApp(app)


@dapr_app.subscribe(pubsub="pubsub", topic="task-updates")
def task_updates_subscriber(event: dict = Body(...)):
    """
    Handle task updates.
    If a recurring task is completed, schedule the next one.
    """
    data = event.get("data", {})
    task = data.get("task", {})
    event_type = data.get("type")

    if event_type == "task_completed" and task.get("recurring"):
        process_recurring_task(task)

    return {"status": "SUCCESS"}


def process_recurring_task(task: dict):
    recurring_rule = task.get("recurring")
    logger.info(
        f"Processing recurring task {task.get('id')} with rule: {recurring_rule}"
    )

    # Logic to calculate next due date and create new task would go here
    # For now, we just log it
    next_date = calculate_next_date(task.get("due_date"), recurring_rule)
    logger.info(f"Next instance should be created for: {next_date}")

    # In a full implementation, we would call Dapr service invocation or publish a 'create-task' command


def calculate_next_date(current_date_str: str, rule: str):
    if not current_date_str:
        return datetime.now()

    try:
        current_date = datetime.fromisoformat(current_date_str)
        if rule == "daily":
            return current_date + timedelta(days=1)
        elif rule == "weekly":
            return current_date + timedelta(weeks=1)
        elif rule == "monthly":
            return current_date + timedelta(days=30)  # Approximation
    except Exception as e:
        logger.error(f"Error calculating date: {e}")
        return datetime.now()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
