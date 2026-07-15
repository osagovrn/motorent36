type BookingTelegramPayload = {
  clientName: string;
  phone: string;
  contactMethod: string;
  productTitle: string;
  size: string;
  startDate: string;
  endDate: string;
  days: number;
  totalRentalPrice: number;
  refundableDeposit: number;
  totalDueAtPickup: number;
};

export async function sendBookingTelegram(
  payload: BookingTelegramPayload,
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы — уведомление пропущено",
    );
    console.info("[telegram] заявка:", payload);
    return { ok: true, skipped: true };
  }

  const text = [
    "🔔 *НОВАЯ ЗАЯВКА НА АРЕНДУ!*",
    `👤 Клиент: ${escapeMd(payload.clientName)}`,
    `📞 Связь: ${escapeMd(payload.phone)} (Предпочитает: ${escapeMd(payload.contactMethod)})`,
    `🪖 Товар: ${escapeMd(payload.productTitle)}`,
    `📐 Выбранный размер: ${escapeMd(payload.size)}`,
    `📅 Период аренды: ${escapeMd(payload.startDate)} — ${escapeMd(payload.endDate)} (${payload.days} сут.)`,
    "",
    "💰 *ФИНАНСОВЫЙ РАСЧЁТ:*",
    `— Стоимость проката: ${payload.totalRentalPrice} руб.`,
    `— Возвратный залог: ${payload.refundableDeposit} руб.`,
    `— ИТОГО К ПОЛУЧЕНИЮ ПРИ ВСТРЕЧЕ: ${payload.totalDueAtPickup} руб.`,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { ok: false, error: body };
  }

  return { ok: true };
}

function escapeMd(value: string): string {
  return value.replace(/([_*`\[\]])/g, "\\$1");
}
