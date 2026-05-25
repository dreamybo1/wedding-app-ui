import { useRef } from "react";
import { useInView, VENUE_ADDRESS, VENUE_NAME } from "../../shared/lib/utils";

export default function Venue() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const enc = encodeURIComponent(VENUE_ADDRESS);
  /* Google Maps embed via place search — no API key needed for basic embed */
  const mapSrc = `https://maps.google.com/maps?q=${enc}&z=17&output=embed&hl=ru`;
  const encodedAddr = encodeURIComponent(VENUE_ADDRESS);
  const maps = [
    {
      name: "2ГИС",
      href: `https://2gis.ru/search/${encodedAddr}`,
      icon: "assets/2gis.svg",
    },
    {
      name: "Яндекс",
      href: `https://yandex.ru/maps/?text=${encodedAddr}`,
      icon: "assets/yandex.svg",
    },
    {
      name: "Google",
      href: `https://maps.google.com/?q=${encodedAddr}`,
      icon: "assets/google.ico",
    },
  ];

  return (
    <section className="venue-section" ref={ref}>
      <div className={`fade-in ${visible ? "visible" : ""}`}>
        <p className="venue-eyebrow">место торжества</p>
        <h2 className="venue-name">{VENUE_NAME}</h2>
        <p className="venue-address">{VENUE_ADDRESS}</p>
        <div className="map-container">
          <iframe
            src={mapSrc}
            allowFullScreen
            loading="lazy"
            title="Venue map"
          />
        </div>
        <div className="map-apps">
          {maps.map((m) => (
            <a
              key={m.name}
              className="map-app-btn"
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={m.icon}
                alt={m.name}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span>{m.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
