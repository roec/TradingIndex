# China Stock Real-Time Trading System (MVP)

## 1. Project Overview
A production-style full-stack MVP for Chinese A-share market analysis, signal generation, strategy execution, backtesting, and paper trading.

## 2. Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind + Zustand + React Router + i18next + ECharts
- **Backend**: Node.js + TypeScript + Express + Prisma + WebSocket
- **Data**: PostgreSQL + Redis (via Docker)
- **Packages**:
  - `@trading/shared-types`
  - `@trading/indicator-engine`
  - `@trading/strategy-engine`
  - `@trading/utils`

## 3. Folder Structure
```txt
/frontend
/backend
/packages
  /shared-types
  /indicator-engine
  /strategy-engine
  /utils
```

## 4. Run with npm (Local)
1. Start databases:
```bash
docker compose up -d postgres redis
```
2. Install dependencies:
```bash
npm install
```
3. Backend env:
```bash
cp backend/.env.example backend/.env
```
4. Frontend env:
```bash
cp frontend/.env.example frontend/.env
```
5. Prisma migrate + seed:
```bash
npm run prisma:migrate -w backend
npm run prisma:seed -w backend
```
6. Start services:
```bash
npm run dev:backend
npm run dev:frontend
```

## 5. Run with Docker
```bash
docker compose up --build
```
Frontend: http://localhost:5173
Backend API: http://localhost:3000/api

## 6. Environment Variables
- `backend/.env.example` documents API/server/DB settings.
- `frontend/.env.example` documents client API/WS endpoints.

## 7. DB Migration and Seed
- Prisma schema: `backend/prisma/schema.prisma`
- Seed script creates users, candles, strategy presets, risk settings, watchlist, and paper account.

## 8. Feature List
- Mock authentication (demo login)
- Real-time mock quote updates via WebSocket
- Historical K-line API + configurable timeframe
- Reusable indicator engine (MA/EMA/SAR/MACD/KDJ/BOLL/PSY/BIAS/DMI/PDI/MDI/ADX/ADXR/Volume/VOL-MA/BaoTa/Chip placeholders/PE/ROE)
- Signal engine with standardized signal object
- Strategy engine with 5 built-in strategies and frontend configuration
- Watchlist CRUD and market overview dashboard
- Backtest job run + result metrics
- Paper trading orders/positions/PnL
- Risk control settings and limits
- Bilingual zh-CN/en UI with persisted toggle

## 9. Future AI Extension (OpenAI / DeepSeek)
Backend provides `AIAnalysisProvider` abstraction with:
- `OpenAIProvider` (TODO integration)
- `DeepSeekProvider` (TODO integration)
- `MockAIProvider` fallback

## 10. Notes
- Indicator and strategy logic are shared packages used by both live signal endpoints and backtesting.
- API routes are namespaced under `/api`.
