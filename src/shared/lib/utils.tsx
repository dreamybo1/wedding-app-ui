import { useState } from "react";
import { useEffect } from "react";

// ── GUEST MAP ──────────────────────────────────────────────
export const GUEST_MAP = {
  oksana_alekseevna: { title: "мама", sex: "female" },
  vladimir_vladimirovich: { title: "папа", sex: "male" },
  mariya_nikolaevna: { title: "мама", sex: "female" },
  sergey_leonidovich: { title: "папа", sex: "male" },
  roman: { title: "Рома", sex: "male" },
  vasiliy: { title: "Вася", sex: "male" },
  ekaterina: { title: "Катя", sex: "female" },
  matvey: { title: "Матвей", sex: "male" },
  nikita: { title: "Никита", sex: "male" },
  viktoriya: { title: "Вика", sex: "female" },
  natalya_mikhaylovna: { title: "бабушка Наташа", sex: "female" },
  nikolay_nikolaevich: { title: "дедушка Коля", sex: "male" },
  tatyana_aleksandrovna: { title: "бабушка Таня", sex: "female" },
  dmitriy: { title: "Дима", sex: "male" },
  anastasiya: { title: "Настя", sex: "female" },
  default: { title: "Гость", sex: "male" },
  test: { title: "Test", sex: "male" },
  test_decline: { title: "Тест Отказался", sex: "male" },
  tanya_test: { title: "Таня", sex: "female" },
};

// ── CONFIG ─────────────────────────────────────────────────
export const WEDDING_DATE = new Date("2026-07-25T15:30:00+05:00");
export const COUPLE = { bride: "Татьяна", groom: "Александр" };
export const VENUE_NAME = "The Legends";
export const VENUE_ADDRESS = "г. Магнитогорск, ул. Ленина, д. 39";
export const TG_BOT_TOKEN = "YOUR_BOT_TOKEN"; // ← замени на токен своего бота
export const TG_CHAT_ID = "YOUR_CHAT_ID"; // ← замени на chat_id

const STORAGE_PREFIX = "wedding_rsvp_";

// ── FILM PHOTOS ────────────────────────────────────────────
export const FILM_FRAMES = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    caption: "Наша первая встреча",
  },
  {
    url: "https://images.unsplash.com/photo-1606216794079-73e3c6eab8c5?w=800&q=80",
    caption: "Первое путешествие вместе",
  },
  {
    url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    caption: "Счастливые моменты",
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    caption: "Помолвка",
  },
];

// ── HELPERS ─────────────────────────────────────────────────
export function getRouteGuests() {
  const slug =
    window.location.pathname.split("/").filter(Boolean).pop() || "default";
  return GUEST_MAP[slug] || GUEST_MAP["default"];
}

export function formatCountdown(target) {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, past: false };
}

export function pad(n) {
  return String(n).padStart(2, "0");
}

export const STORAGE_KEY =
  STORAGE_PREFIX +
  (window.location.pathname.split("/").filter(Boolean).pop() || "default");

export function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function saveTo(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// Замените на URL вашего развернутого бэка (например, https://mysite.com)
// Для локальных тестов используйте 'http://localhost:3000'
const BACKEND_URL = "https://sashatanyaforever.ru";

export async function sendToBackend(guestSlug, title, formData) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guestSlug, // например, "alex"
        title, // например, "Алексей Иванов"
        coming: formData.coming, // "yes" или "no"
        menu: formData.menu,
        drinks: formData.drinks,
        song: formData.song,
      }),
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error("Не удалось отправить данные на бэкенд:", error);
    return false;
  }
}
// ── INTERSECTION HOOK ───────────────────────────────────────
export function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return inView;
}

export async function fetchGuestData(guestSlug) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/rsvp/${guestSlug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Ошибка получения данных с бэка:", error);
    return null;
  }
}
