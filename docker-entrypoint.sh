#!/bin/sh
set -e
export DATABASE_URL="${DATABASE_URL:-file:/data/prod.db}"

echo "[motorent36] prisma db push…"
npx prisma db push

echo "[motorent36] seed (upsert)…"
npx tsx prisma/seed.ts

echo "[motorent36] preflight…"
npx tsx scripts/preflight.ts || true

echo "[motorent36] starting Next.js on :${PORT:-3000}"
exec npx next start -H 0.0.0.0 -p "${PORT:-3000}"
