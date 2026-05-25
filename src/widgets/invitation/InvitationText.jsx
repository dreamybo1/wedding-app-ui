import { useRef } from "react";
import { COUPLE, getRouteGuests, useInView } from "../../shared/lib/utils";

export default function InvitationText() {
  const { title, sex } = getRouteGuests();
  const isMale = sex === "male";
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <section className="invitation-section" ref={ref}>
      <div className={`fade-in ${visible ? "visible" : ""}`}>
        <div className="ornament">✦ · · ✦</div>
        <p className="invite-dear">Дорог{isMale ? "ой" : "ая"}</p>
        <h2 className="invite-guests">{title}</h2>
        <p className="invite-body">
          Мы рады сообщить, что вскоре наступит
          <br />
          самый важный день для нас – день становления
          <br />
          нашей семьи! В честь этого приглашаем тебя
          <br />
          на нашу свадьбу, чтобы стать частью
          <br />
          начала нашей семейной истории!
          <br />
        </p>
        <div className="gold-line" />
        <div className="couple-names-big">
          {COUPLE.bride}
          <span>&</span>
          {COUPLE.groom}
        </div>
      </div>
    </section>
  );
}
