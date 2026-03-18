"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const MESSAGES = [
  "Un salon à Paris vient de s'inscrire",
  "Un salon à Lyon a sécurisé sa place",
  "Un salon à Bordeaux vient de rejoindre le cercle",
  "Un salon à Marseille vient de s'inscrire",
  "Un salon à Toulouse a réservé sa place",
  "Un salon à Nantes vient de rejoindre La Loge",
];

const CYCLE_MS = 6000;
const VISIBLE_MS = 3500;
const INITIAL_DELAY_MS = 10000;

export function LiveTicker() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [started, setStarted] = useState(false);

  /* Wait before showing the first notification */
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), INITIAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  /* Cycle: show → hold → hide → next */
  useEffect(() => {
    if (!started) return;

    setShow(true);

    const hideTimer = setTimeout(() => setShow(false), VISIBLE_MS);
    const nextTimer = setTimeout(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      CYCLE_MS
    );

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [started, index]);

  return (
    <div
      className="live-ticker-container"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={index}
            className="live-ticker-pill"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <span className="live-ticker-dot" aria-hidden="true" />
            <span>{MESSAGES[index]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
