import { useState } from "react";

const dresscodeStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap");
 
  .dc-section {
    padding: 80px 24px 70px;
    text-align: center;
    background: #1a0d0d;
    position: relative;
    overflow: hidden;
    font-family: "Jost", sans-serif;
  }
 
  .dc-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, transparent, #c4782a);
  }
 
  .dc-bg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
  }
  .dc-bg-orb-1 {
    width: 300px; height: 300px;
    background: #7a1018;
    opacity: 0.08;
    top: -80px; left: -80px;
  }
  .dc-bg-orb-2 {
    width: 200px; height: 200px;
    background: #c4782a;
    opacity: 0.07;
    bottom: -60px; right: -40px;
  }
 
  .dc-eyebrow {
    font-size: 10px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #c4782a;
    font-weight: 300;
    margin-bottom: 14px;
    position: relative;
  }
 
  .dc-title {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(36px, 10vw, 58px);
    font-weight: 300;
    font-style: italic;
    color: #fdf6f0;
    line-height: 1;
    margin-bottom: 40px;
    position: relative;
  }
 
  .dc-cards-row {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 40px;
    position: relative;
  }
 
  .dc-card {
    width: 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
 
  .dc-icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid rgba(196, 120, 42, 0.25);
    background: rgba(255,255,255,0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
 
  .dc-card.active .dc-icon-wrap {
    border-color: #c4782a;
    background: rgba(196, 120, 42, 0.12);
  }
 
  .dc-card:not(.active):hover .dc-icon-wrap {
    border-color: rgba(196, 120, 42, 0.5);
    background: rgba(196, 120, 42, 0.06);
  }
 
  .dc-icon-wrap svg {
    width: 28px;
    height: 28px;
    opacity: 0.55;
    transition: opacity 0.3s;
  }
 
  .dc-card.active .dc-icon-wrap svg {
    opacity: 1;
  }
 
  .dc-card-label {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(196, 120, 42, 0.45);
    transition: color 0.3s;
  }
 
  .dc-card.active .dc-card-label {
    color: #c4782a;
  }
 
  .dc-detail-box {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(196, 120, 42, 0.18);
    border-radius: 20px;
    padding: 24px 22px 20px;
    max-width: 320px;
    margin: 0 auto 36px;
    position: relative;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
 
  .dc-detail-box.hidden {
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
  }
 
  .dc-detail-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(196, 120, 42, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
  }
  .dc-detail-icon svg {
    width: 18px;
    height: 18px;
  }
 
  .dc-detail-title {
    font-family: "Cormorant Garamond", serif;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    color: #f7e8d4;
    margin-bottom: 8px;
  }
 
  .dc-detail-text {
    font-size: 13px;
    font-weight: 300;
    color: rgba(247, 232, 212, 0.55);
    line-height: 1.75;
  }
 
  .dc-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0 auto 36px;
    max-width: 280px;
  }
  .dc-div-line {
    flex: 1;
    height: 1px;
  }
  .dc-div-line-l { background: linear-gradient(90deg, transparent, rgba(196,120,42,0.4)); }
  .dc-div-line-r { background: linear-gradient(90deg, rgba(196,120,42,0.4), transparent); }
  .dc-div-diamond {
    width: 5px; height: 5px;
    background: #c4782a;
    transform: rotate(45deg);
    flex-shrink: 0;
  }
 
  .dc-main-text {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(17px, 4.5vw, 20px);
    line-height: 1.8;
    color: rgba(247, 232, 212, 0.65);
    max-width: 340px;
    margin: 0 auto;
    position: relative;
  }
 
  .dc-main-text em {
    color: #f7e8d4;
    font-style: italic;
  }
`;

const DRESS_ITEMS = [
  {
    id: "free",
    label: "Свобода",
    title: "Никакого дресс-кода",
    text: "Строгих правил нет. Главное — ваш комфорт и хорошее настроение.",
    icon: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="#c4782a"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 4 C14 4 10 8 10 13 C10 16.3 11.8 18 14 18 C16.2 18 18 16.3 18 13 C18 8 14 4 14 4Z" />
        <path d="M10 18 L8 26 M18 18 L20 26" />
        <path d="M10 21 L18 21" />
      </svg>
    ),
  },
  {
    id: "venue",
    label: "Ресторан",
    title: "Вечерний ресторан",
    text: "Мероприятие в ресторане — ориентируйтесь на аккуратную одежду для особого вечера.",
    icon: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="#c4782a"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="20" height="16" rx="2" />
        <path d="M4 11 L24 11" />
        <circle cx="10" cy="8.5" r="1" fill="#c4782a" stroke="none" />
        <circle cx="14" cy="8.5" r="1" fill="#c4782a" stroke="none" />
        <circle cx="18" cy="8.5" r="1" fill="#c4782a" stroke="none" />
        <path d="M8 16 L12 16 M16 16 L20 16" />
      </svg>
    ),
  },
  {
    id: "smile",
    label: "Улыбки",
    title: "Главное — улыбки",
    text: "Ваше присутствие и радость важнее любого наряда. Приходите такими, какие вы есть.",
    icon: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="#c4782a"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="14" cy="14" r="9" />
        <path d="M10 15.5 C10 15.5 11.5 18 14 18 C16.5 18 18 15.5 18 15.5" />
        <circle cx="11" cy="12" r="1" fill="#c4782a" stroke="none" />
        <circle cx="17" cy="12" r="1" fill="#c4782a" stroke="none" />
      </svg>
    ),
  },
];

export default function DressCodeSection() {
  const [active, setActive] = useState("free");
  const current = DRESS_ITEMS.find((d) => d.id === active);

  return (
    <>
      <style>{dresscodeStyles}</style>
      <section className="dc-section">
        <div className="dc-bg-orb dc-bg-orb-1" />
        <div className="dc-bg-orb dc-bg-orb-2" />

        <p className="dc-eyebrow">Dress Code</p>
        <h2 className="dc-title">Как одеться?</h2>

        <div className="dc-cards-row">
          {DRESS_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`dc-card${active === item.id ? " active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              <div className="dc-icon-wrap">{item.icon}</div>
              <span className="dc-card-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className={`dc-detail-box${!current ? " hidden" : ""}`}>
          <div className="dc-detail-icon">{current?.icon}</div>
          <div className="dc-detail-title">{current?.title}</div>
          <div className="dc-detail-text">{current?.text}</div>
        </div>

        <div className="dc-divider">
          <span className="dc-div-line dc-div-line-l" />
          <span className="dc-div-diamond" />
          <span className="dc-div-line dc-div-line-r" />
        </div>

        <p className="dc-main-text">
          Никаких строгих правил. Главное, что мы ждём — это{" "}
          <em>ваши улыбки и отличное настроение.</em> Мероприятие будет в
          ресторане, поэтому ориентируйтесь на комфорт и аккуратную одежду, в
          которой вам будет приятно провести вечер.
        </p>
      </section>
    </>
  );
}
