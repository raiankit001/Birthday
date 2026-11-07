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
    <main className="relative mx-auto flex h-[100dvh] w-full max-w-md items-center justify-center overflow-hidden px-4">
      <AnimatePresence mode="wait">
        <motion.section
          key={step}
          className="flex h-full w-full flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45 }}
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
