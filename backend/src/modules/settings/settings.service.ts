import { prisma } from '../../lib/prisma.js';

const userId = 'demo-user';

export const getSettings = async () => {
  let setting = await prisma.setting.findFirst({ where: { userId } });
  if (!setting) setting = await prisma.setting.create({ data: { userId, language: 'zh-CN', theme: 'light', mockRefreshSpeed: 2000 } });
  return setting;
};

export const updateSettings = async (data: Partial<{ language: string; theme: string; mockRefreshSpeed: number }>) => {
  const current = await getSettings();
  return prisma.setting.update({ where: { id: current.id }, data });
};
