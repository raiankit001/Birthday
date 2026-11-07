"use client";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Gift({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="font-hand text-4xl font-bold text-rose-deep">One Last Thing...</h1>
      <p className="font-hand text-xl text-rose-wine">Tap the gift</p>
      <motion.button
        whileTap={{ scale: 1.4, rotate: 10 }}
        onClick={() => {
          confetti({ particleCount: 90, spread: 100, origin: { y: 0.6 } });
          setTimeout(onDone, 500);
        }}
        className="mt-4 animate-wiggle text-8xl drop-shadow-lg"
        aria-label="Open gift"
      >
        🎁
      </motion.button>
    </div>
  );
}
