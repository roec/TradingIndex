export type Timeframe = '1m' | '5m' | '15m' | '30m' | '60m' | 'day';

export interface Candle {
  symbol: string;
  timeframe: Timeframe;
  ts: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Quote {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  ts: number;
}

export type SignalAction = 'BUY' | 'SELL' | 'HOLD';
export interface TradingSignal {
  symbol: string;
  timeframe: Timeframe;
  signalType: string;
  action: SignalAction;
  score: number;
  reasons: string[];
  timestamp: number;
}

export interface IndicatorContext {
  candles: Candle[];
  params?: Record<string, number>;
}

export interface IndicatorResultPoint {
  ts: number;
  values: Record<string, number>;
}

export interface IndicatorDefinition {
  name: string;
  calculate: (ctx: IndicatorContext) => IndicatorResultPoint[];
}

export interface StrategyDecision {
  action: SignalAction;
  score: number;
  reasons: string[];
}

export interface StrategyInput {
  symbol: string;
  timeframe: Timeframe;
  candles: Candle[];
  latestSignals: TradingSignal[];
  config: Record<string, number | string | boolean>;
}

export interface StrategyDefinition {
  id: string;
  name: string;
  description: string;
  evaluate: (input: StrategyInput) => StrategyDecision;
}
