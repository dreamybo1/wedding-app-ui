import { Fragment, useEffect, useRef, useState } from "react";
import { FILM_FRAMES, HOLES } from "./const";

function HoleStrip() {
  return (
    <div className="fs-holes">
      {HOLES.map((_, i) => (
        <div key={i} className="fs-hole" />
      ))}
    </div>
  );
}

export default function Filmstrip() {
  const frameRefs = useRef([]);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = e.target.dataset.idx;
            setTimeout(() => {
              setVisible((v) => ({ ...v, [idx]: true }));
            }, 80);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    frameRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="fs-section">
      <div className="fs-ticker">
        <span className="fs-ticker-inner">
          {"НАША ЛЮБОВНАЯ ИСТОРИЯ · КАЖДЫЙ КАДР — ЭТО МЫ · ВОСПОМИНАНИЯ НА ПЛЁНКЕ · СЧАСТЛИВЫЕ МОМЕНТЫ · FOREVER & ALWAYS · ".repeat(
            3
          )}
        </span>
      </div>

      <div className="fs-strip">
        {FILM_FRAMES.map((f, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <div className="fs-splice">
                <span className="fs-counter">{String(i).padStart(3, "0")}</span>
              </div>
            )}
            <div className="fs-row">
              <HoleStrip />
              <div
                ref={(el) => (frameRefs.current[i] = el)}
                data-idx={i}
                className={`fs-frame-wrap ${visible[i] ? "revealed" : ""}`}
              >
                <img src={f.url} alt={f.caption} className="fs-bg-img" />
                <img src={f.url} alt={f.caption} className="fs-img" />
                <div className="fs-grain" />
                <div className="fs-scan" />
                <div className="fs-vignette" />
                <div
                  className="fs-scratch"
                  style={{ left: `${20 + Math.random() * 60}%` }}
                />
                <div
                  className="fs-scratch"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    opacity: 0.025,
                  }}
                />
                <div className="fs-info">
                  <div className="fs-top-row">
                    <div className="fs-frame-code">
                      {f.code}
                      <br />
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(FILM_FRAMES.length).padStart(2, "0")}
                    </div>
                    <div className="fs-kodak">PORTRA 400</div>
                  </div>
                  <div className="fs-caption-wrap">
                    <div className="fs-caption">{f.caption}</div>
                    <div className="fs-caption-sub">{f.sub}</div>
                  </div>
                </div>
              </div>
              <HoleStrip />
            </div>
          </Fragment>
        ))}
        <div className="fs-footer">
          <p className="fs-footer-line">— конец плёнки —</p>
        </div>
      </div>
    </section>
  );
}
