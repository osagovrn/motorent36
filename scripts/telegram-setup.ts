/**
 * Помощник: по токену бота находит chat_id и пишет в .env
 *
 * 1) Создай бота у @BotFather → получи TOKEN
 * 2) Напиши боту любое сообщение (например: привет)
 * 3) npm run telegram:setup -- "ТОКЕН_СЮДА"
 */

import fs from "node:fs";
import path from "node:path";

const token = process.argv[2]?.trim() || process.env.TELEGRAM_BOT_TOKEN?.trim();

if (!token) {
  console.error(
    'Укажите токен: npm run telegram:setup -- "123456:AA..."\n' +
      "Сначала напишите боту любое сообщение в Telegram.",
  );
  process.exit(1);
}

type Update = {
  message?: { chat?: { id?: number; type?: string; first_name?: string } };
};

async function main() {
  const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
  const me = (await meRes.json()) as {
    ok: boolean;
    result?: { username?: string; first_name?: string };
    description?: string;
  };
  if (!me.ok) {
    console.error("Токен неверный:", me.description ?? meRes.status);
    process.exit(1);
  }
  console.log(`Бот: @${me.result?.username} (${me.result?.first_name})`);

  const updRes = await fetch(
    `https://api.telegram.org/bot${token}/getUpdates?limit=20`,
  );
  const upd = (await updRes.json()) as {
    ok: boolean;
    result?: Update[];
    description?: string;
  };
  if (!upd.ok) {
    console.error("getUpdates ошибка:", upd.description);
    process.exit(1);
  }

  const chats = new Map<string, number>();
  for (const u of upd.result ?? []) {
    const chat = u.message?.chat;
    if (chat?.id != null) {
      const label = `${chat.type ?? "chat"} ${chat.first_name ?? ""}`.trim();
      chats.set(`${chat.id}|${label}`, chat.id);
    }
  }

  if (chats.size === 0) {
    console.error(
      "Нет сообщений боту. Откройте бота в Telegram, нажмите Start / напишите «привет», затем снова:\n" +
        `  npm run telegram:setup -- "${token!.slice(0, 10)}..."`,
    );
    process.exit(1);
  }

  const [[firstLabel, chatId]] = [...chats.entries()];
  console.log("Найден chat_id:", chatId, `(${firstLabel.split("|")[1]})`);
  if (chats.size > 1) {
    console.log("Другие чаты:");
    for (const [label, id] of chats) {
      console.log(`  ${id} — ${label.split("|")[1]}`);
    }
  }

  const envPath = path.join(process.cwd(), ".env");
  let text = fs.existsSync(envPath)
    ? fs.readFileSync(envPath, "utf8")
    : fs.readFileSync(path.join(process.cwd(), ".env.example"), "utf8");

  if (/^TELEGRAM_BOT_TOKEN=/m.test(text)) {
    text = text.replace(/^TELEGRAM_BOT_TOKEN=.*$/m, `TELEGRAM_BOT_TOKEN=${token}`);
  } else {
    text += `\nTELEGRAM_BOT_TOKEN=${token}\n`;
  }
  if (/^TELEGRAM_CHAT_ID=/m.test(text)) {
    text = text.replace(/^TELEGRAM_CHAT_ID=.*$/m, `TELEGRAM_CHAT_ID=${chatId}`);
  } else {
    text += `TELEGRAM_CHAT_ID=${chatId}\n`;
  }

  fs.writeFileSync(envPath, text, "utf8");
  console.log("Записано в .env");

  const testRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "✅ MotoRent36: Telegram подключён. Заявки с сайта будут приходить сюда.",
    }),
  });
  const test = (await testRes.json()) as { ok: boolean; description?: string };
  if (!test.ok) {
    console.error("Тестовое сообщение не ушло:", test.description);
    process.exit(1);
  }
  console.log("Тестовое сообщение отправлено — проверьте Telegram.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
