"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/config/site";

const flags = ["#f4577f", "#ffd166", "#7bd389", "#6ec6ff", "#f4577f", "#ffd166", "#7bd389", "#6ec6ff", "#f4577f"];
const noReplies = ["No", "Are you sure? 🥺", "Pleaseee 🥹", "Think again 💕", "Just say yes 😤"];

export default function Intro({ onDone }: { onDone: () => void }) {
  const [noCount, setNoCount] = useState(0);
  const [off, setOff] = useState({ x: 0, y: 0 });

  const dodge = () => {
    setNoCount((c) => c + 1);
    setOff({ x: (Math.random() - 0.5) * 120, y: (Math.random() - 0.5) * 60 });
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      {/* floating hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute animate-float text-rose-deep/30"
          style={{ left: `${(i * 13 + 5) % 90}%`, top: `${(i * 29 + 8) % 85}%`, animationDelay: `${i * 0.4}s`, fontSize: 14 + (i % 3) * 8 }}
        >
          ♥
        </span>
      ))}

      <div className="text-center">
        <h1 className="font-hand text-4xl font-bold text-rose-deep">Happy Birthday,</h1>
        <h2 className="mt-1 text-2xl font-bold tracking-wide text-rose-deep">{site.name}</h2>
      </div>

      {/* bunting */}
      <div className="mt-6 flex gap-1.5">
        {flags.map((c, i) => (
          <span key={i} className="h-5 w-5" style={{ background: c, clipPath: "polygon(0 0,100% 0,50% 100%)" }} />
        ))}
      </div>

      {/* illustration */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 12 }}
        className="my-6 flex items-end justify-center text-[5.5rem] leading-none"
      >
        <span className="animate-float">🐻</span>
        <span className="-mx-1 text-[6rem]">🎂</span>
        <span className="animate-float" style={{ animationDelay: ".6s" }}>🐼</span>
      </motion.div>

      <p className="mb-4 text-xs font-medium text-rose-wine">Are you excited for what&apos;s next?</p>

      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={onDone}
          className="rounded-lg bg-rose-deep px-8 py-3 text-sm font-bold text-white shadow-lg shadow-rose-deep/30"
          style={{ scale: 1 + Math.min(noCount, 5) * 0.08 }}
        >
          Yes
        </motion.button>
        <motion.button
          animate={{ x: off.x, y: off.y }}
          onClick={dodge}
          className="rounded-lg bg-white/80 px-8 py-3 text-sm font-bold text-rose-wine shadow"
        >
          {noReplies[Math.min(noCount, noReplies.length - 1)]}
        </motion.button>
      </div>
    </div>
  );
}
