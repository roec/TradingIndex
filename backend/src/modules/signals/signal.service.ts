import { TradingSignal, Timeframe } from '@trading/shared-types';
import { getSymbolIndicators } from '../indicators/indicator.service.js';

export const buildSignals = async (symbol: string, timeframe: Timeframe): Promise<TradingSignal[]> => {
  const data = await getSymbolIndicators(symbol, timeframe);
  const last = <T extends Record<string, number>>(arr: { values: T }[]) => arr[arr.length - 1]?.values;
  const ma = last(data.MA || []);
  const macd = last(data.MACD || []);
  const kdj = last(data.KDJ || []);
  const boll = last(data.BOLL || []);
  const bias = last(data.BIAS || []);
  const dmi = last(data.DMI || []);
  const sar = last(data.SAR || []);
  const baota = last(data.BAOTA || []);
  const chip = last(data.CHIP || []);
  const now = Date.now();
  return [
    { symbol, timeframe, signalType: 'MA_CROSS', action: ma?.ma5 > ma?.ma20 ? 'BUY' : 'SELL', score: 65, reasons: ['MA cross status'], timestamp: now },
    { symbol, timeframe, signalType: 'MACD_ZERO', action: (macd?.macd || 0) > 0 ? 'BUY' : 'SELL', score: 62, reasons: ['MACD above/below zero'], timestamp: now },
    { symbol, timeframe, signalType: 'KDJ_CROSS', action: (kdj?.k || 0) > (kdj?.d || 0) ? 'BUY' : 'SELL', score: 60, reasons: ['KDJ cross'], timestamp: now },
    { symbol, timeframe, signalType: 'BOLL_BREAKOUT', action: (boll?.upper || 0) > (boll?.mid || 0) ? 'BUY' : 'HOLD', score: 56, reasons: ['BOLL breakout check'], timestamp: now },
    { symbol, timeframe, signalType: 'BIAS_LEVEL', action: (bias?.bias || 0) < -6 ? 'BUY' : (bias?.bias || 0) > 6 ? 'SELL' : 'HOLD', score: 58, reasons: ['BIAS overbought/oversold'], timestamp: now },
    { symbol, timeframe, signalType: 'DMI_CONFIRM', action: (dmi?.pdi || 0) > (dmi?.mdi || 0) ? 'BUY' : 'SELL', score: 61, reasons: ['DMI trend confirmation'], timestamp: now },
    { symbol, timeframe, signalType: 'SAR_REVERSAL', action: (sar?.sar || 0) > 0 ? 'HOLD' : 'BUY', score: 50, reasons: ['SAR reversal placeholder'], timestamp: now },
    { symbol, timeframe, signalType: 'BAOTA_FLIP', action: (baota?.tower || 0) > 0 ? 'BUY' : 'SELL', score: 55, reasons: ['BaoTa line direction'], timestamp: now },
    { symbol, timeframe, signalType: 'CHIP_BREAKOUT', action: (chip?.concentration || 0) > 0.7 ? 'BUY' : 'HOLD', score: 57, reasons: ['Chip concentration breakout'], timestamp: now }
  ];
};
