import { useState } from 'react';
import { api } from '../services/api';
import { useTranslation } from 'react-i18next';
export default function Backtest(){
  const { t } = useTranslation();
  const [res,setRes]=useState<any>();
  return <div className="card"><h1>{t('backtest.title')}</h1><button className="bg-blue-600 text-white rounded px-3 py-1" onClick={()=>api.post('/backtest/run',{symbol:'600519',strategyId:'composite',timeframe:'day',start:'2024-01-01',end:'2025-01-01',transactionCost:0.001,slippage:0.001}).then(r=>setRes(r.data))}>{t('backtest.run')}</button><pre className="text-xs">{JSON.stringify(res,null,2)}</pre></div>
}
