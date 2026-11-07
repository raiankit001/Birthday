"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import Portal from "./Portal";
import { site } from "@/config/site";

export default function Candle({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"wish" | "ready" | "blown">("wish");

  useEffect(() => {
    if (phase !== "wish") return;
    const t = setTimeout(() => setPhase("ready"), 3200);
    return () => clearTimeout(t);
  }, [phase]);

  const blow = () => {
    setPhase("blown");
    confetti({ particleCount: 140, spread: 100, origin: { y: 0.55 }, colors: ["#ffffff", "#ffd166", "#ff4d85", "#c9184a"] });
    setTimeout(onDone, 2400);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      {/* richer backdrop */}
      <Portal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-0 bg-gradient-to-b from-[#ffc2d6] via-[#ff8fb3] to-[#d93a73]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none fixed left-1/2 top-1/3 z-0 -ml-36 h-72 w-72 rounded-full bg-white/30 blur-3xl"
        />
      </Portal>

      <h1 className="text-center text-2xl font-bold leading-snug text-white drop-shadow-[0_2px_6px_rgba(122,31,61,.45)]">
        Blow the candle,
        <br />
        <span className="text-[#7a1f3d]">{site.name}</span>
      </h1>

      <div className="relative mt-14 h-[300px] w-[280px]">
        {/* flame glow */}
        {phase !== "blown" && (
          <div className="absolute left-[92px] top-[0px] h-24 w-24 animate-pulse rounded-full bg-yellow-200/70 blur-2xl" />
        )}
        {/* flame / smoke */}
        {phase !== "blown" ? (
          <div className="absolute left-[130px] top-[20px] h-9 w-5">
            <div className="h-full w-full origin-bottom animate-flicker rounded-[50%_50%_50%_50%/72%_72%_28%_28%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_28px_10px_rgba(255,190,60,.7)]" />
          </div>
        ) : (
          <div className="absolute left-[120px] top-[10px] h-10 w-10">
            <div className="h-full w-full animate-smoke rounded-full bg-white/70 blur-md" />
          </div>
        )}

        <svg viewBox="0 0 280 300" className="absolute inset-0 h-full w-full drop-shadow-[0_18px_18px_rgba(122,31,61,.35)]">
          <defs>
            <clipPath id="bottomTier">
              <rect x="30" y="190" width="220" height="76" rx="18" />
            </clipPath>
            <linearGradient id="choc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8a3a2b" />
              <stop offset="1" stopColor="#4a1d16" />
            </linearGradient>
            <linearGradient id="cream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffaf0" />
              <stop offset="1" stopColor="#ffd9e4" />
            </linearGradient>
            <linearGradient id="wax" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff4d85" />
              <stop offset="1" stopColor="#c9184a" />
            </linearGradient>
          </defs>

          {/* candle */}
          <rect x="132" y="62" width="16" height="64" rx="3" fill="url(#wax)" />
          {[74, 90, 106].map((y) => (
            <rect key={y} x="132" y={y} width="16" height="6" fill="#fff" opacity=".55" />
          ))}
          <rect x="138.5" y="54" width="3" height="10" rx="1.5" fill="#3a2a2a" />

          {/* plate */}
          <ellipse cx="140" cy="268" rx="132" ry="16" fill="#fff" opacity=".9" />
          <ellipse cx="140" cy="264" rx="120" ry="12" fill="#ffe3ec" />

          {/* bottom tier */}
          <rect x="30" y="190" width="220" height="76" rx="18" fill="url(#choc)" />
          <path
            clipPath="url(#bottomTier)"
            d="M30 190 V204 q 18.33 24 36.67 0 t 36.67 0 t 36.67 0 t 36.67 0 t 36.67 0 t 36.66 0 V190 z"
            fill="url(#cream)"
          />

          {/* top tier */}
          <rect x="62" y="126" width="156" height="72" rx="16" fill="url(#cream)" />
          <path d="M62 150 q 13 24 26 0 t 26 0 t 26 0 t 26 0 t 26 0 t 26 0 v-10 H62z" fill="#ff7aa5" />

          {/* sprinkles */}
          {[
            [90, 232, "#ffd166"], [120, 245, "#7bd389"], [156, 236, "#6ec6ff"], [188, 247, "#ffd166"],
            [214, 230, "#ff7aa5"], [64, 246, "#6ec6ff"], [104, 170, "#fff"], [146, 178, "#ffd166"], [186, 168, "#fff"],
          ].map(([x, y, c], i) => (
            <rect key={i} x={x as number} y={y as number} width="9" height="3.5" rx="1.7" fill={c as string} transform={`rotate(${i * 37} ${x} ${y})`} />
          ))}

          {/* cherries */}
          <circle cx="98" cy="122" r="9" fill="#d90429" />
          <circle cx="182" cy="122" r="9" fill="#d90429" />
          <circle cx="95" cy="119" r="2.5" fill="#fff" opacity=".7" />
          <circle cx="179" cy="119" r="2.5" fill="#fff" opacity=".7" />
        </svg>
      </div>

      {phase === "ready" && (
        <button
          onClick={blow}
          className="absolute bottom-[9%] rounded-full bg-gradient-to-r from-rose-deep to-[#ff4d85] px-9 py-3.5 text-sm font-bold text-white shadow-xl shadow-rose-wine/40 active:scale-95"
        >
          💨 Tap to blow the candle
        </button>
      )}
      {phase === "blown" && (
        <p className="absolute bottom-[12%] font-hand text-4xl font-bold text-white drop-shadow">Wish granted ✨</p>
      )}

      <Portal>
      <AnimatePresence>
      {phase === "wish" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-rose-wine/50 to-rose-deep/60 backdrop-blur-sm"
        >
          {["top-[15%] left-[18%]", "top-[25%] right-[16%]", "bottom-[22%] left-[22%]", "bottom-[14%] right-[20%]"].map((p, i) => (
            <span key={i} className={`absolute ${p} animate-float text-2xl text-white/70`} style={{ animationDelay: `${i * 0.5}s` }}>
              ✦
            </span>
          ))}
          <span className="animate-float text-6xl">🌠</span>
          <p className="px-6 text-center text-4xl font-bold leading-tight text-white drop-shadow-lg">
            Close your eyes
            <br />
            &amp; make a wish
          </p>
          <p className="font-hand text-xl text-white/80">the candle is almost ready…</p>
        </motion.div>
      )}
      </AnimatePresence>
      </Portal>
    </div>
  );
}
