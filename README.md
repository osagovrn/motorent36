# Сайт Аренды — MotoRent36

Премиальная витрина посуточной аренды (этап 1: мотошлемы) для г. Воронеж.
Стек: Next.js (App Router) · Tailwind CSS · Prisma (SQLite) · Telegram Bot API.

## Быстрый старт

```bash
cd "C:\Users\2020y\Projects\Сайт Аренды"
npm install
npm run db:setup
npm run dev
```

Откройте http://localhost:3000

## Telegram-уведомления

В `.env` укажите:

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

Без них заявки всё равно принимаются (успех в UI), текст заявки пишется в лог сервера.

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Разработка |
| `npm run db:setup` | Создать БД + сид JIEKAI JK902 |
| `npm run build` | Сборка |
| `npm run start` | Прод-режим |

## Что реализовано по ТЗ

- Универсальная схема: categories / products / product_attributes
- Сид: JIEKAI JK902, размеры M и L в наличии (XS/S/XL/XXL недоступны в UI)
- Калькулятор суток с округлением вверх, min 1 сутки
- Разбивка: прокат / возвратный залог / итого = marketValue
- Форма лида + checkbox оферты + API → Telegram
- SEO Воронеж, Schema.org LocalBusiness + Product
- Страница `/offer`, PWA-ready manifest

Контакты и SEO: `src/config/seo.ts`
