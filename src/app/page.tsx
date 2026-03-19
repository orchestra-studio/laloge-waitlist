"use client";

import { useEffect, useState } from "react";
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

const FEATURES: Array<{ icon: LucideIcon; title: string }> = [
  { icon: BarChart3, title: "Diagnostic offert" },
  { icon: Shield, title: "Tarifs négociés" },
  { icon: MessageCircle, title: "Concierge dédié" },
  { icon: Crown, title: "Statut Fondateur" },
];

/* ───── Animation variants ───── */

const stagger = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.25, staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, bounce: 0.15, duration: 0.7 },
  },
};

/* ───── Page ───── */

export default function Home() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const [count, setCount] = useState(73);
  const [ticked, setTicked] = useState(false);

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

      <section className="hero" aria-labelledby="wl-title">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span className="badge" variants={fadeUp}>
            ✨ Accès avant-première
          </motion.span>

          <motion.h1 id="wl-title" className="title" variants={fadeUp}>
            Entrez dans le cercle.
          </motion.h1>

          <motion.p className="subtitle" variants={fadeUp}>
            La conciergerie beauté pour salons d&apos;exception.
          </motion.p>

          <motion.div variants={fadeUp} className="form-section">
            <WaitlistForm />
          </motion.div>

          <motion.div
            className="scarcity"
            variants={fadeUp}
            aria-label="Disponibilité limitée"
          >
            <p className={`scarcity-heading${ticked ? " ticked" : ""}`}>
              🔥 {count}/100 — Plus que {100 - count} places
            </p>
            <div
              className="scarcity-bar"
              role="progressbar"
              aria-label={`${count} sur 100 salons fondateurs déjà inscrits`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={count}
            >
              <span
                className="scarcity-fill"
                style={{ width: `${count}%` }}
              />
            </div>
          </motion.div>

          <motion.div className="features" variants={fadeUp}>
            {FEATURES.map(({ icon: Icon, title }) => (
              <div key={title} className="feature-pill">
                <div className="feature-pill-icon" aria-hidden="true">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <span className="feature-pill-title">{title}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="bottom-info" variants={fadeUp}>
            <span className="countdown-compact" aria-label="Compte à rebours">
              {String(time.days).padStart(2, "0")}j :{" "}
              {String(time.hours).padStart(2, "0")}h :{" "}
              {String(time.minutes).padStart(2, "0")}m
            </span>
            <span className="info-dot" aria-hidden="true" />
            <span className="social-compact">
              1 700+ salons analysés · Rejoignez les {count} fondateurs
            </span>
          </motion.div>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <span>La Loge</span>
          <span className="footer-dot" />
          <span>Conciergerie Beauté</span>
        </div>
      </footer>
    </div>
  );
}
