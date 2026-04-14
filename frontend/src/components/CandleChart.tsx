import ReactECharts from 'echarts-for-react';

export default function CandleChart({ candles }: { candles: any[] }) {
  const option = {
    tooltip: {},
    xAxis: { type: 'category', data: candles.map((c) => new Date(c.ts).toLocaleDateString()) },
    yAxis: { scale: true },
    series: [{ type: 'candlestick', data: candles.map((c) => [c.open, c.close, c.low, c.high]) }]
  };
  return <ReactECharts option={option} style={{ height: 320 }} />;
}
