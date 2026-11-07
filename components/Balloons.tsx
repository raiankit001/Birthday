"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { site } from "@/config/site";

const colors = ["#ff6b9a", "#ff9ec0", "#f4577f", "#ffb3cd"];
const pos = [
  "left-1/2 top-1/2 -ml-[120px] -mt-[150px]",
  "left-1/2 top-1/2 -ml-[10px] -mt-[120px]",
  "left-1/2 top-1/2 -ml-[105px] -mt-[0px]",
  "left-1/2 top-1/2 -ml-[5px] mt-[25px]",
];

export default function Balloons({ onDone }: { onDone: () => void }) {
  const [popped, setPopped] = useState<boolean[]>([false, false, false, false]);
  const count = popped.filter(Boolean).length;

  useEffect(() => {
    if (count === 4) {
      const t = setTimeout(onDone, 1500);
      return () => clearTimeout(t);
    }
  }, [count, onDone]);

  const pop = (i: number, e: React.MouseEvent) => {
    if (popped[i]) return;
    setPopped((p) => p.map((v, k) => (k === i ? true : v)));
    confetti({
      particleCount: 40,
      spread: 70,
      startVelocity: 25,
      scalar: 0.8,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: [colors[i], "#ffd166", "#fff"],
    });
  };

  return (
    <div className="relative h-full w-full">
      <h1 className="absolute inset-x-0 top-[12%] text-center text-xl font-bold text-rose-deep">
        {count === 4 ? "🎉" : "Pop all 4 balloons"}
      </h1>
      {site.balloonWords.slice(0, 4).map((w, i) => (
        <div key={i} className={`absolute ${pos[i]} flex h-36 w-28 items-center justify-center`}>
          {popped[i] ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-hand text-3xl font-bold text-rose-deep"
            >
              {w}
            </motion.span>
          ) : (
            <motion.button
              onClick={(e) => pop(i, e)}
              whileTap={{ scale: 1.25 }}
              className="animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
              aria-label="Pop balloon"
            >
              <div
                className="relative mx-auto h-24 w-20 rounded-[50%_50%_48%_48%] shadow-inner"
                style={{ background: `radial-gradient(circle at 30% 30%, #fff8, ${colors[i]} 45%)` }}
              >
                <div
                  className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45"
                  style={{ background: colors[i] }}
                />
              </div>
              <div className="mx-auto h-14 w-px bg-rose-deep/40" />
            </motion.button>
          )}
        </div>
      ))}
    </div>
  );
}
