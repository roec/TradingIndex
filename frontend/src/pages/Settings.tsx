import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useTranslation } from 'react-i18next';

export default function Settings(){
  const { t } = useTranslation();
  const [s,setS]=useState<any>();
  useEffect(()=>{api.get('/settings').then(r=>setS(r.data));},[]);
  if(!s) return <div className="card">Loading...</div>;
  return <div className="card"><h1>{t('settings.title')}</h1><label>{t('settings.refresh')}</label><input className="border rounded px-2 ml-2" value={s.mockRefreshSpeed} onChange={e=>setS({...s,mockRefreshSpeed:Number(e.target.value)})}/><button className="ml-3 bg-blue-600 text-white rounded px-2" onClick={()=>api.put('/settings',s)}>{t('watchlist.add')}</button></div>
}
