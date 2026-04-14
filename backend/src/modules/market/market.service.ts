import { Candle, Quote, Timeframe } from '@trading/shared-types';
import { prisma } from '../../lib/prisma.js';

const symbols = [
  { symbol: '600519', name: '贵州茅台' },
  { symbol: '000001', name: '平安银行' },
  { symbol: '600036', name: '招商银行' },
  { symbol: '000858', name: '五粮液' },
  { symbol: '300750', name: '宁德时代' }
];

const latestQuotes = new Map<string, Quote>();

export const getStocks = async (): Promise<Quote[]> => {
  const rows = await prisma.candle.findMany({ where: { timeframe: 'day' }, orderBy: { ts: 'desc' }, take: 500 });
  const grouped = new Map<string, Candle[]>();
  rows.forEach((r) => {
    const arr = grouped.get(r.symbol) || [];
    arr.push({ ...r, ts: r.ts.getTime(), timeframe: r.timeframe as Timeframe });
    grouped.set(r.symbol, arr);
  });
  return symbols.map((s) => {
    const arr = grouped.get(s.symbol) || [];
    const latest = arr[0];
    const prev = arr[1] || latest;
    const price = latest?.close || 0;
    const changePct = prev?.close ? ((price - prev.close) / prev.close) * 100 : 0;
    const quote = { symbol: s.symbol, name: s.name, price, changePct, ts: Date.now() };
    latestQuotes.set(s.symbol, quote);
    return quote;
  });
};

export const getHistory = async (symbol: string, timeframe: Timeframe): Promise<Candle[]> => {
  const rows = await prisma.candle.findMany({ where: { symbol, timeframe }, orderBy: { ts: 'asc' }, take: 500 });
  return rows.map((r) => ({ ...r, ts: r.ts.getTime(), timeframe: r.timeframe as Timeframe }));
};

export const simulateTick = async (): Promise<Quote[]> => {
  const stocks = await getStocks();
  return stocks.map((q) => {
    const drift = (Math.random() - 0.5) * 0.01;
    const price = Number((q.price * (1 + drift)).toFixed(2));
    const prev = q.price;
    const next: Quote = { ...q, price, changePct: ((price - prev) / prev) * 100, ts: Date.now() };
    latestQuotes.set(q.symbol, next);
    return next;
  });
};

export const getLatestQuote = (symbol: string) => latestQuotes.get(symbol);
