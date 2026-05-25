import { useState } from "react";

const giftsStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap");

  .gf-section {
    padding: 80px 24px 80px;
    text-align: center;
    background: #fdf6f0;
    position: relative;
    overflow: hidden;
    font-family: "Jost", sans-serif;
  }

  .gf-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, transparent, #c4782a);
  }

  .gf-eyebrow {
    font-size: 10px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #c4782a;
    font-weight: 300;
    margin-bottom: 14px;
    position: relative;
  }

  .gf-title {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(36px, 10vw, 58px);
    font-weight: 300;
    font-style: italic;
    color: #1a0d0d;
    line-height: 1;
    margin-bottom: 40px;
    position: relative;
  }

  .gf-envelope-wrap {
    position: relative;
    width: 140px;
    height: 100px;
    margin: 0 auto 36px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .gf-envelope {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    border: 1.5px solid rgba(196, 120, 42, 0.35);
    position: absolute;
    inset: 0;
    box-shadow: 0 4px 20px rgba(196,120,42,0.1);
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .gf-envelope-wrap:hover .gf-envelope,
  .gf-envelope-wrap.open .gf-envelope {
    transform: scale(1.06);
  }

  .gf-envelope-flap {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 54px;
    overflow: hidden;
    transform-origin: top center;
    transition: transform 0.5s ease;
    z-index: 2;
  }

  .gf-envelope-wrap.open .gf-envelope-flap {
    transform: rotateX(160deg);
  }

  .gf-envelope-flap svg {
    width: 100%;
    display: block;
  }

  .gf-envelope-lines {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 100%;
  }
  .gf-envelope-lines svg {
    width: 100%; height: 100%;
  }

  .gf-letter {
    position: absolute;
    width: 80%;
    left: 10%;
    background: #fffaf5;
    border: 1px solid rgba(196,120,42,0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s;
    bottom: 8px;
    height: 70%;
    opacity: 0;
    transform: translateY(0px);
    z-index: 1;
  }

  .gf-envelope-wrap.open .gf-letter {
    opacity: 1;
    transform: translateY(-40px);
  }

  .gf-letter svg {
    width: 22px; height: 22px;
    opacity: 0.4;
  }

  .gf-tap-hint {
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(196,120,42,0.45);
    margin-bottom: 36px;
    transition: opacity 0.3s;
  }

  .gf-envelope-wrap.open + .gf-tap-hint {
    opacity: 0;
  }

  .gf-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0 auto 32px;
    max-width: 280px;
  }
  .gf-div-line { flex: 1; height: 1px; }
  .gf-div-line-l { background: linear-gradient(90deg, transparent, rgba(196,120,42,0.4)); }
  .gf-div-line-r { background: linear-gradient(90deg, rgba(196,120,42,0.4), transparent); }
  .gf-div-diamond {
    width: 5px; height: 5px;
    background: #c4782a;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .gf-text-block {
    max-width: 340px;
    margin: 0 auto 40px;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .gf-text-block.revealed {
    opacity: 1;
    transform: none;
  }

  .gf-text-block.hidden {
    opacity: 0;
    transform: translateY(12px);
    pointer-events: none;
  }

  .gf-text {
    font-family: "Cormorant Garamond", serif;
    font-size: clamp(17px, 4.5vw, 20px);
    line-height: 1.85;
    color: #7a4040;
  }

  .gf-text em {
    color: #1a0d0d;
    font-style: italic;
  }

  .gf-note {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f7e8d4;
    border: 1px solid rgba(196,120,42,0.3);
    border-radius: 100px;
    padding: 10px 18px;
    font-size: 12px;
    color: #3d2020;
    font-weight: 400;
    letter-spacing: 0.05em;
  }

  .gf-note-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #c4782a;
    flex-shrink: 0;
    animation: gf-pulse 2s ease-in-out infinite;
  }

  @keyframes gf-pulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.3); opacity: 1; }
  }
`;

export default function GiftsSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{giftsStyles}</style>
      <section className="gf-section">
        <p className="gf-eyebrow">Подарки</p>
        <h2 className="gf-title">Вместо букетов</h2>

        <div
          className={`gf-envelope-wrap${open ? " open" : ""}`}
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Открыть конверт"
        >
          <div className="gf-envelope">
            <div className="gf-envelope-flap">
              <svg
                viewBox="0 0 140 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="0,0 140,0 70,52"
                  fill="#fff"
                  stroke="rgba(196,120,42,0.3)"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="gf-envelope-lines">
              <svg
                viewBox="0 0 140 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="54"
                  x2="70"
                  y2="86"
                  stroke="rgba(196,120,42,0.2)"
                  strokeWidth="1"
                />
                <line
                  x1="140"
                  y1="54"
                  x2="70"
                  y2="86"
                  stroke="rgba(196,120,42,0.2)"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="gf-letter">
              <svg
                viewBox="0 0 22 22"
                fill="none"
                stroke="#c4782a"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <rect x="3" y="5" width="16" height="12" rx="1" />
                <path d="M3 8 L11 13 L19 8" />
              </svg>
            </div>
          </div>
        </div>

        <p className="gf-tap-hint">
          {open ? "\u00A0" : "нажмите, чтобы открыть"}
        </p>

        <div className={`gf-text-block${open ? " revealed" : " hidden"}`}>
          <div className="gf-divider">
            <span className="gf-div-line gf-div-line-l" />
            <span className="gf-div-diamond" />
            <span className="gf-div-line gf-div-line-r" />
          </div>

          <p className="gf-text">
            Уважаемые гости! В связи с предстоящим переездом в другой город, мы
            не сможем забрать с собой букеты и подарки в коробках. Нам было бы
            очень жаль расставаться с вашими сюрпризами. Поэтому разрешите
            попросить об одном:{" "}
            <em>
              ваша любовь и забота в виде небольшого конверта станут для нас
              отличными подъёмными на новом месте.
            </em>{" "}
            Заранее спасибо за понимание!
          </p>
        </div>
      </section>
    </>
  );
}
