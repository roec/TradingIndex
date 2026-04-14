import { Candle, IndicatorResultPoint } from '@trading/shared-types';

const sma = (arr: number[], period: number, i: number) => {
  if (i + 1 < period) return NaN;
  const slice = arr.slice(i + 1 - period, i + 1);
  return slice.reduce((a, b) => a + b, 0) / period;
};

const emaSeries = (arr: number[], period: number) => {
  const k = 2 / (period + 1);
  let prev = arr[0] ?? 0;
  return arr.map((v) => (prev = v * k + prev * (1 - k)));
};

export const calculateIndicators = (candles: Candle[]): Record<string, IndicatorResultPoint[]> => {
  const closes = candles.map((c) => c.close);
  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const vols = candles.map((c) => c.volume);

  const ma5 = closes.map((_, i) => sma(closes, 5, i));
  const ma20 = closes.map((_, i) => sma(closes, 20, i));
  const ema12 = emaSeries(closes, 12);
  const ema26 = emaSeries(closes, 26);
  const dif = ema12.map((v, i) => v - ema26[i]);
  const dea = emaSeries(dif, 9);
  const macd = dif.map((v, i) => (v - dea[i]) * 2);

  const kdj = closes.map((_, i) => {
    const n = 9;
    const from = Math.max(0, i - n + 1);
    const hh = Math.max(...highs.slice(from, i + 1));
    const ll = Math.min(...lows.slice(from, i + 1));
    const rsv = hh === ll ? 50 : ((closes[i] - ll) / (hh - ll)) * 100;
    return rsv;
  });

  const indicators: Record<string, IndicatorResultPoint[]> = {};
  const mapOut = (name: string, values: Record<string, number>[]) => {
    indicators[name] = candles.map((c, i) => ({ ts: c.ts, values: values[i] }));
  };

  mapOut('MA', candles.map((_, i) => ({ ma5: ma5[i], ma20: ma20[i] })));
  mapOut('EMA', candles.map((_, i) => ({ ema12: ema12[i], ema26: ema26[i] })));
  mapOut('MACD', candles.map((_, i) => ({ dif: dif[i], dea: dea[i], macd: macd[i] })));
  mapOut('KDJ', candles.map((_, i) => ({ k: kdj[i], d: sma(kdj, 3, i), j: 3 * kdj[i] - 2 * sma(kdj, 3, i) })));

  const mid = ma20;
  const std = closes.map((_, i) => {
    if (i + 1 < 20) return NaN;
    const slice = closes.slice(i + 1 - 20, i + 1);
    const m = mid[i];
    return Math.sqrt(slice.reduce((s, x) => s + (x - m) ** 2, 0) / 20);
  });
  mapOut('BOLL', candles.map((_, i) => ({ upper: mid[i] + 2 * std[i], mid: mid[i], lower: mid[i] - 2 * std[i] })));

  mapOut('BIAS', candles.map((_, i) => ({ bias: ma20[i] ? ((closes[i] - ma20[i]) / ma20[i]) * 100 : 0 })));
  mapOut('PSY', candles.map((_, i) => ({ psy: i < 12 ? NaN : (closes.slice(i - 11, i + 1).filter((v, idx, arr) => idx > 0 && v > arr[idx - 1]).length / 12) * 100 })));
  mapOut('VOLUME', candles.map((_, i) => ({ volume: vols[i], volMa5: sma(vols, 5, i) })));
  mapOut('SAR', candles.map((_, i) => ({ sar: lows[Math.max(0, i - 4)] })));
  mapOut('DMI', candles.map((_, i) => ({ pdi: Math.max(0, highs[i] - (highs[i - 1] || highs[i])), mdi: Math.max(0, (lows[i - 1] || lows[i]) - lows[i]), adx: Math.abs((dif[i] || 0) * 10), adxr: Math.abs((dea[i] || 0) * 10) })));
  mapOut('BAOTA', candles.map((c) => ({ tower: c.close >= c.open ? 1 : -1 })));
  mapOut('CHIP', candles.map((c) => ({ bucketMid: c.close, concentration: Math.min(1, c.volume / 10000000) })));
  mapOut('FUNDAMENTAL', candles.map(() => ({ pe: 18, roe: 0.18 })));
  mapOut('K_PATTERN', candles.map((c) => ({ bullishEngulfing: c.close > c.open ? 1 : 0 })));
  return indicators;
};

export const incrementalUpdate = (previous: Candle[], incoming: Candle): Record<string, IndicatorResultPoint[]> => {
  const merged = [...previous.slice(-300), incoming];
  return calculateIndicators(merged);
};
