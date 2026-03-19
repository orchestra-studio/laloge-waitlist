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

      {/* Layer 5 — Dense algorithm ecosystem (Score La Loge data network) */}
      <svg
        className="glass-bg-network"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Concentric scanning rings (6) ── */}
        <circle cx="500" cy="500" r="80" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.16" strokeDasharray="3 5" />
        <circle cx="500" cy="500" r="150" stroke="#9E8B6E" strokeWidth="0.7" opacity="0.14" strokeDasharray="5 8" />
        <circle cx="500" cy="500" r="250" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" strokeDasharray="2 6" />
        <circle cx="500" cy="500" r="350" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.10" strokeDasharray="4 10" />
        <circle cx="500" cy="500" r="450" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.09" strokeDasharray="1 8" />
        <circle cx="500" cy="500" r="520" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.08" strokeDasharray="2 12" />

        {/* ── Primary constellation — outer polygon (10 vertices) ── */}
        <line x1="920" y1="460" x2="860" y2="680" stroke="#9E8B6E" strokeWidth="0.9" opacity="0.20" />
        <line x1="860" y1="680" x2="700" y2="840" stroke="#9E8B6E" strokeWidth="1" opacity="0.22" />
        <line x1="700" y1="840" x2="480" y2="910" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.18" />
        <line x1="480" y1="910" x2="260" y2="840" stroke="#9E8B6E" strokeWidth="1" opacity="0.20" />
        <line x1="260" y1="840" x2="100" y2="660" stroke="#9E8B6E" strokeWidth="0.9" opacity="0.22" />
        <line x1="100" y1="660" x2="70" y2="430" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.18" />
        <line x1="70" y1="430" x2="150" y2="210" stroke="#9E8B6E" strokeWidth="1" opacity="0.20" />
        <line x1="150" y1="210" x2="370" y2="90" stroke="#9E8B6E" strokeWidth="0.9" opacity="0.22" />
        <line x1="370" y1="90" x2="620" y2="80" stroke="#9E8B6E" strokeWidth="0.8" opacity="0.18" />
        <line x1="620" y1="80" x2="920" y2="460" stroke="#9E8B6E" strokeWidth="1" opacity="0.15" />

        {/* ── Secondary constellation — inner hexagon (6 vertices) ── */}
        <line x1="720" y1="500" x2="610" y2="690" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.16" />
        <line x1="610" y1="690" x2="390" y2="690" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.14" />
        <line x1="390" y1="690" x2="280" y2="500" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.16" />
        <line x1="280" y1="500" x2="390" y2="310" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.14" />
        <line x1="390" y1="310" x2="610" y2="310" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.16" />
        <line x1="610" y1="310" x2="720" y2="500" stroke="#9E8B6E" strokeWidth="0.6" opacity="0.14" />

        {/* ── Hub spokes — center to inner nodes (6) ── */}
        <line x1="500" y1="500" x2="720" y2="500" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="500" y1="500" x2="610" y2="690" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />
        <line x1="500" y1="500" x2="390" y2="690" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="500" y1="500" x2="280" y2="500" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />
        <line x1="500" y1="500" x2="390" y2="310" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="500" y1="500" x2="610" y2="310" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />

        {/* ── Cross-links — inner to outer data connections (15) ── */}
        <line x1="720" y1="500" x2="920" y2="460" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="720" y1="500" x2="860" y2="680" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="610" y1="690" x2="700" y2="840" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="610" y1="690" x2="480" y2="910" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.08" />
        <line x1="390" y1="690" x2="260" y2="840" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="390" y1="690" x2="100" y2="660" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="280" y1="500" x2="70" y2="430" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="280" y1="500" x2="150" y2="210" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="390" y1="310" x2="370" y2="90" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="390" y1="310" x2="150" y2="210" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.08" />
        <line x1="610" y1="310" x2="620" y2="80" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="610" y1="310" x2="920" y2="460" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="720" y1="500" x2="700" y2="840" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.08" />
        <line x1="280" y1="500" x2="260" y2="840" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.09" />
        <line x1="610" y1="690" x2="260" y2="840" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.08" />

        {/* ── Cross-hexagon diagonals ── */}
        <line x1="720" y1="500" x2="390" y2="690" stroke="#9E8B6E" strokeWidth="0.35" opacity="0.07" />
        <line x1="610" y1="690" x2="390" y2="310" stroke="#9E8B6E" strokeWidth="0.35" opacity="0.07" />
        <line x1="280" y1="500" x2="610" y2="310" stroke="#9E8B6E" strokeWidth="0.35" opacity="0.07" />

        {/* ── Outer major nodes (10) ── */}
        <circle cx="920" cy="460" r="3.5" fill="#9E8B6E" opacity="0.28" />
        <circle cx="860" cy="680" r="3" fill="#9E8B6E" opacity="0.24" />
        <circle cx="700" cy="840" r="4" fill="#9E8B6E" opacity="0.26" />
        <circle cx="480" cy="910" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="260" cy="840" r="3.5" fill="#9E8B6E" opacity="0.28" />
        <circle cx="100" cy="660" r="3" fill="#9E8B6E" opacity="0.24" />
        <circle cx="70" cy="430" r="4" fill="#9E8B6E" opacity="0.26" />
        <circle cx="150" cy="210" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="370" cy="90" r="3.5" fill="#9E8B6E" opacity="0.28" />
        <circle cx="620" cy="80" r="3" fill="#9E8B6E" opacity="0.24" />

        {/* ── Inner secondary nodes (6) ── */}
        <circle cx="720" cy="500" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="610" cy="690" r="2.5" fill="#9E8B6E" opacity="0.20" />
        <circle cx="390" cy="690" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="280" cy="500" r="2.5" fill="#9E8B6E" opacity="0.20" />
        <circle cx="390" cy="310" r="3" fill="#9E8B6E" opacity="0.22" />
        <circle cx="610" cy="310" r="2.5" fill="#9E8B6E" opacity="0.20" />

        {/* ── Center hub ── */}
        <circle cx="500" cy="500" r="5" fill="#9E8B6E" opacity="0.30" />

        {/* ── Tick marks on r=450 ring (every 30°) ── */}
        <line x1="950" y1="500" x2="956" y2="500" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="890" y1="725" x2="895" y2="728" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="725" y1="890" x2="728" y2="893" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />
        <line x1="500" y1="950" x2="500" y2="956" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="275" y1="890" x2="272" y2="893" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />
        <line x1="110" y1="725" x2="107" y2="728" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="50" y1="500" x2="44" y2="500" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="110" y1="275" x2="107" y2="272" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />
        <line x1="275" y1="110" x2="272" y2="107" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="500" y1="50" x2="500" y2="44" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />
        <line x1="725" y1="110" x2="728" y2="107" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.12" />
        <line x1="890" y1="275" x2="893" y2="272" stroke="#9E8B6E" strokeWidth="0.5" opacity="0.10" />

        {/* ── Tick marks on r=520 ring (every ~40°) ── */}
        <line x1="1020" y1="500" x2="1026" y2="500" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="898" y1="834" x2="903" y2="838" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="240" y1="950" x2="237" y2="953" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="12" y1="678" x2="6" y2="680" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="12" y1="322" x2="6" y2="320" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="240" y1="50" x2="237" y2="47" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />
        <line x1="898" y1="166" x2="903" y2="162" stroke="#9E8B6E" strokeWidth="0.4" opacity="0.10" />

        {/* ── Data scatter dots (25) ── */}
        <circle cx="800" cy="350" r="1.2" fill="#9E8B6E" opacity="0.16" />
        <circle cx="830" cy="570" r="1" fill="#9E8B6E" opacity="0.14" />
        <circle cx="780" cy="760" r="1.5" fill="#9E8B6E" opacity="0.18" />
        <circle cx="590" cy="870" r="1" fill="#9E8B6E" opacity="0.14" />
        <circle cx="370" cy="880" r="1.2" fill="#9E8B6E" opacity="0.16" />
        <circle cx="180" cy="750" r="1.5" fill="#9E8B6E" opacity="0.18" />
        <circle cx="90" cy="550" r="1" fill="#9E8B6E" opacity="0.14" />
        <circle cx="110" cy="340" r="1.2" fill="#9E8B6E" opacity="0.16" />
        <circle cx="240" cy="150" r="1.5" fill="#9E8B6E" opacity="0.18" />
        <circle cx="490" cy="85" r="1" fill="#9E8B6E" opacity="0.14" />
        <circle cx="750" cy="130" r="1.2" fill="#9E8B6E" opacity="0.16" />
        <circle cx="660" cy="400" r="1" fill="#9E8B6E" opacity="0.14" />
        <circle cx="340" cy="590" r="1.5" fill="#9E8B6E" opacity="0.18" />
        <circle cx="560" cy="620" r="1" fill="#9E8B6E" opacity="0.12" />
        <circle cx="440" cy="380" r="1.2" fill="#9E8B6E" opacity="0.16" />
        <circle cx="540" cy="280" r="1.5" fill="#9E8B6E" opacity="0.14" />
        <circle cx="320" cy="430" r="1" fill="#9E8B6E" opacity="0.12" />
        <circle cx="660" cy="570" r="1.2" fill="#9E8B6E" opacity="0.16" />
        <circle cx="450" cy="750" r="1" fill="#9E8B6E" opacity="0.14" />
        <circle cx="200" cy="480" r="1.5" fill="#9E8B6E" opacity="0.18" />
        <circle cx="850" cy="430" r="1" fill="#9E8B6E" opacity="0.12" />
        <circle cx="310" cy="200" r="1.2" fill="#9E8B6E" opacity="0.15" />
        <circle cx="560" cy="160" r="1" fill="#9E8B6E" opacity="0.13" />
        <circle cx="680" cy="250" r="1.5" fill="#9E8B6E" opacity="0.17" />
        <circle cx="170" cy="610" r="1" fill="#9E8B6E" opacity="0.14" />

        {/* ── Score La Loge data fragments ── */}
        <text x="740" y="485" fill="#9E8B6E" opacity="0.15" fontSize="7" fontFamily="monospace">8.7</text>
        <text x="370" y="705" fill="#9E8B6E" opacity="0.13" fontSize="6" fontFamily="monospace">96%</text>
        <text x="600" y="325" fill="#9E8B6E" opacity="0.14" fontSize="7" fontFamily="monospace">A+</text>
        <text x="265" y="510" fill="#9E8B6E" opacity="0.12" fontSize="8" fontFamily="monospace">●</text>
      </svg>
    </div>
  );
}
