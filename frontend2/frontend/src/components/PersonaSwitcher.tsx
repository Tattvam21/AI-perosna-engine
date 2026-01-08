"use client";

import { motion } from "framer-motion";
import { PersonaId } from "@/lib/api";

interface PersonaSwitcherProps {
  selectedPersona: PersonaId;
  onSelectPersona: (persona: PersonaId) => void;
}

const personas: PersonaId[] = ["aria", "vikram", "neha"];

export default function PersonaSwitcher({
  selectedPersona,
  onSelectPersona,
}: PersonaSwitcherProps) {
  return (
    <div className="flex gap-2 rounded-full bg-white/5 p-1 border border-white/10 backdrop-blur-xl">
      {personas.map((p) => {
        const isActive = selectedPersona === p;

        return (
          <motion.button
            key={p}
            onClick={() => onSelectPersona(p)}
            whileTap={{ scale: 0.95 }}
            className={`
              relative px-4 py-1.5 rounded-full text-sm font-semibold
              transition-all duration-200
              ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="persona-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10 uppercase">{p}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
