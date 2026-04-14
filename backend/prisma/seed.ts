import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const symbols = ['600519', '000001', '600036', '000858', '300750'];

const genCandles = (symbol: string, timeframe: string, n: number) => {
  let price = 100 + Math.random() * 40;
  const now = Date.now();
  return Array.from({ length: n }).map((_, i) => {
    const drift = (Math.random() - 0.48) * 0.03;
    const open = price;
    const close = +(price * (1 + drift)).toFixed(2);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    const volume = 100000 + Math.random() * 200000;
    price = close;
    return { symbol, timeframe, ts: new Date(now - (n - i) * 86400000), open, high, low, close, volume };
  });
};

async function main() {
  await prisma.user.upsert({ where: { username: 'demo' }, update: {}, create: { id: 'demo-user', username: 'demo', passwordHash: 'demo' } });
  for (const symbol of symbols) {
    const existing = await prisma.candle.count({ where: { symbol } });
    if (!existing) await prisma.candle.createMany({ data: genCandles(symbol, 'day', 240) });
  }
  await prisma.paperAccount.createMany({ data: [{ cash: 1000000 }], skipDuplicates: true });
  await prisma.strategyConfig.createMany({ data: [
    { strategyId: 'trend_follow', name: 'Trend Default', config: { maFast: 5, maSlow: 20 } },
    { strategyId: 'mean_reversion', name: 'Mean Default', config: { window: 20, threshold: 0.03 } }
  ], skipDuplicates: true });
  await prisma.riskConfig.createMany({ data: [{ stopLoss: 0.05, takeProfit: 0.1, maxPositionSize: 0.2, maxDailyLoss: 0.05, signalConflictControl: true, exposureLimit: 0.8 }], skipDuplicates: true });
  await prisma.watchlistItem.createMany({ data: [{ userId: 'demo-user', symbol: '600519' }, { userId: 'demo-user', symbol: '300750' }], skipDuplicates: true });
}

main().finally(async () => prisma.$disconnect());
