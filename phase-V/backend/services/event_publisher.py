import os
import json
import logging
from typing import Any, Dict

logger = logging.getLogger("event-publisher")

# Check if Dapr is enabled (defaults to False for local dev without sidecars)
DAPR_ENABLED = os.getenv("DAPR_ENABLED", "false").lower() == "true"


class EventPublisher:
    def __init__(self):
        self.pubsub_name = "pubsub"
        self.enabled = DAPR_ENABLED
        if not self.enabled:
            logger.info("Dapr event publishing is DISABLED. Set DAPR_ENABLED=true to enable.")

    def publish_event(self, topic: str, data: Dict[str, Any], event_type: str):
        """
        Publish an event to the configured Dapr pubsub component.
        """
        if not self.enabled:
            logger.debug(f"Dapr disabled, skipping event {event_type} to topic {topic}")
            return

        try:
            from dapr.clients import DaprClient
            with DaprClient() as d:
                payload = {
                    "type": event_type,
                    "data": data,
                    "source": "backend-service",
                }
                d.publish_event(
                    pubsub_name=self.pubsub_name,
                    topic_name=topic,
                    data=json.dumps(payload),
                    data_content_type="application/json",
                )
                logger.info(f"Published event {event_type} to topic {topic}")
        except Exception as e:
            logger.error(f"Failed to publish event {event_type} to topic {topic}: {e}")


event_publisher = EventPublisher()
