"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Renders children directly in <body> so position:fixed ignores animated (transformed) ancestors.
export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
}
