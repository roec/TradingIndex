import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  const [stocks, setStocks] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  useEffect(() => { api.get('/stocks').then((r) => setStocks(r.data)); api.get('/stocks/600519/signals?timeframe=day').then((r) => setAlerts(r.data)); }, []);
  const gainers = [...stocks].sort((a, b) => b.changePct - a.changePct).slice(0, 3);
  const losers = [...stocks].sort((a, b) => a.changePct - b.changePct).slice(0, 3);
  return <div className="grid grid-cols-2 gap-4">
    <section className="card"><h2 className="font-semibold mb-2">{t('dashboard.gainers')}</h2>{gainers.map((s)=><div key={s.symbol}>{s.symbol} {s.changePct?.toFixed(2)}%</div>)}</section>
    <section className="card"><h2 className="font-semibold mb-2">{t('dashboard.losers')}</h2>{losers.map((s)=><div key={s.symbol}>{s.symbol} {s.changePct?.toFixed(2)}%</div>)}</section>
    <section className="card"><h2 className="font-semibold mb-2">{t('dashboard.hotSignals')}</h2>{alerts.slice(0,5).map((a,i)=><div key={i}>{a.signalType} - {a.action}</div>)}</section>
    <section className="card"><h2 className="font-semibold mb-2">{t('dashboard.alerts')}</h2>{alerts.slice(0,5).map((a,i)=><div key={i}>{a.reasons?.[0]}</div>)}</section>
  </div>;
}
