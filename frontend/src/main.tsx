import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import './i18n';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import StockDetail from './pages/StockDetail';
import Watchlist from './pages/Watchlist';
import StrategyCenter from './pages/StrategyCenter';
import Backtest from './pages/Backtest';
import PaperTrading from './pages/PaperTrading';
import RiskControl from './pages/RiskControl';
import Settings from './pages/Settings';
import Login from './pages/Login';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="market" element={<Market/>}/>
          <Route path="stockDetail" element={<StockDetail/>}/>
          <Route path="watchlist" element={<Watchlist/>}/>
          <Route path="strategies" element={<StrategyCenter/>}/>
          <Route path="backtest" element={<Backtest/>}/>
          <Route path="paperTrading" element={<PaperTrading/>}/>
          <Route path="risk" element={<RiskControl/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
