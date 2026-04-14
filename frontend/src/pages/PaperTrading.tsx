import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function PaperTrading(){
  const [account,setAccount]=useState<any>(); const [orders,setOrders]=useState<any[]>([]);
  const load=()=>{api.get('/paper-trading/account').then(r=>setAccount(r.data));api.get('/paper-trading/orders').then(r=>setOrders(r.data));};
  useEffect(load,[]);
  return <div className="card"><h1>Paper Trading</h1><div className="my-2 flex gap-2"><button className="px-2 rounded bg-green-600 text-white" onClick={()=>api.post('/paper-trading/order',{symbol:'600519',side:'BUY',quantity:10}).then(load)}>BUY</button><button className="px-2 rounded bg-red-600 text-white" onClick={()=>api.post('/paper-trading/order',{symbol:'600519',side:'SELL',quantity:5}).then(load)}>SELL</button></div><pre className="text-xs">{JSON.stringify(account,null,2)}</pre><h2>Orders</h2>{orders.map(o=><div key={o.id}>{o.symbol}-{o.side}-{o.quantity}@{o.price}</div>)}</div>
}
