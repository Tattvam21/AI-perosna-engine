from sqlmodel import Session, select
from db import engine
from models_adaptation import AdaptationState
from datetime import datetime

def clamp(x: float) -> float:
    return max(0.0, min(1.0, x))

def update_state(persona_id: str, sentiment: float) -> dict:
    with Session(engine) as session:
        stmt = select(AdaptationState).where(
            AdaptationState.persona_id == persona_id
        )
        state = session.exec(stmt).first()

        if not state:
            state = AdaptationState(persona_id=persona_id)
            session.add(state)
            session.commit()
            session.refresh(state)

        # Update counters
        state.total_messages += 1
        state.avg_sentiment = (
            (state.avg_sentiment * (state.total_messages - 1) + sentiment)
            / state.total_messages
        )

        # RULE-BASED ADAPTATION
        if state.total_messages > 20:
            state.friendliness = clamp(state.friendliness + 0.05)

        if state.avg_sentiment < -0.2:
            state.humor = clamp(state.humor - 0.05)
            state.formality = clamp(state.formality + 0.05)

        if state.avg_sentiment > 0.3:
            state.humor = clamp(state.humor + 0.05)

        state.updated_at = datetime.utcnow()

        session.add(state)
        session.commit()

        # 🔥 RETURN A SAFE SNAPSHOT (NOT ORM OBJECT)
        return {
            "friendliness": state.friendliness,
            "humor": state.humor,
            "formality": state.formality,
            "total_messages": state.total_messages,
            "avg_sentiment": state.avg_sentiment
        }
