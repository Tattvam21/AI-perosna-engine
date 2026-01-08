"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/components/AnimatedBackground";


export default function Home() {
  return (
    <main className="relative min-h-screen text-white">
      <AnimatedBackground />

      {/* Your existing content */}
      <section className="flex min-h-screen flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          AI Persona Engine
        </h1>

        <p className="max-w-xl text-zinc-300 mb-10">
          Talk to purpose-built AI personas designed for learning,
          mentoring, and deep technical guidance.
        </p>

        <a
          href="/chat"
          className="rounded-xl bg-white/10 px-6 py-3 text-lg backdrop-blur hover:bg-white/20 transition"
        >
          Enter Persona Chat →
        </a>
      </section>
    </main>
  );
}

