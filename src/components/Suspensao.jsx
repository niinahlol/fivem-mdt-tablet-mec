import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Waves, Wrench, Truck } from 'lucide-react'; 

export default function Suspensao({ darkMode, playClick }) {
  const [altura, setAltura] = useState(0.5);
  const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : 'redline_tablet';

  const handleSliderChange = (e) => {
    const novoValor = parseFloat(e.target.value);
    setAltura(novoValor);
    fetch(`https://${resourceName}/ajustarSuspensao`, {
      method: 'POST',
      body: JSON.stringify({ valor: novoValor })
    });
  };

  const tocarSomNoLua = () => {
    // Voltamos a chamar o som via Lua (FiveM)
    fetch(`https://${resourceName}/playAirSound`, { method: 'POST' });
  };

  const controlarPorta = (index) => {
    playClick();
    fetch(`https://${resourceName}/controlDoors`, {
      method: 'POST',
      body: JSON.stringify({ doorIndex: index })
    });
  };

  const theme = {
    card: darkMode ? 'bg-zinc-900/40 border-white/5 text-white' : 'bg-white border-zinc-200 shadow-sm text-zinc-800',
    btn: darkMode ? 'bg-zinc-800 text-white hover:bg-redline' : 'bg-zinc-100 text-zinc-800 hover:bg-redline hover:text-white',
  };

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-start animate-in fade-in duration-500 overflow-hidden">
      <div className="text-center mb-4 mt-2">
          <Waves className="text-redline mx-auto mb-1 animate-pulse" size={28} />
          <h2 className={`text-xl font-black uppercase italic ${darkMode ? 'text-white' : 'text-zinc-800'}`}>Gestão de Stance</h2>
          <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-[0.3em]">Redline Pneumatics</p>
      </div>

      <div className={`w-full max-w-sm p-5 rounded-[2rem] border ${theme.card} flex flex-col items-center gap-4`}>
        <ChevronUp className={altura > 0.7 ? "text-redline" : "text-zinc-600"} size={20} />
        <input 
          type="range" min="0" max="1" step="0.01" value={altura} 
          onChange={handleSliderChange}
          onMouseUp={tocarSomNoLua}
          className="w-full h-2 bg-redline rounded-lg appearance-none cursor-pointer accent-white"
        />
        <ChevronDown className={altura < 0.3 ? "text-redline" : "text-zinc-600"} size={20} />
        <div className="text-center">
          <span className="text-4xl font-black italic leading-none">{Math.floor(altura * 100)}%</span>
          <p className="text-[8px] font-black text-redline uppercase tracking-widest mt-1">Pressão de Carga</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-6">
          <button onClick={() => controlarPorta(4)} className={`flex items-center justify-center gap-2 p-3 rounded-xl font-black uppercase text-[8px] transition-all ${theme.btn}`}>
              <Wrench size={14} /> Capô
          </button>
          <button onClick={() => controlarPorta(5)} className={`flex items-center justify-center gap-2 p-3 rounded-xl font-black uppercase text-[8px] transition-all ${theme.btn}`}>
              <Truck size={14} /> Porta-Malas
          </button>
      </div>

      <button 
          onClick={() => { setAltura(0.5); handleSliderChange({target:{value:0.5}}); tocarSomNoLua(); }}
          className="mt-8 text-zinc-500 hover:text-redline text-[9px] font-black uppercase tracking-widest transition-all mb-20"
      >
          Resetar Calibragem
      </button>
    </div>
  );
}