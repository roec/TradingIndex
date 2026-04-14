import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const nav = ['dashboard','market','stockDetail','watchlist','strategies','backtest','paperTrading','risk','settings'];

export default function Layout() {
  const { t } = useTranslation();
  const toggleLang = () => {
    const next = i18n.language === 'zh-CN' ? 'en' : 'zh-CN';
    i18n.changeLanguage(next); localStorage.setItem('lang', next);
  };

  return <div className="min-h-screen flex">
    <aside className="w-56 bg-slate-900 text-white p-4 space-y-3">
      <div className="font-bold text-xl">CN Trading</div>
      {nav.map((k) => <Link key={k} className="block text-sm hover:text-cyan-300" to={k==='dashboard'?'/':`/${k}`}>{t(`navigation.${k}`)}</Link>)}
    </aside>
    <div className="flex-1">
      <header className="bg-white border-b p-4 flex justify-between">
        <div className="font-semibold">China Stock Real-Time Trading</div>
        <button onClick={toggleLang} className="rounded-xl px-3 py-1 bg-slate-100">{i18n.language==='zh-CN'?t('header.langEn'):t('header.langZh')}</button>
      </header>
      <main className="p-5"><Outlet/></main>
    </div>
  </div>;
}
