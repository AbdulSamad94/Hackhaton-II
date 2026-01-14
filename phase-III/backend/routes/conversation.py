from fastapi import APIRouter, HTTPException, Depends
from services.chat_service import ChatService
from models.chat import ChatRequest, ChatResponse
import logging
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

# Single instance or dependency injection
chat_service = ChatService()


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    try:
        answer = await chat_service.process_message(req)
        return ChatResponse(
            conversation_id=req.conversation_id or 0,  # Placeholder ID logic
            response=answer,
            timestamp=datetime.utcnow(),
        )
    except Exception as e:
        logger.error(f"Chat failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
