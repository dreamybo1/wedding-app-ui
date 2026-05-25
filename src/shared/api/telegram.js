const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID

export async function sendRSVPToTelegram({
  guestSlug,
  guests,
  form
}) {
  const text =
`🌸 Ответ на приглашение

👤 Гость(и): ${guests.join(', ')} (${guestSlug})
✅ Придут: ${form.coming === 'yes' ? 'Да' : 'Нет'}
🍽 Меню: ${form.menu || '—'}
🍷 Напитки: ${form.drinks || '—'}
🎵 Песня: ${form.song || '—'}`

  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram env not configured')
    return { ok: false, error: 'NO_CONFIG' }
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text
        })
      }
    )

    const data = await res.json()
    return { ok: data.ok, data }

  } catch (error) {
    return { ok: false, error }
  }
}
