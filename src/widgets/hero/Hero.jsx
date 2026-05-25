import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { COUPLE } from "../../shared/lib/utils";

export default function Hero() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const textRef = useRef(null);
  const hintRef = useRef(null);

  const maxScrollRef = useRef(0);
  const ticking = useRef(false);

  // -------------------------
  // Scroll animation (FIXED)
  // -------------------------
  useEffect(() => {
    maxScrollRef.current = window.innerHeight * 0.85;

    const update = () => {
      const scrollY = window.scrollY;

      // 🔒 жёсткий clamp 0..1
      const raw = scrollY / maxScrollRef.current;
      const progress = Math.min(Math.max(raw, 0), 1);

      // 🔒 перевод в safe range 0..100
      const translate = Math.min(Math.max(progress * 100, 0), 100);

      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(-${translate}%, 0, 0)`;
        leftRef.current.style.opacity = Math.max(1 - progress * 1, 0);
      }

      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${translate}%, 0, 0)`;
        rightRef.current.style.opacity = Math.max(1 - progress * 1, 0);
      }

      if (textRef.current) {
        textRef.current.style.opacity = Math.max(1 - progress * 1.4, 0);
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = Math.max(1 - progress * 3, 0);
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // -------------------------
  // Wedding glow text animation
  // -------------------------
  useLayoutEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current.querySelector(".names"), {
      types: "chars",
    });

    split.chars.forEach((char, i) => {
      gsap.to(char, {
        textShadow:
          "0 0 6px rgba(255,255,255,0.95), 0 0 16px rgba(255,182,193,0.6), 0 0 28px rgba(255,192,203,0.35)",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.08,
      });
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <>
      <div id="hero">
        <div
          ref={leftRef}
          className="hero-panel left"
          style={{
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
        >
          <img src="src/assets/hero.webp" alt="Wedding" />
          <div className="hero-overlay" />
        </div>
        <div
          ref={rightRef}
          className="hero-panel right"
          style={{
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
        >
          <img
            src="src/assets/hero.webp"
            alt="Wedding"
            style={{ right: 0, left: "auto" }}
          />
          <div className="hero-overlay" />
        </div>
      </div>

      <div ref={textRef} className="hero-text">
        <p className="eyebrow">Приглашение на свадьбу</p>

        <h1 className="names">
          {COUPLE.bride}
          <br />
          &amp;
          <br />
          {COUPLE.groom}
        </h1>

        <p className="date-line">25 · 07 · 2026</p>
      </div>

      <div ref={hintRef} className="scroll-hint">
        <div className="arrow" />
        <span>скролл</span>
      </div>
    </>
  );
}
