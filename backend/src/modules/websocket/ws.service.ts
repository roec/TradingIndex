import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { simulateTick } from '../market/market.service.js';
import { buildSignals } from '../signals/signal.service.js';
import { env } from '../../config/env.js';

export const setupWs = (server: Server) => {
  const wss = new WebSocketServer({ server, path: '/ws' });
  setInterval(async () => {
    const quotes = await simulateTick();
    const signals = await Promise.all(quotes.slice(0, 2).map((q) => buildSignals(q.symbol, '1m')));
    const payload = JSON.stringify({ type: 'market.update', quotes, signals: signals.flat() });
    wss.clients.forEach((client) => client.send(payload));
  }, env.mockTickMs);
};
