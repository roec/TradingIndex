import { calculateIndicators } from '@trading/indicator-engine';
import { Timeframe } from '@trading/shared-types';
import { getHistory } from '../market/market.service.js';

export const getSymbolIndicators = async (symbol: string, timeframe: Timeframe) => {
  const candles = await getHistory(symbol, timeframe);
  return calculateIndicators(candles);
};
