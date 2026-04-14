import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { z } from 'zod';
import { env } from './config/env.js';
import { demoLogin } from './modules/auth/auth.service.js';
import { getStocks, getHistory } from './modules/market/market.service.js';
import { getSymbolIndicators } from './modules/indicators/indicator.service.js';
import { buildSignals } from './modules/signals/signal.service.js';
import { listStrategies, runStrategy } from './modules/strategies/strategy.service.js';
import { runBacktest, getBacktest } from './modules/backtest/backtest.service.js';
import { getWatchlist, addWatchlist, removeWatchlist } from './modules/watchlist/watchlist.service.js';
import { getAccount, placeOrder, listOrders } from './modules/paper-trading/paper.service.js';
import { getSettings, updateSettings } from './modules/settings/settings.service.js';
import { getRisk, updateRisk } from './modules/risk/risk.service.js';
import { setupWs } from './modules/websocket/ws.service.js';

const app = express();
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  try {
    const body = z.object({ username: z.string(), password: z.string() }).parse(req.body);
    res.json(demoLogin(body.username, body.password));
  } catch {
    res.status(400).json({ message: 'Login failed' });
  }
});

app.get('/api/stocks', async (_, res) => res.json(await getStocks()));
app.get('/api/stocks/:symbol/history', async (req, res) => res.json(await getHistory(req.params.symbol, (req.query.timeframe as any) || 'day')));
app.get('/api/stocks/:symbol/indicators', async (req, res) => res.json(await getSymbolIndicators(req.params.symbol, (req.query.timeframe as any) || 'day')));
app.get('/api/stocks/:symbol/signals', async (req, res) => res.json(await buildSignals(req.params.symbol, (req.query.timeframe as any) || 'day')));
app.get('/api/strategies', (_, res) => res.json(listStrategies()));
app.post('/api/strategies/run', async (req, res) => res.json(await runStrategy(req.body.symbol, req.body.timeframe || 'day', req.body.strategyId, req.body.config || {})));

app.post('/api/backtest/run', async (req, res) => res.json(await runBacktest(req.body)));
app.get('/api/backtest/:id', async (req, res) => {
  const result = await getBacktest(req.params.id);
  if (!result) return res.status(404).json({ message: 'Not found' });
  res.json(result);
});

app.get('/api/watchlist', async (_, res) => res.json(await getWatchlist()));
app.post('/api/watchlist', async (req, res) => res.json(await addWatchlist(req.body.symbol)));
app.delete('/api/watchlist/:symbol', async (req, res) => res.json(await removeWatchlist(req.params.symbol)));

app.get('/api/paper-trading/account', async (_, res) => res.json(await getAccount()));
app.post('/api/paper-trading/order', async (req, res) => res.json(await placeOrder(req.body.symbol, req.body.side, Number(req.body.quantity))));
app.get('/api/paper-trading/orders', async (_, res) => res.json(await listOrders()));

app.get('/api/risk', async (_, res) => res.json(await getRisk()));
app.put('/api/risk', async (req, res) => res.json(await updateRisk(req.body)));
app.get('/api/settings', async (_, res) => res.json(await getSettings()));
app.put('/api/settings', async (req, res) => res.json(await updateSettings(req.body)));

const server = createServer(app);
setupWs(server);
server.listen(env.port, () => console.log(`Backend running on ${env.port}`));
