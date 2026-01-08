from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class AdaptationState(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    persona_id: str

    total_messages: int = 0
    avg_sentiment: float = 0.0

    friendliness: float = 0.5
    humor: float = 0.5
    formality: float = 0.5

    updated_at: datetime = Field(default_factory=datetime.utcnow)

