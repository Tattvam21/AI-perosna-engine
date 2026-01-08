from sqlmodel import Session
from db import engine
from models import Message

def save_message(persona_id: str, role: str, content: str):
    with Session(engine) as session:
        msg = Message(
            persona_id=persona_id,
            role=role,
            content=content
        )
        session.add(msg)
        session.commit()


def get_recent_messages(persona_id: str, limit: int = 10):
    from sqlmodel import select

    with Session(engine) as session:
        statement = (
            select(Message)
            .where(Message.persona_id == persona_id)
            .order_by(Message.timestamp.desc())
            .limit(limit)
        )
        results = session.exec(statement).all()

    return list(reversed(results))
