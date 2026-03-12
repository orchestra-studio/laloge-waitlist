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
import Image from "next/image";
import { WaitlistForm } from "../components/waitlist-form";

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

const UNITS: Array<{ key: keyof TimeLeft; label: string; pad: number }> = [
  { key: "days", label: "jours", pad: 3 },
  { key: "hours", label: "heures", pad: 2 },
  { key: "minutes", label: "minutes", pad: 2 },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: "Diagnostic confidentiel",
    description:
      "Analyse complète de votre positionnement, benchmark local et potentiel de croissance",
  },
  {
    icon: Shield,
    title: "Négociation marques",
    description:
      "De meilleures conditions auprès des grandes maisons : Revlon, Schwarzkopf, Wella et plus",
  },
  {
    icon: MessageCircle,
    title: "Concierge dédié",
    description:
      "Un interlocuteur unique pour tous vos besoins professionnels, disponible quand vous en avez besoin",
  },
  {
    icon: Crown,
    title: "Cercle fondateur",
    description:
      "Rejoignez un réseau sélectif de salons d'excellence avec des avantages exclusifs à vie",
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}>;

export default function Home() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="page">
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
        <div className="main-stack">
          <motion.section
            className="section"
            initial={{ opacity: 0.001, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.2, delay: 0.3, duration: 1 }}
            aria-labelledby="wl-title"
          >
            <div className="heading">
              <span className="badge">✨ Accès avant-première</span>
              <h1 id="wl-title" className="title">
                Entrez dans le cercle.
              </h1>
              <p className="subtitle">
                La Loge représente les salons indépendants d&apos;excellence
                auprès des grandes marques. Diagnostic confidentiel de votre
                salon, conditions négociées et accompagnement premium.
              </p>
            </div>

            <WaitlistForm />

            <div className="scarcity" aria-label="Disponibilité limitée">
              <p className="scarcity-heading">
                73 / 100 salons fondateurs déjà inscrits
              </p>
              <div
                className="scarcity-bar"
                role="progressbar"
                aria-label="73 sur 100 salons fondateurs déjà inscrits"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={73}
              >
                <span className="scarcity-fill" />
              </div>
              <p className="scarcity-text">
                Accès limité pour garantir un accompagnement d&apos;excellence
              </p>
            </div>

            <div className="social-proof">
              <div className="avatars" aria-hidden="true">
                <Image
                  className="avatar"
                  src="/avatar-1.png"
                  alt=""
                  width={28}
                  height={28}
                />
                <Image
                  className="avatar"
                  src="/avatar-2.png"
                  alt=""
                  width={28}
                  height={28}
                />
                <Image
                  className="avatar"
                  src="/avatar-3.png"
                  alt=""
                  width={28}
                  height={28}
                />
              </div>
              <p>Plus de 1 700 salons déjà analysés à travers la France</p>
            </div>

            <div className="countdown" aria-label="Compte à rebours">
              {UNITS.map((unit, index) => (
                <Fragment key={unit.key}>
                  <div className="countdown-unit">
                    <span className="countdown-value">
                      {String(time[unit.key]).padStart(unit.pad, "0")}
                    </span>
                    <span className="countdown-label">{unit.label}</span>
                  </div>
                  {index < UNITS.length - 1 && (
                    <span className="countdown-sep" aria-hidden="true">
                      |
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </motion.section>

          <motion.div
            className="features"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.45,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <motion.article
                key={title}
                className="feature-card"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
              >
                <div className="feature-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.9} />
                </div>
                <h2 className="feature-title">{title}</h2>
                <p className="feature-desc">{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </main>

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
