"use client";

import { motion } from "motion/react";
import { Fragment, useEffect, useState } from "react";

import { WaitlistForm } from "../components/waitlist-form";

const TARGET_DATE = new Date("2026-06-01T00:00:00+02:00").getTime();
const AVATARS = ["ML", "AB", "CP"] as const;

function getTimeLeft() {
  const difference = Math.max(TARGET_DATE - Date.now(), 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdown = [
    { value: String(timeLeft.days).padStart(3, "0"), label: "days" },
    { value: String(timeLeft.hours).padStart(2, "0"), label: "hours" },
    { value: String(timeLeft.minutes).padStart(2, "0"), label: "minutes" },
    { value: String(timeLeft.seconds).padStart(2, "0"), label: "seconds" },
  ] as const;

  return (
    <div className="waitlist-page">
      <div className="bg-burst" aria-hidden="true" />

      <main className="waitlist-main">
        <motion.section
          initial={{ opacity: 0.001, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.2, delay: 0.3, duration: 1 }}
          className="waitlist-section"
          aria-labelledby="waitlist-title"
        >
          <div className="heading-block">
            <h1 id="waitlist-title" className="waitlist-title title-gradient">
              Rejoignez La Loge
            </h1>
            <p className="waitlist-subtitle">
              La conciergerie beauté IA qui négocie les meilleures conditions
              auprès des marques pour votre salon.
            </p>
          </div>

          <WaitlistForm />

          <div className="social-proof" aria-label="Preuve sociale">
            <div className="avatars" aria-hidden="true">
              {AVATARS.map((avatar, index) => (
                <span key={avatar} className={`avatar avatar-${index + 1}`}>
                  {avatar}
                </span>
              ))}
            </div>
            <p>1 700+ salons déjà analysés</p>
          </div>

          <div className="countdown" aria-label="Compte à rebours avant l’ouverture">
            {countdown.map((item, index) => (
              <Fragment key={item.label}>
                <div className="countdown-item">
                  <span className="countdown-value">{item.value}</span>
                  <span className="countdown-label">{item.label}</span>
                </div>
                {index < countdown.length - 1 ? (
                  <span className="countdown-separator" aria-hidden="true">
                    |
                  </span>
                ) : null}
              </Fragment>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="waitlist-footer">
        <div className="waitlist-footer-inner">
          © 2026 La Loge · Conciergerie Beauté IA
        </div>
      </footer>
    </div>
  );
}
