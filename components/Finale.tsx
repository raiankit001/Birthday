"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { site } from "@/config/site";

export default function Finale({ onReplay }: { onReplay: () => void }) {
  useEffect(() => {
    const end = Date.now() + 4500;
    const colors = ["#ff9ec0", "#ffd166", "#d6204f"];
    let raf = 0;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) raf = requestAnimationFrame(frame);
    };
    frame();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-2">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 12 }}
        className="flex h-60 w-64 items-end justify-center gap-2 rounded-3xl bg-white p-4 text-[5.5rem] shadow-xl"
      >
        <span>🐰</span>
        <span>🎂</span>
        <span>🐻</span>
      </motion.div>

      <div className="text-center">
        <h1 className="font-hand text-4xl font-bold text-rose-deep">Lots of love for you ❤️</h1>
        <p className="mt-3 text-sm leading-relaxed text-rose-wine">
          Once again, Happy Birthday {site.name}! {site.finalLine}
        </p>
      </div>

      <button onClick={onReplay} className="rounded-full bg-white/80 px-6 py-2 text-sm font-bold text-rose-wine shadow">
        ↻ Replay
      </button>
    </div>
  );
}
