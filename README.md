# 🧠 AI Persona Engine

A modern full-stack AI chat application where users can interact with **multiple AI personas**, each maintaining its own memory, personality, and conversation history.

Built with a focus on **clean architecture, smooth UX, and real AI system behavior** — not just a chat UI.

---

## ✨ Features

- 🔁 **Multiple AI Personas**
  - Each persona has its own chat history, memory, and adaptive state
- 🧠 **Context-Aware Responses**
  - Short-term conversation memory
  - Long-term memory storage for important user information
- 🎭 **Persona Adaptation**
  - Persona behavior adapts based on sentiment and interaction patterns
- 💬 **Modern Chat UI**
  - Animated message bubbles
  - Persona-based styling
  - Smooth transitions using Framer Motion
- 🧾 **Markdown & Code Rendering**
  - GitHub-style markdown support
  - Syntax-highlighted code blocks
  - Optimized handling of large code snippets
- 🛡️ **Safety & Validation**
  - User intent safety checks
  - Controlled output handling

---

## 🏗️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Markdown + Highlight.js**

### Backend
- **FastAPI**
- **SQLModel + SQLite**
- **LLM API Integration**
- **Custom Persona Prompt System**
- **Memory & Sentiment Services**

---

## 📂 Project Structure

```text
frontend/
 ├─ src/
 │  ├─ app/
 │  ├─ components/
 │  │   ├─ ChatBubble.tsx
 │  │   ├─ PersonaSwitcher.tsx
 │  ├─ lib/
 │  │   └─ api.ts
 │  └─ styles/
backend/
 ├─ app.py
 ├─ services/
 │  ├─ persona_prompt.py
 │  ├─ memory_service.py
 │  ├─ sentiment_service.py
 │  ├─ safety_service.py
 ├─ db.py
 └─ models/
