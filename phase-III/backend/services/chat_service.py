from agents import Agent, Runner, RunConfig
import logging
from ai import model, config
from models.chat import ChatRequest
from models.conversation import Conversation, Message
from sqlmodel import Session, select
from typing import Optional

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self):
        self.instructions = "You are a helpful assistant."

    async def process_message(
        self, request: ChatRequest, user_id: str, session: Session
    ) -> str:
        try:
            # 1. Get or Create Conversation
            conversation = None
            if request.conversation_id:
                conversation = session.get(Conversation, request.conversation_id)
                # Verify ownership
                if conversation and conversation.user_id != user_id:
                    raise ValueError("Conversation not found for this user")

            if not conversation:
                conversation = Conversation(user_id=user_id, title=request.message[:50])
                session.add(conversation)
                session.commit()
                session.refresh(conversation)
                # Update request with new ID so we can return it
                request.conversation_id = conversation.id

            # 2. Save User Message
            user_msg = Message(
                conversation_id=conversation.id, role="user", content=request.message
            )
            session.add(user_msg)
            session.commit()

            # 3. Construct context from DB history
            # Fetch last 10 messages for context
            statement = (
                select(Message)
                .where(Message.conversation_id == conversation.id)
                .order_by(Message.created_at.desc())
                .limit(20)  # Fetch the last 20 messages
            )
            history_messages = session.exec(statement).all()
            history_messages.reverse()

            history_context = "\nChat History:\n"
            for msg in history_messages:
                history_context += f"{msg.role}: {msg.content}\n"

            agent = Agent(name="assistant", instructions=self.instructions, model=model)

            full_prompt = f"{history_context}\n(System Note: The above history includes the user's latest message. Please respond to it.)"

            # Run the agent
            result = await Runner.run(agent, full_prompt, run_config=config)

            # 4. Save Assistant Message
            ai_msg = Message(
                conversation_id=conversation.id,
                role="assistant",
                content=result.final_output,
            )
            session.add(ai_msg)
            session.commit()

            return result.final_output

        except Exception as e:
            logger.error(f"Error in ChatService: {e}")
            raise e
