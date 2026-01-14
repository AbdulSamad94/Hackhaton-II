from agents import Agent, Runner, RunConfig
import logging
from ai import model, config
from models.chat import ChatRequest
from typing import Optional

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self):
        self.instructions = "You are a helpful assistant."

    async def process_message(self, request: ChatRequest) -> str:
        try:
            # Construct context from history if provided
            history_context = ""
            if request.history:
                history_context = "\nChat History:\n"
                for msg in request.history[-5:]:  # Limit context
                    role = msg.get("role", "user")
                    content = msg.get("content", "")
                    history_context += f"{role}: {content}\n"

            agent = Agent(name="assistant", instructions=self.instructions, model=model)

            # Combine history and current query
            full_prompt = f"{history_context}\nUser Query: {request.message}"

            # Run the agent
            result = await Runner.run(agent, full_prompt, run_config=config)
            return result.final_output

        except Exception as e:
            logger.error(f"Error in ChatService: {e}")
            raise e
