import { prisma } from '../../lib/prisma.js';

const userId = 'demo-user';

export const getWatchlist = async () => prisma.watchlistItem.findMany({ where: { userId } });

export const addWatchlist = async (symbol: string) => prisma.watchlistItem.upsert({
  where: { userId_symbol: { userId, symbol } },
  update: {},
  create: { userId, symbol }
});

export const removeWatchlist = async (symbol: string) => prisma.watchlistItem.delete({ where: { userId_symbol: { userId, symbol } } });
