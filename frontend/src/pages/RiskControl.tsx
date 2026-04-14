import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function RiskControl(){
  const [risk,setRisk]=useState<any>();
  useEffect(()=>{api.get('/risk').then(r=>setRisk(r.data));},[]);
  if(!risk) return <div className="card">Loading...</div>;
  return <div className="card space-y-2"><h1>Risk Control</h1><input className="border rounded px-2" value={risk.stopLoss} onChange={e=>setRisk({...risk,stopLoss:Number(e.target.value)})}/><input className="border rounded px-2" value={risk.takeProfit} onChange={e=>setRisk({...risk,takeProfit:Number(e.target.value)})}/><button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>api.put('/risk',risk)}>Save</button></div>
}
