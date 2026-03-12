"use client";

import { Fragment, useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { WaitlistForm } from "../components/waitlist-form";

const TARGET = new Date("2026-06-01T00:00:00+02:00").getTime();

function getTimeLeft() {
  const d = Math.max(TARGET - Date.now(), 0);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

const UNITS = [
  { key: "days", label: "days" },
  { key: "hours", label: "hours" },
  { key: "minutes", label: "minutes" },
  { key: "seconds", label: "seconds" },
] as const;

export default function Home() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page">
      {/* Background burst image — exact same as Framer v4 */}
      <div className="bg">
        <Image
          src="/bg-burst.webp"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      <main className="main">
        <motion.section
          className="section"
          initial={{ opacity: 0.001, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.2, delay: 0.3, duration: 1 }}
          aria-labelledby="wl-title"
        >
          {/* Heading */}
          <div className="heading">
            <h1 id="wl-title" className="title">
              Rejoignez La Loge
            </h1>
            <p className="subtitle">
              La conciergerie beauté IA qui négocie les meilleures conditions
              auprès des marques pour votre salon
            </p>
          </div>

          {/* Form */}
          <WaitlistForm />

          {/* Social proof */}
          <div className="social-proof">
            <div className="avatars">
              <Image className="avatar" src="/avatar-1.png" alt="" width={28} height={28} />
              <Image className="avatar" src="/avatar-2.png" alt="" width={28} height={28} />
              <Image className="avatar" src="/avatar-3.png" alt="" width={28} height={28} />
            </div>
            <p>~ 1 700+ salons déjà analysés</p>
          </div>

          {/* Countdown */}
          <div className="countdown" aria-label="Compte à rebours">
            {UNITS.map((u, i) => (
              <Fragment key={u.key}>
                <div className="countdown-unit">
                  <span className="countdown-value">
                    {String(time[u.key]).padStart(u.key === "days" ? 3 : 2, "0")}
                  </span>
                  <span className="countdown-label">{u.label}</span>
                </div>
                {i < UNITS.length - 1 && (
                  <span className="countdown-sep" aria-hidden="true">|</span>
                )}
              </Fragment>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span>La Loge</span>
          <span className="footer-dot" />
          <span>Conciergerie Beauté IA</span>
        </div>
      </footer>
    </div>
  );
}
