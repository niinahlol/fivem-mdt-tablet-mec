import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { X, Home } from 'lucide-react';

import HomeTablet from './components/HomeTablet';
import Orcamento from './components/Orcamento';
import BauEstoque from './components/BauEstoque';
import ConfigTablet from './components/ConfigTablet';
import TabletMoldura from './components/TabletMoldura';
import Avisos from './components/Avisos';
import Diagnostico from './components/Diagnostico';
import Suspensao from './components/Suspensao'; // Importe o componente

export default function App() {
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [horaGame, setHoraGame] = useState('00:00');
  const navigate = useNavigate();
  const location = useLocation();

  // Função para tocar o som de troca de aba no LUA
  const playClick = useCallback(() => {
    fetch(`https://${window.GetParentResourceName ? window.GetParentResourceName() : 'redline_tablet'}/playMenuSound`, {
      method: 'POST'
    });
  }, []);

  const handleClose = useCallback(() => {
    fetch(`https://${window.GetParentResourceName ? window.GetParentResourceName() : 'redline_tablet'}/fecharTablet`, {
      method: 'POST'
    });
    setVisible(false);
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      const { action, status, hora } = event.data;
      if (action === 'setVisible') {
        setVisible(status);
        if (status) navigate('/'); 
      }
      if (action === 'atualizarHoraJogo') {
        setHoraGame(hora);
      }
    };

    window.addEventListener('message', handleMessage);
    const handleEsc = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [navigate, handleClose]);

  if (!visible) return null;

  return (
    <TabletMoldura darkMode={darkMode}>
      <div 
        style={{ backgroundColor: darkMode ? '#09090b' : '#fafafa', color: darkMode ? 'white' : '#18181b' }}
        className="relative w-full h-full flex flex-col transition-all duration-500 overflow-hidden"
      >
        <div className={`w-full h-8 px-10 flex justify-between items-center border-b shrink-0 ${darkMode ? 'bg-black/40 border-white/5 text-zinc-500' : 'bg-zinc-200 border-zinc-300 text-zinc-600'}`}>
          <span className="font-black text-[10px] tracking-widest uppercase italic">Redline OS v2.0</span>
          <div className="flex items-center gap-4">
            <span className="font-black text-[10px] tracking-[0.2em]">{horaGame}</span>
            <span className="font-black text-[10px]">100% LTE</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <Routes>
            <Route path="/" element={<HomeTablet setPagina={(id) => { playClick(); navigate(`/${id}`); }} darkMode={darkMode} />} />
            <Route path="/orcamento" element={<Orcamento darkMode={darkMode} />} />
            <Route path="/estoque" element={<BauEstoque darkMode={darkMode} />} />
            <Route path="/avisos" element={<Avisos darkMode={darkMode} playClick={playClick} />} />
            <Route path="/config" element={<ConfigTablet darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/diagnostico" element={<Diagnostico darkMode={darkMode} />} />
            <Route path="/suspensao" element={<Suspensao darkMode={darkMode} playClick={playClick} />} />
          </Routes>
        </div>

        <button onClick={handleClose} className="absolute top-10 right-10 p-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-full transition-all z-[100]">
          <X size={20} />
        </button>

        {location.pathname !== '/' && (
          <button onClick={() => { playClick(); navigate('/'); }} className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2 border rounded-full shadow-2xl z-[100] font-black text-[10px] uppercase tracking-widest transition-all ${darkMode ? 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white' : 'bg-white border-zinc-300 text-zinc-500 hover:text-zinc-900'}`}>
            <Home size={14} /> Home
          </button>
        )}
      </div>
    </TabletMoldura>
  );
}