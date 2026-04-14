import { prisma } from '../../lib/prisma.js';

export const getRisk = async () => {
  let risk = await prisma.riskConfig.findFirst();
  if (!risk) risk = await prisma.riskConfig.create({ data: { stopLoss: 0.05, takeProfit: 0.1, maxPositionSize: 0.2, maxDailyLoss: 0.05, exposureLimit: 0.8, signalConflictControl: true } });
  return risk;
};

export const updateRisk = async (input: Partial<{ stopLoss: number; takeProfit: number; maxPositionSize: number; maxDailyLoss: number; exposureLimit: number; signalConflictControl: boolean }>) => {
  const risk = await getRisk();
  return prisma.riskConfig.update({ where: { id: risk.id }, data: input });
};
