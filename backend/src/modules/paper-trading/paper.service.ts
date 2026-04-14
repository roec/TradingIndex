import { prisma } from '../../lib/prisma.js';
import { getLatestQuote } from '../market/market.service.js';

export const getAccount = async () => {
  const account = await prisma.paperAccount.findFirst();
  const positions = await prisma.position.findMany();
  return { account, positions };
};

export const placeOrder = async (symbol: string, side: 'BUY' | 'SELL', quantity: number) => {
  const quote = getLatestQuote(symbol);
  const price = quote?.price || 10;
  const order = await prisma.paperOrder.create({ data: { symbol, side, quantity, price, status: 'FILLED' } });
  let pos = await prisma.position.findFirst({ where: { symbol } });
  if (!pos) pos = await prisma.position.create({ data: { symbol, quantity: 0, avgPrice: price } });
  const newQty = side === 'BUY' ? pos.quantity + quantity : pos.quantity - quantity;
  await prisma.position.update({ where: { id: pos.id }, data: { quantity: newQty, avgPrice: price } });
  return order;
};

export const listOrders = async () => prisma.paperOrder.findMany({ orderBy: { createdAt: 'desc' } });
