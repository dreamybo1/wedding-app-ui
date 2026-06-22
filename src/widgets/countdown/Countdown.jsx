import { useEffect, useRef, useState } from "react";
import { pad, useInView, WEDDING_DATE } from "../../shared/lib/utils";

function formatCountdown(target) {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return { past: true };

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    past: false,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(() => formatCountdown(WEDDING_DATE));
  useEffect(() => {
    const id = setInterval(() => setTime(formatCountdown(WEDDING_DATE)), 1000);
    return () => clearInterval(id);
  }, []);
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <section className="countdown-section" ref={ref}>
      <div className={`fade-in ${visible ? "visible" : ""}`}>
        <p className="countdown-label">До нашего торжества</p>
        <div className="countdown-calendar">
          <div className="calendar-month">Июль 2026</div>
          <div className="calendar-day">25</div>
          <div className="calendar-dow">суббота 15:30</div>
        </div>
        {time.past ? (
          <p
            style={{
              color: "var(--gold)",
              fontFamily: "Cormorant Garamond",
              fontSize: 22,
              fontStyle: "italic",
            }}
          >
            Этот день уже наступил 🌸
          </p>
        ) : (
          <div className="countdown-units">
            <div className="countdown-unit">
              <span className="unit-num">{pad(time.days)}</span>
              <span className="unit-label">дней</span>
            </div>
            <div className="sep">:</div>
            <div className="countdown-unit">
              <span className="unit-num">{pad(time.hours)}</span>
              <span className="unit-label">часов</span>
            </div>
            <div className="sep">:</div>
            <div className="countdown-unit">
              <span className="unit-num">{pad(time.minutes)}</span>
              <span className="unit-label">минут</span>
            </div>
            <div className="sep">:</div>
            <div className="countdown-unit">
              <span className="unit-num">{pad(time.seconds)}</span>
              <span className="unit-label">секунд</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
