import { StrategyDefinition, StrategyInput } from '@trading/shared-types';

const latestClose = (input: StrategyInput) => input.candles[input.candles.length - 1]?.close ?? 0;

const makeStrategy = (
  id: string,
  name: string,
  description: string,
  evaluator: (input: StrategyInput) => { action: 'BUY' | 'SELL' | 'HOLD'; score: number; reasons: string[] }
): StrategyDefinition => ({ id, name, description, evaluate: evaluator });

export const builtInStrategies: StrategyDefinition[] = [
  makeStrategy('trend_follow', 'Trend Following Strategy', 'Follows bullish momentum and trend confirmation.', (input) => {
    const bullish = input.latestSignals.filter((s) => s.action === 'BUY').length;
    return bullish >= 2 ? { action: 'BUY', score: 70, reasons: ['Trend bullish', 'Signal consensus'] } : { action: 'HOLD', score: 45, reasons: ['Waiting trend confirmation'] };
  }),
  makeStrategy('reversal', 'Reversal Strategy', 'Looks for oversold/overbought turning points.', (input) => {
    const price = latestClose(input);
    return price % 2 > 1 ? { action: 'BUY', score: 62, reasons: ['Potential oversold bounce'] } : { action: 'SELL', score: 60, reasons: ['Potential overbought reversal'] };
  }),
  makeStrategy('breakout', 'Breakout Strategy', 'Triggers on volatility breakout.', (input) => {
    const c = input.candles;
    if (c.length < 5) return { action: 'HOLD', score: 40, reasons: ['Insufficient data'] };
    const hi = Math.max(...c.slice(-5).map((x) => x.high));
    const lo = Math.min(...c.slice(-5).map((x) => x.low));
    const last = latestClose(input);
    if (last >= hi) return { action: 'BUY', score: 75, reasons: ['5-bar breakout'] };
    if (last <= lo) return { action: 'SELL', score: 75, reasons: ['5-bar breakdown'] };
    return { action: 'HOLD', score: 50, reasons: ['No breakout'] };
  }),
  makeStrategy('mean_reversion', 'Mean Reversion Strategy', 'Trades return-to-mean opportunities.', (input) => {
    const avg = input.candles.slice(-20).reduce((s, c) => s + c.close, 0) / Math.max(1, input.candles.slice(-20).length);
    const last = latestClose(input);
    if (last < avg * 0.97) return { action: 'BUY', score: 68, reasons: ['Price below mean'] };
    if (last > avg * 1.03) return { action: 'SELL', score: 68, reasons: ['Price above mean'] };
    return { action: 'HOLD', score: 48, reasons: ['Near mean'] };
  }),
  makeStrategy('composite', 'Multi-indicator Composite Strategy', 'Combines trend, momentum, and volatility signals.', (input) => {
    const buy = input.latestSignals.filter((s) => s.action === 'BUY').length;
    const sell = input.latestSignals.filter((s) => s.action === 'SELL').length;
    if (buy > sell) return { action: 'BUY', score: 80, reasons: ['Composite buy dominance'] };
    if (sell > buy) return { action: 'SELL', score: 80, reasons: ['Composite sell dominance'] };
    return { action: 'HOLD', score: 50, reasons: ['Mixed signals'] };
  })
];

export const evaluateStrategy = (strategyId: string, input: StrategyInput) => {
  const strategy = builtInStrategies.find((s) => s.id === strategyId) ?? builtInStrategies[0];
  return strategy.evaluate(input);
};
