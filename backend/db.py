from sqlmodel import SQLModel, create_engine
from models import Message
from models_adaptation import AdaptationState

DATABASE_URL = "sqlite:///./chat.db"

engine = create_engine(DATABASE_URL, echo=False)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
