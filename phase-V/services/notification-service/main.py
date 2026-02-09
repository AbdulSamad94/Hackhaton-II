from fastapi import FastAPI, Body, Request
from cloudevents.http import from_http
from dapr.ext.fastapi import DaprApp
import logging
import uvicorn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("notification-service")

app = FastAPI()
dapr_app = DaprApp(app)


@dapr_app.subscribe(pubsub="pubsub", topic="reminders")
def reminders_subscriber(event: dict = Body(...)):
    """
    Handle reminder events.
    In a real app, this would send an email or push notification.
    """
    logger.info(f"Received reminder event: {event}")
    data = event.get("data", {})
    task_id = data.get("task_id")
    title = data.get("title")

    logger.info(f"Sending notification for task {task_id}: '{title}' is due soon!")
    return {"status": "SUCCESS"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
