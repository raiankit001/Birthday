"use client";
import { motion } from "framer-motion";

export default function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="rounded-full bg-rose-deep px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-deep/30"
    >
      {children}
    </motion.button>
  );
}
