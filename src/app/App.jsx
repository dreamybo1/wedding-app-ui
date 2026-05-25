import Hero from "../widgets/hero/Hero";
import Filmstrip from "../widgets/filmstrip/Filmstrip";
import InvitationText from "../widgets/invitation/InvitationText";
import Countdown from "../widgets/countdown/Countdown";
import Venue from "../widgets/venue/Venue";
import RSVPForm from "../widgets/rsvp/RSVPForm";
import "../shared/styles/global.css";

import { useEffect, useRef, useState } from "react";
import { WeddingLoader } from "../shared/ui/WeddingLoader/WeddingLoader";
import { useLoadAssets } from "../shared/hooks/useLoadAssets";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { TransitionLines } from "../shared/ui/TransitionLines/TransitionLines";
import DressCodeSection from "../widgets/dresscode/Dresscode";
import GiftsSection from "../widgets/gifts/Gifts";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const { progress } = useLoadAssets();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handler, { passive: true });
    // Запрет событий масштабирования 'gesturestart'
    document.addEventListener("gesturestart", function (event) {
      event.preventDefault();
    });
    // Блокировка масштабирования двумя пальцами
    document.addEventListener(
      "touchstart",
      function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    // Дублирующий контроль при движении
    document.addEventListener(
      "touchmove",
      function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <WeddingLoader onComplete={() => setLoading(false)} progress={progress}>
        <div className={`app-content ${!loading ? "loaded" : ""}`}>
          <Hero scrollY={scrollY} />

          <div className="transition-block">
            <TransitionLines />
            <DotLottieReact
              className="transition-block-conffeti"
              src="/assets/Confetti.lottie"
              loop
              autoplay
            />
          </div>

          <div id="content">
            <Filmstrip />
            <InvitationText />
            <Countdown />
            <Venue />
            <DressCodeSection />
            <GiftsSection />
            <RSVPForm />

            <footer className="site-footer">
              <span className="heart">♥</span>
              Татьяна & Александр · 25.07.2026
            </footer>
          </div>
        </div>
      </WeddingLoader>
    </>
  );
}

export default App;
