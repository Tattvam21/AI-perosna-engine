"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatBubble from "@/components/ChatBubble";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import { PersonaId, sendMessage } from "@/lib/api";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  personaId?: PersonaId;
}

export default function Home() {
  const [persona, setPersona] = useState<PersonaId>("aria");
  const [messagesByPersona, setMessagesByPersona] = useState<Record<PersonaId, Message[]>>({
    aria: [],
    vikram: [],
    neha: [],
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messages = messagesByPersona[persona];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      isUser: true,
    };

    setMessagesByPersona((prev) => ({
      ...prev,
      [persona]: [...prev[persona], userMessage],
    }));

    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(persona, userMessage.content);

      setMessagesByPersona((prev) => ({
        ...prev,
        [persona]: [
          ...prev[persona],
          {
            id: crypto.randomUUID(),
            content: reply,
            isUser: false,
            personaId: persona,
          },
        ],
      }));
    } catch {
      setMessagesByPersona((prev) => ({
        ...prev,
        [persona]: [
          ...prev[persona],
          {
            id: crypto.randomUUID(),
            content: "⚠️ Something went wrong.",
            isUser: false,
            personaId: persona,
          },
        ],
      }));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Animated glowing background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[140px] animate-[floatSlow_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] bg-purple-500/15 rounded-full blur-[140px] animate-[floatMedium_22s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-[120px] animate-[floatFast_16s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-white/10 backdrop-blur-xl bg-black/30">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Persona Engine
            </h1>
            <p className="text-xs text-gray-400">Each persona remembers independently</p>
          </div>

          <PersonaSwitcher
            selectedPersona={persona}
            onSelectPersona={setPersona}
          />
        </header>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-400">
              <h2 className="text-2xl font-semibold text-gray-200 mb-2">
                Chat with {persona.toUpperCase()}
              </h2>
              <p>Start typing below to begin</p>
            </div>
          ) : (
            messages.map((m, i) => (
              <ChatBubble
                key={m.id}
                message={m.content}
                isUser={m.isUser}
                personaId={m.personaId}
                index={i}
              />
            ))
          )}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{persona.toUpperCase()}</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150" />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <footer className="px-6 py-5 border-t border-white/10 backdrop-blur-xl bg-black/30">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
