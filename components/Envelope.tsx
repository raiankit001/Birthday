"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Envelope({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const tap = () => {
    if (open) return;
    setOpen(true);
    setTimeout(onDone, 1400);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-rose-wine">A Message From My Heart</h1>
        <p className="mt-1 text-xs text-rose-wine/70">Tap the envelope to open</p>
      </div>

      <motion.button
        onClick={tap}
        whileTap={{ scale: 0.97 }}
        className="relative h-44 w-72 [perspective:900px]"
        aria-label="Open envelope"
      >
        {/* letter peeking out */}
        <motion.div
          className="absolute inset-x-4 top-2 h-36 rounded-md bg-white shadow"
          animate={{ y: open ? -70 : 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        />
        {/* body */}
        <div
          className="absolute inset-0 rounded-lg bg-[#f6efd9]"
          style={{ boxShadow: "inset 0 0 0 2px #d9a93a, 0 12px 24px rgba(0,0,0,.15)" }}
        />
        <div
          className="absolute inset-0 bg-[#fbf6e4]"
          style={{ clipPath: "polygon(0 0,50% 58%,100% 0,100% 100%,0 100%)" }}
        />
        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-28 origin-top"
          style={{
            clipPath: "polygon(0 0,100% 0,50% 100%)",
            background: "linear-gradient(#f9c0a6,#f4a98f)",
            backfaceVisibility: "hidden",
          }}
          animate={{ rotateX: open ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {!open && <p className="animate-pulse text-xs font-bold tracking-widest text-rose-deep">TAP TO OPEN</p>}
    </div>
  );
}
