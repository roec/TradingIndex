import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useTranslation } from 'react-i18next';

export default function Watchlist(){
  const { t } = useTranslation();
  const [items, setItems] = useState<any[]>([]); const [symbol,setSymbol]=useState('');
  const load=()=>api.get('/watchlist').then(r=>setItems(r.data));
  useEffect(load,[]);
  return <div className="card"><h1>{t('watchlist.title')}</h1><div className="my-2 flex gap-2"><input value={symbol} onChange={e=>setSymbol(e.target.value)} className="border rounded px-2"/><button className="bg-blue-600 text-white px-2 rounded" onClick={()=>api.post('/watchlist',{symbol}).then(load)}>{t('watchlist.add')}</button></div>{items.map((i)=><div key={i.id} className="flex justify-between"><span>{i.symbol}</span><button onClick={()=>api.delete(`/watchlist/${i.symbol}`).then(load)}>{t('watchlist.remove')}</button></div>)}</div>
}
