# MotoRent36 — аренда мотошлемов (Воронеж)

Статический сайт (GitHub Pages): каталог, калькулятор, бронь по телефону / Telegram / MAX.

**Сайт:** https://beri36.ru/

## Запуск

```bash
npm install
npm run dev
```

→ http://localhost:3000

```bash
npm run build
```

Папка `out/` — статика для GitHub Pages.

## Выкладка

Push в `main` → Actions `Deploy GitHub Pages`.  
Variables: `NEXT_PUBLIC_SITE_URL=https://beri36.ru`, `NEXT_PUBLIC_BASE_PATH=` (пусто). Custom domain: `beri36.ru`.

## Структура репозитория

- `src/` — страницы и компоненты
- `public/` — фото и иконки
- `.github/workflows/` — CI и деплой
- `.env.example` — только публичные переменные (без секретов)

Локально (не в git): папка `ПРОЧЕЕ/` — бэкапы, Docker/VPS-заготовки, секреты, заметки.
