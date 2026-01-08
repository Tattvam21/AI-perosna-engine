from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db import create_db_and_tables, engine
from services.llm_client import call_llm
from services.persona_prompt import load_persona, build_system_prompt
from services.db_service import save_message
from services.db_service import get_recent_messages
from services.memory_service import (
    store_memory,
    retrieve_memories,
    should_store_as_memory
)
from services.sentiment_service import analyze_sentiment
from services.adaptation_service import update_state
from services.safety_service import is_safe
from fastapi.middleware.cors import CORSMiddleware





app = FastAPI(title="AI Persona Engine")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
def on_startup():
    create_db_and_tables()

class ChatRequest(BaseModel):
    persona_id: str
    user_message: str

@app.get("/")
def root():
    return {"message": "AI Persona Engine backend is running",
            "/docs": "to see backend",
            "/persona_state/persona_id":"too see persona current state",
            "/health":"to check status"}


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/persona_state/{persona_id}")
def persona_state(persona_id: str):
    from sqlmodel import Session, select
    from models_adaptation import AdaptationState

    with Session(engine) as session:
        stmt = select(AdaptationState).where(
            AdaptationState.persona_id == persona_id
        )
        state = session.exec(stmt).first()

        if not state:
            return {"message": "No state found"}

        return {
            "persona_id": state.persona_id,
            "total_messages": state.total_messages,
            "avg_sentiment": state.avg_sentiment,
            "updated_at": state.updated_at
        }


@app.post("/chat")
def chat(req: ChatRequest):
    try:
        # Load persona
        persona = load_persona(req.persona_id)

        # Week 4: sentiment + adaptation
        sentiment = analyze_sentiment(req.user_message)
        state = update_state(req.persona_id, sentiment)

        # Week 3: store long-term memory if important
        if should_store_as_memory(req.user_message):
            store_memory(req.persona_id, req.user_message)



        # Build system prompt
        system_prompt = build_system_prompt(persona)

        # Short-term memory
        history = get_recent_messages(req.persona_id, limit=5)
        # Retrieve relevant long-term memories
        memories = retrieve_memories(
            req.persona_id,
            req.user_message,
            k=3
        )


        full_system_prompt = system_prompt

        messages = [{"role": "system", "content": system_prompt}]

        # Inject memory as NON-INSTRUCTION CONTEXT
        if memories:
            memory_block = "Known facts about the user (use silently, do not mention unless asked):\n"
            for mem in memories:
                memory_block += f"- {mem}\n"

            messages.append({
                "role": "assistant",
                "content": memory_block
            })
     


        for msg in history:
            messages.append({
                "role": msg.role,
                "content": msg.content
            })

        messages.append({
            "role": "user",
            "content": req.user_message
        })

        # Save USER message
        save_message(req.persona_id, "user", req.user_message)

        # Call LLM
        reply = call_llm(messages)

        # Week 5: safety check on output
        # Week 5: safety check on USER intent
        if not is_safe(req.user_message):
            # Save blocked user message
            save_message(req.persona_id, "user", req.user_message)

            reply = "I can’t help with that request, but I can help with safe and constructive topics."

            # Save assistant reply
            save_message(req.persona_id, "assistant", reply)

            return {"reply": reply}


        # Save ASSISTANT message
        save_message(req.persona_id, "assistant", reply)

        return {"reply": reply}

    except Exception as e:
        print("🔥 BACKEND ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))




