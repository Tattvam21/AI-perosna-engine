# 🧠 AI Persona Engine — Agentic Conversational AI Backend

A **stateful, persona-driven AI backend system** that demonstrates agentic behavior through memory, sentiment analysis, and rule-based personality adaptation.
This project is focused on **AI systems engineering**, not UI or prompt-only chatbots.

---

## 🚀 Project Overview

The **AI Persona Engine** enables multiple AI personas to maintain distinct identities, memories, and evolving behaviors across conversations.

Each persona:

* Remembers user-provided facts
* Adapts tone over time
* Maintains safety and consistency
* Operates independently from other personas

The system is designed to mirror how **real-world conversational AI systems** are built and maintained.

---

## 🎯 Core Capabilities

### 🧩 Persona Architecture

* Multiple personas with independent:

  * Identity (name, role, backstory)
  * Goals and style rules
  * Conversation history
* Persona-specific prompts generated dynamically

### 🧠 Memory System

* **Short-term memory**

  * Recent conversation history stored in SQLite
* **Long-term memory**

  * Semantic memory stored in ChromaDB
  * Embedding-based retrieval using sentence transformers
* Automatic detection of important user facts
* Memory injected as silent context (not instructions)

### 🔄 Adaptive Behavior Engine

* Tracks interaction statistics per persona:

  * Total messages
  * Average sentiment
* Rule-based trait evolution:

  * Friendliness
  * Humor
  * Formality
* Trait values clamped for stability
* Behavior changes gradually over time (agentic behavior)

### 🛡️ Safety & Consistency Layer

* Rule-based safety filter
* Blocks unsafe user intent
* Prevents saving AI-invented facts as memory
* Separates user-provided facts from system content

### 🗄️ Persistent Storage

* SQLite database for:

  * Messages
  * Persona state
* ChromaDB for long-term semantic memory
* Fully local and offline-capable

---

## 🧠 System Design

```
User
  ↓
FastAPI Backend
  ├── Persona Loader
  ├── Sentiment Analyzer
  ├── Adaptation Engine
  ├── Memory Service
  │     ├── Short-term (SQLite)
  │     └── Long-term (ChromaDB)
  ├── Safety Layer
  └── LLM Client (Local LLM via Ollama)
```

---

## 🛠️ Technology Stack

* **Python 3.10+**
* **FastAPI** — API framework
* **SQLModel + SQLite** — relational persistence
* **ChromaDB** — vector database
* **SentenceTransformers** — semantic embeddings
* **Ollama** — local LLM inference
* **Pydantic** — data validation

---

## 📁 Repository Structure

```
backend/
├── app.py                     # FastAPI entry point
├── db.py                      # Database initialization
├── models/                    # Message models
├── models_adaptation/         # Persona state model
├── services/
│   ├── llm_client.py          # LLM interface
│   ├── persona_prompt.py      # Persona + prompt builder
│   ├── memory_service.py      # Long-term memory logic
│   ├── sentiment_service.py   # Sentiment analysis
│   ├── adaptation_service.py  # Trait evolution engine
│   ├── safety_service.py      # Safety rules
│   └── db_service.py          # Message persistence
├── personas/                  # Persona definitions (JSON)
│   ├── aria.json
│   ├── vikram.json
│   └── neha.json
├── requirements.txt
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-persona-engine.git
cd ai-persona-engine/backend
```

### 2️⃣ Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Start Local LLM (Ollama)

```bash
ollama serve
```

Ensure the model is available:

```bash
ollama pull phi3
```

### 5️⃣ Start the Backend

```bash
uvicorn app:app --reload --port 8000
```

---

## 🔌 API Endpoints

### Health Check

```
GET /health
```

### Chat Endpoint

```
POST /chat
```

**Request**

```json
{
  "persona_id": "aria",
  "user_message": "I want to become an AI engineer"
}
```

**Response**

```json
{
  "reply": "That’s a great goal. Let me guide you step by step..."
}
```

### Persona State

```
GET /persona_state/{persona_id}
```

---

## 🧪 Demonstrated Behaviors

* Remembers user-provided facts across sessions
* Adapts tone based on conversation sentiment
* Maintains separate memory per persona
* Refuses unsafe requests safely
* Preserves persona identity consistently

---

## 🧠 Why This Project Is Important

This project demonstrates:

* Agentic AI behavior
* Memory-aware LLM systems
* Stateful backend design
* Safety-first AI engineering
* Real-world conversational AI architecture

It goes beyond prompt engineering into **production-style AI system design**.

---

## 📌 Future Improvements

* Memory summarization
* External document RAG
* Multi-agent collaboration
* Analytics and visualization tools

---

## 📄 License

MIT License

---

## 👤 Author

**Tattvam**
AI Systems & Backend Engineering
