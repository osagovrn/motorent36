# Сайт Аренды — MotoRent36

Витрина проката мотошлемов (Воронеж).  
Сейчас: **статический сайт** (GitHub Pages) — калькулятор + бронь по телефону / Telegram / MAX.  
Онлайн-форма заявок отключена (код API лежит в `archive/api/` на будущее).

## Быстрый старт

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Сборка статики

```bash
npm run build
```

Папка `out/` — готовый сайт для GitHub Pages / любого хостинга файлов.

## Выкладка (бюджет ≈ домен ~150–400 ₽/год)

1. Репозиторий на GitHub  
2. Settings → Pages → Source: **GitHub Actions**  
3. Variables: `NEXT_PUBLIC_SITE_URL=https://yvwvy.ru/motorent36` (уже задано)  
4. Push в `main` → workflow `Deploy GitHub Pages`  
5. Сайт: https://yvwvy.ru/motorent36/ 

Подробно: `ПРОЧЕЕ/ВЫКЛАДКА.txt`

## Когда появятся деньги на VPS

Можно вернуть онлайн-заявки + Telegram из `archive/api/` (см. README там) и Docker.

Контакты и тексты: `src/config/seo.ts` · каталог: `src/data/catalog.ts`
