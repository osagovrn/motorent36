# Сайт Аренды — MotoRent36

Витрина посуточной аренды мотошлемов (Воронеж).  
Стек: **Next.js** · Tailwind · Prisma (**SQLite**) · Telegram Bot API.

> Для продакшена лучше **VPS / Docker** (SQLite). Vercel serverless + SQLite — плохая идея.

## Быстрый старт (локально)

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

→ http://localhost:3000  
Карточка: `/catalog/jiekai-jk902-black-matt` · FAQ: `/faq` · health: `/api/health`

## Перед рекламой (обязательно вам)

1. **Telegram-бот** → `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` в `.env`
2. **Домен HTTPS** → `NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru`
3. **Яндекс.Метрика** → `NEXT_PUBLIC_YANDEX_METRIKA_ID` + цель `booking_ok`
4. **Вебмастер** → `NEXT_PUBLIC_YANDEX_VERIFICATION`
5. Проверка: `npm run preflight` (на проде с `NODE_ENV=production`)

Подробно: `ПРОЧЕЕ/ВЫКЛАДКА.txt`

## Деплой: Docker (рекомендуется)

```bash
# заполните .env (Telegram + NEXT_PUBLIC_SITE_URL=https://...)
docker compose up -d --build
```

SQLite лежит в volume `motorent_data`. Пример Nginx: `ПРОЧЕЕ/nginx.example.conf`.

Без Docker на VPS:

```bash
npm ci
npm run build
NODE_ENV=production npm run preflight
npm run start:prod
```

## Env

См. `.env.example`. Критично:

| Переменная | Зачем |
|------------|--------|
| `TELEGRAM_*` | Заявки на проде |
| `NEXT_PUBLIC_SITE_URL` | sitemap, OG, canonical |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Директ / цель `booking_ok` |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Вебмастер |

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Разработка |
| `npm run preflight` | Готовность к продакшену |
| `npm run db:setup` | БД + сид |
| `npm run build` | Сборка |
| `npm run start:prod` | db push + start |

Контакты и тексты: `src/config/seo.ts`
