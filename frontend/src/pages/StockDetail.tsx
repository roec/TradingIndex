import { useEffect, useState } from 'react';
import { api } from '../services/api';
import CandleChart from '../components/CandleChart';

const frames = ['1m','5m','15m','30m','60m','day'];

export default function StockDetail() {
  const symbol = new URLSearchParams(window.location.search).get('symbol') || '600519';
  const [tf, setTf] = useState('day');
  const [candles, setCandles] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<any>({});
  useEffect(() => { api.get(`/stocks/${symbol}/history?timeframe=${tf}`).then((r) => setCandles(r.data)); api.get(`/stocks/${symbol}/signals?timeframe=${tf}`).then((r) => setSignals(r.data)); api.get(`/stocks/${symbol}/indicators?timeframe=${tf}`).then((r)=>setIndicators(r.data)); }, [symbol, tf]);
  return <div className="space-y-4">
    <div className="card flex gap-2">{frames.map((f)=><button key={f} className={`px-2 py-1 rounded ${tf===f?'bg-blue-600 text-white':'bg-slate-100'}`} onClick={()=>setTf(f)}>{f}</button>)}</div>
    <div className="card"><CandleChart candles={candles}/></div>
    <div className="grid grid-cols-3 gap-4"><div className="card"><h3>Signals</h3>{signals.map((s:any,i:number)=><div key={i}>{s.signalType}: {s.action}</div>)}</div><div className="card"><h3>Indicator Panel</h3><pre className="text-xs overflow-auto">{JSON.stringify(Object.keys(indicators),null,2)}</pre></div><div className="card"><h3>Risk Notes</h3><p className="text-sm">Use stop loss/take profit under risk module.</p></div></div>
  </div>;
}
