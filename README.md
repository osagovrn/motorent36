# Сайт Аренды — MotoRent36

Витрина посуточной аренды мотошлемов (Воронеж).  
Стек: **Next.js** · Tailwind · Prisma (SQLite) · Telegram Bot API.

## Быстрый старт

```bash
cd "C:\Users\2020y\Projects\Сайт Аренды"
npm install
npm run db:setup
npm run dev
```

→ http://localhost:3000  
Карточка: `/catalog/jiekai-jk902-black-matt`  
Оферта: `/offer` · Политика: `/privacy`

## Что уже сделано

- Каталог + JIEKAI JK902 (размеры M / L)
- Калькулятор проката / залога (итог = рыночная цена)
- Форма заявки → API → Telegram (если заданы ключи)
- Оферта НПД без публикации ФИО на сайте
- Контакты: Евгений, телефон, Telegram, MAX
- Адаптив + Safari/iOS, sitemap/robots, заготовка Метрики
- Локальный плейсхолдер фото (замените на своё)

## Ваши шаги

См. `ПРОЧЕЕ/ВЫКЛАДКА.txt` и `ПРОЧЕЕ_СТАТУС.txt`.

Кратко:
1. `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` в `.env`
2. Своё фото шлема в `public/products/`
3. Хостинг (Vercel / VPS) + `NEXT_PUBLIC_SITE_URL`

## Env (пример)

Скопируйте `.env.example` → `.env`:

```
DATABASE_URL="file:./dev.db"
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Разработка |
| `npm run db:setup` | БД + сид |
| `npm run db:seed` | Только сид |
| `npm run build` | Сборка |
| `npm run start` | Прод |

Контакты и тексты: `src/config/seo.ts`
