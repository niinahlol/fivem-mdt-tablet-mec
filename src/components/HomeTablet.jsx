import React from 'react';

import { Package, FileText, Bell, Settings, Activity, Waves } from 'lucide-react';



export default function HomeTablet({ setPagina, darkMode }) {

 

  // Mapeamento à prova de erros para os botões aparecerem

  const theme = {

    // Se darkMode for true, fundo escuro. Se false, fundo cinza bem claro.

    cardBg: darkMode ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-zinc-200 shadow-md',

    iconBg: darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500',

    text: darkMode ? 'text-zinc-400' : 'text-zinc-600',

    textHover: darkMode ? 'group-hover:text-white' : 'group-hover:text-zinc-900',

  };



  // IDs para não quebrar a navegação do App.jsx

  const menus = [

    { id: 'estoque', label: 'Estoque', icon: <Package size={32} /> },

    { id: 'orcamento', label: 'Novo Orçamento', icon: <FileText size={32} /> },

    { id: 'avisos', label: 'Avisos', icon: <Bell size={32} /> },

    { id: 'diagnostico', label: 'Diagnóstico OBD-II', icon: <Activity size={32} /> },

    { id: 'config', label: 'Config', icon: <Settings size={32} /> },

    { id: 'suspensao', label: 'Suspensão', icon: <Waves size={32} /> },
    

  ];



  return (

    <div className="w-full h-full flex flex-col items-center justify-center p-12 animate-in fade-in duration-700">

      <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">

        {menus.map((item) => (

          <button

            key={item.id}

            onClick={() => setPagina(item.id)} // Função que você usa no App.jsx

            className={`group relative flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border transition-all duration-300 hover:scale-105 active:scale-95 ${theme.cardBg}`}

          >

            {/* O container do ícone agora tem cor fixa caso o tema falhe */}

            <div className={`p-5 rounded-2xl transition-colors ${theme.iconBg} group-hover:bg-redline group-hover:text-white`}>

              {item.icon}

            </div>

           

            {/* O texto agora muda de cor para não sumir no fundo */}

            <span className={`font-black uppercase text-[10px] tracking-[0.2em] transition-colors ${theme.text} ${theme.textHover}`}>

              {item.label}

            </span>

          </button>

        ))}

      </div>



      <div className="mt-12 flex flex-col items-center gap-1 opacity-40">

        <p className={`text-[8px] font-black uppercase tracking-[0.4em] ${darkMode ? 'text-white' : 'text-zinc-900'}`}>

          Redline Fast Service — Online

        </p>

        <div className="w-12 h-[2px] bg-redline" />

      </div>

    </div>

  );

}