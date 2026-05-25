import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

/* ── Particles ─────────────────────────────────────────── */
function Particles() {
  const items = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: (5 + Math.random() * 90).toFixed(1),
      d: (4 + Math.random() * 5).toFixed(2),
      delay: (Math.random() * 7).toFixed(2),
      size: Math.random() > 0.6 ? 3 : 2,
    }))
  ).current;

  return (
    <div className="wl-particles">
      {items.map((p) => (
        <span
          key={p.id}
          className="wl-particle"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Heart SVG ──────────────────────────────────────────── */
function HeartIcon() {
  return (
    <svg className="wl-heart" viewBox="0 0 40 40" fill="none">
      <path
        d="M20 34C20 34 4 24 4 13C4 8.03 8.03 4 13 4C16.12 4 18.88 5.68 20 8.14C21.12 5.68 23.88 4 27 4C31.97 4 36 8.03 36 13C36 24 20 34 20 34Z"
        fill="#7a1018"
      />
      <path
        d="M20 32C20 32 6 22.5 6 13C6 9.13 9.13 6 13 6C15.8 6 18.28 7.56 19.4 9.92L20 11.1L20.6 9.92C21.72 7.56 24.2 6 27 6C30.87 6 34 9.13 34 13C34 22.5 20 32 20 32Z"
        fill="#b02030"
      />
      <path
        d="M13 8.5C11.07 8.5 9.5 10.07 9.5 12C9.5 12.55 9.95 13 10.5 13C11.05 13 11.5 12.55 11.5 12C11.5 11.17 12.17 10.5 13 10.5C13.55 10.5 14 10.05 14 9.5C14 8.95 13.55 8.5 13 8.5Z"
        fill="rgba(255,255,255,0.18)"
      />
    </svg>
  );
}

/* ── Loader UI (rendered into document.body via portal) ── */
function LoaderUI({ progress, fadeOut }) {
  const pct = Math.min(100, Math.round(progress));

  return createPortal(
    <div className={`wl-overlay${fadeOut ? " wl-exit" : ""}`}>
      <div className="wl-orb wl-orb-1" />
      <div className="wl-orb wl-orb-2" />
      <div className="wl-orb wl-orb-3" />

      <Particles />

      <span className="wl-corner wl-tl" />
      <span className="wl-corner wl-tr" />
      <span className="wl-corner wl-bl" />
      <span className="wl-corner wl-br" />

      <div className={`wl-content${fadeOut ? " wl-content-exit" : ""}`}>
        <div className="wl-monogram">
          <div className="wl-ring wl-ring-outer" />
          <div className="wl-ring wl-ring-inner" />
          <HeartIcon />
        </div>

        <div className="wl-title-block">
          <p className="wl-title">Загружается что&#8209;то волшебное</p>
          <p className="wl-sub">подождите немного</p>
        </div>

        <div className="wl-flourish" aria-hidden="true">
          <span className="wl-fl-line wl-fl-left" />
          <span className="wl-diamond" />
          <span className="wl-fl-line wl-fl-right" />
        </div>

        <div className="wl-progress-wrap">
          <div className="wl-track">
            <div className="wl-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="wl-pct-row">
            <span className="wl-pct-num">{pct}</span>
            <span className="wl-pct-sym">%</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Main export ────────────────────────────────────────── */
export function WeddingLoader({ progress = 0, children }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setFadeOut(true), 400);
      const t2 = setTimeout(() => setVisible(false), 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress]);

  return (
    <>
      <div
        style={{
          pointerEvents: visible ? "none" : "auto",
        }}
      >
        {children}
      </div>

      {visible && <LoaderUI progress={progress} fadeOut={fadeOut} />}
    </>
  );
}
