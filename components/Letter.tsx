"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import Button from "./Button";

export default function Letter({ onDone }: { onDone: () => void }) {
  const full = `Dear ${site.name},\n\n${site.letter}`;
  const [n, setN] = useState(0);
  const done = n >= full.length;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setN((v) => v + 1), 38);
    return () => clearTimeout(t);
  }, [n, done]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h1 className="text-xl font-bold text-rose-wine">A Message From My Heart</h1>

      <motion.div
        initial={{ y: 80, opacity: 0, rotate: 0 }}
        animate={{ y: 0, opacity: 1, rotate: -3 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-[330px] rounded-md bg-[#fdfbe9] p-6 shadow-xl ring-1 ring-black/10"
      >
        <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-rose-deep text-white shadow">
          ♥
        </span>
        <p className="min-h-[300px] whitespace-pre-wrap font-hand text-[1.35rem] font-medium leading-snug text-neutral-700">
          {full.slice(0, n)}
          {!done && <span className="animate-pulse">|</span>}
        </p>
        <span className="absolute bottom-2 right-3 text-3xl">🐱🐶</span>
      </motion.div>

      <div className="h-12">{done && <Button onClick={onDone}>Continue</Button>}</div>
    </div>
  );
}
