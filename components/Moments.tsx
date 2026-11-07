"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import Button from "./Button";

export default function Moments({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const list = site.moments;
  const left = list.length - idx;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-rose-deep">Some Sweet Moments</h1>
        <p className="mt-1 text-xs text-rose-wine/70">(Swipe the cards)</p>
      </div>

      <div className="relative h-[420px] w-[270px]">
        {/* cards waiting behind */}
        {list.slice(idx + 1, idx + 3).map((m, k) => (
          <Polaroid
            key={idx + k + 1}
            src={m.src}
            caption={m.caption}
            style={{
              transform: `rotate(${(k + 1) * (k % 2 ? -4 : 5)}deg) scale(${1 - (k + 1) * 0.03})`,
              zIndex: -k - 1,
            }}
          />
        ))}
        <AnimatePresence custom={dir}>
          {left > 0 && (
            <motion.div
              key={idx}
              custom={dir}
              className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
              drag="x"
              dragSnapToOrigin
              dragElastic={0.8}
              style={{ rotate: -2 }}
              whileDrag={{ scale: 1.03 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) {
                  setDir(info.offset.x > 0 ? 1 : -1);
                  setIdx((n) => n + 1);
                }
              }}
              exit={{ x: dir * 420, rotate: dir * 25, opacity: 0, transition: { duration: 0.4 } }}
            >
              <Polaroid src={list[idx].src} caption={list[idx].caption} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-12">{left <= 1 && <Button onClick={onDone}>Continue</Button>}</div>
    </div>
  );
}

function Polaroid({ src, caption, style }: { src: string; caption: string; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute inset-0 flex flex-col rounded-2xl bg-rose-cream p-3 shadow-xl ring-1 ring-black/5"
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={caption} draggable={false} className="min-h-0 flex-1 select-none rounded-lg object-cover" />
      <p className="pb-1 pt-3 text-center text-lg font-bold text-rose-deep">{caption}</p>
    </div>
  );
}
