"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

export default function Bouquet({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <h1 className="font-hand text-4xl font-bold text-rose-deep">Your Rose Bouquet 🌹</h1>
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <div className="animate-float select-none text-[10rem] leading-none drop-shadow-xl">💐</div>
      </motion.div>
      <div className="h-12">{show && <Button onClick={onDone}>Continue →</Button>}</div>
    </div>
  );
}
