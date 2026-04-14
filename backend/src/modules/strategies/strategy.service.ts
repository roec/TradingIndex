import { evaluateStrategy, builtInStrategies } from '@trading/strategy-engine';
import { Timeframe } from '@trading/shared-types';
import { getHistory } from '../market/market.service.js';
import { buildSignals } from '../signals/signal.service.js';

export const listStrategies = () => builtInStrategies;

export const runStrategy = async (symbol: string, timeframe: Timeframe, strategyId: string, config: Record<string, string | number | boolean>) => {
  const candles = await getHistory(symbol, timeframe);
  const latestSignals = await buildSignals(symbol, timeframe);
  return evaluateStrategy(strategyId, { symbol, timeframe, candles, latestSignals, config });
};
