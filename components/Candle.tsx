"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
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
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ["#d6204f", "#ff9ec0", "#ffd166"] });
    setTimeout(onDone, 2200);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <h1 className="mt-[12%] text-center text-xl font-bold text-rose-deep">Blow the candle, {site.name}</h1>

      <div className="relative mt-20 h-56 w-56">
        {/* candle */}
        <div className="absolute left-1/2 top-0 h-20 w-2.5 -translate-x-1/2 rounded-sm bg-gradient-to-b from-rose-deep to-rose-wine" />
        {/* flame or smoke */}
        {phase !== "blown" ? (
          <div className="absolute -top-6 left-1/2 h-7 w-4 -translate-x-1/2 animate-flicker rounded-[50%_50%_50%_50%/70%_70%_30%_30%] bg-gradient-to-t from-orange-400 to-yellow-200 shadow-[0_0_25px_8px_rgba(255,200,80,.6)]" />
        ) : (
          <div className="absolute -top-8 left-1/2 h-8 w-8 -translate-x-1/2 animate-smoke rounded-full bg-gray-400/60 blur-md" />
        )}
        {/* cake */}
        <div className="absolute top-[72px] w-full">
          <div className="mx-auto h-12 w-44 rounded-t-[50%] bg-[#f6efd9]" />
          <div
            className="mx-auto -mt-1 h-14 w-44 rounded-b-3xl bg-[#5b2a1e]"
            style={{
              clipPath:
                "polygon(0 0,8% 25%,16% 0,25% 25%,33% 0,41% 25%,50% 0,58% 25%,66% 0,75% 25%,83% 0,92% 25%,100% 0,100% 100%,0 100%)",
            }}
          />
          <div className="mx-auto -mt-1 h-3 w-56 rounded-full bg-[#cfe9e3]" />
        </div>
      </div>

      {phase === "wish" && (
        <div className="absolute inset-0 flex items-center justify-center bg-rose-deep/20 backdrop-blur-[2px]">
          <p className="text-center text-4xl font-bold leading-tight text-white drop-shadow-lg">
            Close your eyes
            <br />
            &amp; make a wish
          </p>
        </div>
      )}
      {phase === "ready" && (
        <button
          onClick={blow}
          className="absolute bottom-[10%] rounded-full bg-white/80 px-8 py-3 text-sm font-bold text-rose-wine shadow-lg backdrop-blur"
        >
          🌬️ Tap to blow the candle
        </button>
      )}
      {phase === "blown" && <p className="absolute bottom-[14%] font-hand text-3xl text-rose-deep">Wish granted ✨</p>}
    </div>
  );
}
