from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
import datetime


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    history: Optional[List[dict]] = None


class ChatResponse(BaseModel):
    conversation_id: int
    response: str
    timestamp: datetime.datetime
