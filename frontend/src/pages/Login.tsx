import { useState } from 'react';
import { api } from '../services/api';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [username,setU]=useState('demo'); const [password,setP]=useState('demo');
  const setToken=useAppStore(s=>s.setToken); const nav=useNavigate();
  return <div className="min-h-screen flex items-center justify-center"><div className="card w-80 space-y-2"><h1>Demo Login</h1><input className="border rounded w-full px-2" value={username} onChange={e=>setU(e.target.value)}/><input className="border rounded w-full px-2" value={password} onChange={e=>setP(e.target.value)} type="password"/><button className="bg-blue-600 text-white rounded px-3 py-1" onClick={()=>api.post('/auth/login',{username,password}).then(r=>{setToken(r.data.token);nav('/');})}>Login</button></div></div>
}
