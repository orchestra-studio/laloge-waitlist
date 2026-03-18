"use client";

import { useEffect, useState } from "react";

/* Generate particle data at module level — stable across renders */
const ALL_PARTICLES = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 1 + Math.random() * 2,
  alpha: 0.15 + Math.random() * 0.2,
  duration: 15 + Math.random() * 15,
  delay: -(Math.random() * 30),
  drift: (Math.random() - 0.5) * 60,
  color: Math.random() > 0.5 ? "#9E8B6E" : "#C2B59B",
}));

export function GlassBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const particles = isMobile
    ? ALL_PARTICLES.slice(0, 18)
    : ALL_PARTICLES;

  return (
    <div className="glass-bg" aria-hidden="true">
      {/* Layer 2 — Organic wave shapes */}
      <svg
        className="glass-bg-waves"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="glass-wave glass-wave-1"
          d="M-40 620 C200 560 440 640 720 580 C1000 520 1240 620 1480 560 L1480 920 L-40 920Z"
        />
        <path
          className="glass-wave glass-wave-2"
          d="M-40 700 C320 650 560 730 840 680 C1120 630 1360 710 1480 670 L1480 920 L-40 920Z"
        />
        <path
          className="glass-wave glass-wave-3"
          d="M-40 760 C160 730 460 790 720 750 C980 710 1280 770 1480 740 L1480 920 L-40 920Z"
        />
      </svg>

      {/* Layer 3 — Gold dust particles */}
      <div className="glass-bg-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="gold-particle"
            style={
              {
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                "--p-alpha": p.alpha,
                "--p-drift": `${p.drift}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Layer 4 — Sunrise light glow (brighter & bigger) */}
      <div className="glass-bg-glow" />

      {/* Layer 5 — Subtle geometric network (Score La Loge algorithm feel) */}
      <svg
        className="glass-bg-network"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric scanning rings */}
        <circle cx="400" cy="400" r="140" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.18" strokeDasharray="4 8" />
        <circle cx="400" cy="400" r="240" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.14" strokeDasharray="2 6" />
        <circle cx="400" cy="400" r="340" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" strokeDasharray="1 10" />

        {/* Network constellation lines */}
        <line x1="200" y1="200" x2="400" y2="150" stroke="#9E8B6E" strokeWidth="1" opacity="0.22" />
        <line x1="400" y1="150" x2="600" y2="220" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.18" />
        <line x1="600" y1="220" x2="650" y2="400" stroke="#9E8B6E" strokeWidth="1" opacity="0.20" />
        <line x1="650" y1="400" x2="550" y2="580" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.22" />
        <line x1="550" y1="580" x2="350" y2="620" stroke="#9E8B6E" strokeWidth="1" opacity="0.18" />
        <line x1="350" y1="620" x2="150" y2="520" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.22" />
        <line x1="150" y1="520" x2="180" y2="350" stroke="#9E8B6E" strokeWidth="1" opacity="0.20" />
        <line x1="180" y1="350" x2="200" y2="200" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.18" />
        {/* Spokes to center */}
        <line x1="200" y1="200" x2="400" y2="400" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.15" />
        <line x1="600" y1="220" x2="400" y2="400" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.13" />
        <line x1="550" y1="580" x2="400" y2="400" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.15" />
        <line x1="150" y1="520" x2="400" y2="400" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.13" />

        {/* Connection nodes at vertices */}
        <circle cx="200" cy="200" r="3.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="400" cy="150" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="600" cy="220" r="3.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="650" cy="400" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="550" cy="580" r="3.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="350" cy="620" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="150" cy="520" r="3.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="180" cy="350" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="400" cy="400" r="4.5" fill="#9E8B6E" opacity="0.30" />

        {/* Scattered data dots */}
        <circle cx="300" cy="180" r="1.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="520" cy="190" r="1.5" fill="#9E8B6E" opacity="0.22" />
        <circle cx="630" cy="310" r="1.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="600" cy="500" r="1.5" fill="#9E8B6E" opacity="0.22" />
        <circle cx="440" cy="600" r="1.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="240" cy="570" r="1.5" fill="#9E8B6E" opacity="0.22" />
        <circle cx="170" cy="430" r="1.5" fill="#9E8B6E" opacity="0.25" />
        <circle cx="280" cy="290" r="1.5" fill="#9E8B6E" opacity="0.22" />
      </svg>
    </div>
  );
}
