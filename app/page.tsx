"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "@/components/Intro";
import Balloons from "@/components/Balloons";
import Candle from "@/components/Candle";
import Bouquet from "@/components/Bouquet";
import Moments from "@/components/Moments";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";
import Gift from "@/components/Gift";
import Finale from "@/components/Finale";

const steps = ["intro", "balloons", "candle", "bouquet", "moments", "envelope", "letter", "gift", "finale"] as const;

export default function Page() {
  const [i, setI] = useState(0);
  const next = () => setI((n) => Math.min(n + 1, steps.length - 1));
  const step = steps[i];

  return (
    <main className="relative z-10 h-[100dvh] w-screen overflow-hidden">
      {/* crossfade: old and new screens overlap, so there is never an empty frame */}
      <AnimatePresence initial={false}>
        <motion.section
          key={step}
          className="screen absolute inset-0 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center px-4"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, scale: 1.02, pointerEvents: "none", transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}
        >
          {step === "intro" && <Intro onDone={next} />}
          {step === "balloons" && <Balloons onDone={next} />}
          {step === "candle" && <Candle onDone={next} />}
          {step === "bouquet" && <Bouquet onDone={next} />}
          {step === "moments" && <Moments onDone={next} />}
          {step === "envelope" && <Envelope onDone={next} />}
          {step === "letter" && <Letter onDone={next} />}
          {step === "gift" && <Gift onDone={next} />}
          {step === "finale" && <Finale onReplay={() => setI(0)} />}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
