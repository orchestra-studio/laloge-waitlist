"use client";

import { Fragment, useEffect, useState } from "react";
import {
  BarChart3,
  Crown,
  MessageCircle,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { WaitlistForm } from "../components/waitlist-form";
import { GlassBackground } from "../components/glass-background";

/* ───── Constants ───── */

const TARGET = new Date("2026-06-01T00:00:00+02:00").getTime();

function getTimeLeft() {
  const difference = Math.max(TARGET - Date.now(), 0);
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
  };
}

type TimeLeft = ReturnType<typeof getTimeLeft>;

const TITLE_WORDS: Array<{ text: string; italic?: boolean }> = [
  { text: "Entrez" },
  { text: "dans" },
  { text: "le" },
  { text: "cercle.", italic: true },
];

const FEATURES: Array<{ icon: LucideIcon; title: string }> = [
  { icon: BarChart3, title: "Diagnostic offert" },
  { icon: Shield, title: "Tarifs négociés" },
  { icon: MessageCircle, title: "Concierge dédié" },
  { icon: Crown, title: "Statut Ambassadeur" },
];

const EASE_OUT_STRONG: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ───── Reduced motion hook ───── */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ───── Page ───── */

export default function Home() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const [count, setCount] = useState(73);
  const [ticked, setTicked] = useState(false);
  const noMotion = usePrefersReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  /* Scarcity counter tick — simulates a new signup after ~18 s */
  useEffect(() => {
    const tickTimer = setTimeout(() => {
      setCount(74);
      setTicked(true);
      setTimeout(() => setTicked(false), 1200);
    }, 18000);
    return () => clearTimeout(tickTimer);
  }, []);

  return (
    <div className="page">
      <GlassBackground />

      {/* ── SVG Displacement Filter (hidden) ── */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="lg-f">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0055 0.008"
            numOctaves={2}
            seed={6}
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={11}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <section className="hero" aria-labelledby="wl-title">
        <div className="hero-content">
          {/* ── Eyebrow — clip-path reveal ── */}
          <motion.span
            className="eyebrow"
            initial={noMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Score La Loge
          </motion.span>

          {/* ── Title — word-by-word kinetic reveal ── */}
          <h1 id="wl-title" className="title">
            {TITLE_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span className="word-mask">
                  <motion.span
                    className={`word${word.italic ? " word--italic" : ""}`}
                    initial={noMotion ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1,
                      delay: 0.38 + i * 0.16,
                      ease: EASE_OUT_STRONG,
                    }}
                  >
                    {word.text}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </h1>

          {/* ── Subtitle ── */}
          <motion.p
            className="subtitle"
            initial={noMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            La conciergerie beauté pour salons d&apos;exception.
          </motion.p>

          {/* ── Form card — liquid glass + glimmer sweep ── */}
          <motion.div
            className="form-section"
            initial={noMotion ? false : { y: 20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.0,
              ease: EASE_OUT_STRONG,
            }}
          >
            <div className="form-card liquid-glass liquid-glass--form">
              <span className="form-glimmer" aria-hidden="true" />
              <WaitlistForm />
            </div>
          </motion.div>

          {/* ── Scarcity ── */}
          <motion.div
            className="scarcity"
            initial={noMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            aria-label="Disponibilité limitée"
          >
            <div className="scarcity-bar-row">
              <div
                className="scarcity-track"
                role="progressbar"
                aria-label={`${count} sur 100 salons ambassadeurs déjà inscrits`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={count}
              >
                <motion.span
                  className="scarcity-fill"
                  initial={noMotion ? false : { width: "0%" }}
                  animate={{ width: `${count}%` }}
                  transition={{ duration: 1.4, delay: 1.2, ease: "easeOut" }}
                />
              </div>
              <span className="scarcity-pct">{count}%</span>
            </div>
            <p className={`scarcity-label${ticked ? " ticked" : ""}`}>
              {count}/100 places ambassadeur
            </p>
          </motion.div>

          {/* ── Feature pills — staggered entry ── */}
          <div className="features">
            {FEATURES.map(({ icon: Icon, title }, i) => (
              <motion.div
                key={title}
                className="feature-pill liquid-glass liquid-glass--pill"
                initial={noMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.3 + i * 0.065,
                  ease: EASE_OUT_STRONG,
                }}
              >
                <div className="feature-pill-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <span className="feature-pill-title">{title}</span>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom info — countdown + social proof ── */}
          <motion.div
            className="bottom-info"
            initial={noMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <span className="countdown-compact" aria-label="Compte à rebours">
              {time.days}J · {time.hours}H · {time.minutes}M
            </span>
            <span className="social-compact">1 700+ salons analysés</span>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-line" />
          <span>La Loge · Beauté</span>
          <span className="footer-line" />
        </div>
      </footer>
    </div>
  );
}
