"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

const METRICS = [
  {
    value: 6,
    label: "marques partenaires déjà identifiées",
    suffix: "",
    prefix: "",
  },
  {
    value: 1700,
    label: "salons cartographiés pour le matching",
    suffix: "+",
    prefix: "",
  },
  {
    value: 30,
    label: "jusqu’à de meilleures conditions négociées",
    suffix: "%",
    prefix: "-",
  },
] as const;

function useSectionInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || isInView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isInView]);

  return { ref, isInView };
}

function AnimatedValue({
  value,
  prefix,
  suffix,
  isInView,
}: {
  value: number;
  prefix: string;
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const formatter = useMemo(() => new Intl.NumberFormat("fr-FR"), []);

  useEffect(() => {
    if (!isInView || hasAnimated.current) {
      return;
    }

    hasAnimated.current = true;

    let frame = 0;
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(value * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span className="font-display text-[2.8rem] leading-none text-[color:var(--color-cream)] sm:text-[3.65rem]">
      <span className="text-[color:var(--color-gold)]">{prefix}</span>
      {formatter.format(Math.round(displayValue))}
      <span className="text-[color:var(--color-gold)]">{suffix}</span>
    </span>
  );
}

export function AnimatedStats() {
  const { ref, isInView } = useSectionInView<HTMLDivElement>();

  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-3">
      {METRICS.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.08 }}
          className="luxury-card rounded-[var(--radius-xl)] p-6 sm:p-7"
        >
          <div className="space-y-4">
            <div className="h-px w-12 bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
            <AnimatedValue
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              isInView={isInView}
            />
            <p className="max-w-[18rem] text-sm uppercase tracking-[0.18em] text-muted sm:text-[0.78rem]">
              {metric.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
