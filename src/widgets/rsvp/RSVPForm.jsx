import { useRef, useState, useEffect } from "react";
// Добавьте fetchGuestData в ваш импорт утилит:
import {
  getRouteGuests,
  loadSaved,
  saveTo,
  sendToBackend,
  useInView,
  fetchGuestData,
} from "../../shared/lib/utils";

export default function RSVPForm() {
  const guestSlug =
    window.location.pathname.split("/").filter(Boolean).pop() || "default";
  const { title } = getRouteGuests();

  const DEFAULTS = { coming: "yes", menu: "", drinks: "", song: "" };

  // Состояния формы инициализируем дефолтами, наполним их в useEffect
  const [form, setForm] = useState(DEFAULTS);
  const [prevSaved, setPrevSaved] = useState(null);
  const [editing, setEditing] = useState(true);

  const [initLoading, setInitLoading] = useState(true); // Лоадер первичной загрузки данных
  const [loading, setLoading] = useState(false); // Лоадер отправки формы
  const [toast, setToast] = useState({ msg: "", show: false });

  const ref = useRef(null);
  const visible = useInView(ref);

  // Логика первоначального получения данных
  useEffect(() => {
    async function initData() {
      try {
        // 1. Пробуем получить данные с бэкенда
        const backendData = await fetchGuestData(guestSlug);

        if (backendData) {
          setForm(backendData);
          setPrevSaved(backendData);
          setEditing(false);
          saveTo(backendData); // Синхронизируем локалсторедж с актуальным бэком
        } else {
          // 2. Если на бэке данных нет, проверяем localStorage
          const localSaved = loadSaved();
          if (localSaved) {
            setForm(localSaved);
            setPrevSaved(localSaved);
            setEditing(false);
          } else {
            // 3. Если везде пусто — оставляем дефолтные значения
            setForm(DEFAULTS);
            setEditing(true);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setInitLoading(false); // Выключаем лоадер загрузки
      }
    }
    initData();
  }, [guestSlug]);

  function showToast(msg) {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2800);
  }

  const hasChanged = JSON.stringify(form) !== JSON.stringify(prevSaved);
  const canSubmit = editing && hasChanged;

  async function handleSubmit() {
    setLoading(true);
    try {
      const ok = await sendToBackend(guestSlug, title, form);
      if (ok) {
        saveTo(form);
        setPrevSaved(form);
        setEditing(false);
        showToast("Ответ отправлен — до встречи! 🌸");
      } else {
        showToast("Ошибка отправки, попробуйте ещё раз");
      }
    } catch {
      showToast("Не удалось отправить. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  }

  // Если данные ещё подтягиваются с сервера — показываем лоадер
  if (initLoading) {
    return (
      <section className="rsvp-section" ref={ref}>
        <div className="rsvp-loader-container">
          <div className="spinner"></div>
          <p>Загружаем информацию...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp-section" ref={ref}>
      <div className={`fade-in ${visible ? "visible" : ""}`}>
        <h2 className="rsvp-title">Ваш ответ</h2>
        <p className="rsvp-sub">Пожалуйста, ответьте до 1 июля 2026</p>

        {!editing && prevSaved && (
          <div className="rsvp-status">
            <div className="dot" />
            <span>Вы уже ответили — спасибо!</span>
          </div>
        )}

        {/* 1. Coming */}
        <div className="form-group">
          <label className="form-label">Сможете ли вы прийти?</label>
          <div className="radio-group">
            {[
              { value: "yes", label: "✓ Конечно!" },
              { value: "no", label: "✗ Не смогу" },
            ].map((opt) => (
              <div key={opt.value} className="radio-option">
                <input
                  type="radio"
                  id={`coming-${opt.value}`}
                  name="coming"
                  value={opt.value}
                  checked={form.coming === opt.value}
                  disabled={!editing}
                  onChange={() => setForm((f) => ({ ...f, coming: opt.value }))}
                />
                <label htmlFor={`coming-${opt.value}`} className="radio-label">
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Menu */}
        <div className="form-group">
          <label className="form-label">Предпочтения по меню</label>
          <textarea
            className="form-input"
            rows={3}
            placeholder="Аллергии, вегетарианство, безглютеновое питание…"
            value={form.menu}
            disabled={!editing}
            onChange={(e) => setForm((f) => ({ ...f, menu: e.target.value }))}
          />
        </div>

        {/* 3. Drinks */}
        <div className="form-group">
          <label className="form-label">Предпочтения по напиткам</label>
          <textarea
            className="form-input"
            rows={2}
            placeholder="Вино красное/белое, крепкий алкоголь, безалкогольное…"
            value={form.drinks}
            disabled={!editing}
            onChange={(e) => setForm((f) => ({ ...f, drinks: e.target.value }))}
          />
        </div>

        {/* 4. Song */}
        <div className="form-group">
          <label className="form-label">Музыкальное пожелание 🎵</label>
          <textarea
            className="form-input"
            rows={2}
            placeholder="Под какую песню вы точно выйдете на танцпол?"
            value={form.song}
            disabled={!editing}
            onChange={(e) => setForm((f) => ({ ...f, song: e.target.value }))}
          />
        </div>

        <button
          className={`btn-submit ${!loading ? "gold" : ""}`}
          disabled={!canSubmit || loading}
          onClick={handleSubmit}
        >
          {loading ? "Отправляем…" : "Отправить ответ"}
        </button>

        {prevSaved && !editing && (
          <button className="btn-edit" onClick={() => setEditing(true)}>
            Изменить ответ
          </button>
        )}
      </div>

      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>
    </section>
  );
}
