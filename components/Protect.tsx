"use client";
import { useEffect } from "react";

// Blocks copy, cut, select-all, context menu and drag across the whole page.
export default function Protect() {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    const events = ["copy", "cut", "contextmenu", "dragstart", "selectstart"];
    events.forEach((n) => document.addEventListener(n, block));
    return () => events.forEach((n) => document.removeEventListener(n, block));
  }, []);
  return null;
}
