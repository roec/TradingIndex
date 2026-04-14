import { useEffect, useState } from 'react';
import { api } from '../services/api';
export default function StrategyCenter(){
  const [items,setItems]=useState<any[]>([]); const [result,setResult]=useState<any>();
  useEffect(()=>{api.get('/strategies').then(r=>setItems(r.data));},[]);
  return <div className="card space-y-2"><h1>Strategy Center</h1>{items.map((s)=><button key={s.id} className="block underline" onClick={()=>api.post('/strategies/run',{symbol:'600519',timeframe:'day',strategyId:s.id,config:{}}).then(r=>setResult(r.data))}>{s.name}</button>)}<pre>{JSON.stringify(result,null,2)}</pre></div>
}
