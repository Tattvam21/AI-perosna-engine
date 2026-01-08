"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { PersonaId } from "@/lib/api";
import "highlight.js/styles/github-dark.css";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  personaId?: PersonaId;
  index: number;
}

export default function ChatBubble({
  message,
  isUser,
  personaId,
  index,
}: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-5`}
    >
      {/* Speaker */}
      <span className="text-[11px] font-semibold mb-1 px-1 text-gray-400 uppercase">
        {isUser ? "You" : personaId}
      </span>

      {/* Bubble */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
        className={`
          max-w-[85%] rounded-2xl px-4 py-3
          backdrop-blur-xl border
          ${
            isUser
              ? "bg-blue-500/10 border-blue-400/30 text-white"
              : "bg-white/5 border-white/10 text-gray-100"
          }
        `}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed">
                    {children}
                  </p>
                ),

                li: ({ children }) => (
                  <li className="ml-4 list-disc leading-relaxed">
                    {children}
                  </li>
                ),

                /* INLINE CODE ONLY */
                code: ({ inline, children }) => {
                  if (!inline) return <>{children}</>;

                  return (
                    <code className="px-1 py-0.5 rounded bg-black/60 text-blue-300 font-mono text-xs">
                      {children}
                    </code>
                  );
                },

                /* CODE BLOCK */
                pre: ({ children }) => (
                  <pre
                    className="
                      mt-4 mb-4 rounded-xl
                      bg-[#020617]
                      border border-white/10
                      p-4
                      overflow-x-auto
                      text-sm
                      leading-6
                    "
                    style={{
                      whiteSpace: "pre",
                      wordBreak: "normal",
                    }}
                  >
                    {children}
                  </pre>
                ),
              }}
            >
              {message}
            </ReactMarkdown>

          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
