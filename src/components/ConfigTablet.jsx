import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function ConfigTablet({ darkMode, setDarkMode }) {
  
  // Mapeamento de cores para as Configurações
  const theme = {
    title: darkMode ? 'text-white' : 'text-zinc-900',
    subtitle: darkMode ? 'text-zinc-500' : 'text-zinc-400',
    card: darkMode ? 'bg-zinc-950/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm',
    cardTitle: darkMode ? 'text-white' : 'text-zinc-800',
    iconBg: darkMode ? 'bg-zinc-800' : 'bg-zinc-100',
  };

  return (
    <div className={`w-full p-8 flex flex-col gap-8 animate-in fade-in duration-500 transition-colors ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
      <div>
        <h1 className={`text-4xl font-black italic uppercase leading-none ${theme.title}`}>
          CONFIGURAÇÕES <span className="text-redline">SISTEMA</span>
        </h1>
        <p className={`${theme.subtitle} text-[10px] font-bold uppercase tracking-widest mt-2`}>
          Personalize sua interface Redline
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Opção de Tema */}
        <div className={`border p-6 rounded-2xl flex justify-between items-center transition-all ${theme.card}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-colors ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-redline/10 text-redline'}`}>
              {darkMode ? <Moon size={24} /> : <Sun size={24} />}
            </div>
            <div>
              <p className={`font-black text-lg uppercase italic ${theme.cardTitle}`}>Modo de Exibição</p>
              <p className={`${theme.subtitle} text-[10px] font-bold uppercase tracking-widest`}>
                Atualmente: {darkMode ? 'Escuro' : 'Claro'}
              </p>
            </div>
          </div>

          {/* Botão Switch */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-16 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${darkMode ? 'bg-zinc-700' : 'bg-redline'}`}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 ${darkMode ? 'translate-x-0' : 'translate-x-8'}`} />
          </button>
        </div>

        {/* Info do Sistema */}
        <div className={`border p-6 rounded-2xl flex items-center gap-4 opacity-50 transition-all ${theme.card}`}>
          <div className={`p-3 rounded-xl ${theme.iconBg}`}>
            <Monitor size={24} className={darkMode ? 'text-zinc-400' : 'text-zinc-500'} />
          </div>
          <div>
            <p className={`font-black text-lg uppercase italic ${theme.cardTitle}`}>Versão do Software</p>
            <p className={`${theme.subtitle} text-[10px] font-bold uppercase tracking-widest`}>Build 2.0.Du4rt3 - Redline Fast Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}