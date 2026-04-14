import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Market() {
  const { t } = useTranslation();
  const [stocks, setStocks] = useState<any[]>([]);
  useEffect(() => { api.get('/stocks').then((r) => setStocks(r.data)); }, []);
  return <div className="card"><h1 className="font-semibold mb-3">{t('market.title')}</h1>
    <table className="w-full text-sm"><thead><tr><th>Symbol</th><th>Name</th><th>Price</th><th>Change%</th><th></th></tr></thead>
    <tbody>{stocks.map((s)=><tr key={s.symbol}><td>{s.symbol}</td><td>{s.name}</td><td>{s.price}</td><td>{s.changePct?.toFixed(2)}</td><td><Link className="text-blue-600" to={`/stockDetail?symbol=${s.symbol}`}>Detail</Link></td></tr>)}</tbody></table></div>;
}
