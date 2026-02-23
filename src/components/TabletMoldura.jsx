import React from 'react';

export default function TabletMoldura({ children, darkMode }) { // Recebe darkMode
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Corpo do Tablet - Muda de #050505 para Cinza conforme o darkMode */}
      <div className={`relative w-[1050px] h-[650px] rounded-[3.5rem] p-0 shadow-[0_0_100px_rgba(0,0,0,0.8)] border-[10px] border-zinc-800 transition-colors duration-500 ${darkMode ? 'bg-[#050505]' : 'bg-zinc-300'}`}>
        
        {/* Botões Laterais */}
        <div className="absolute -right-2 top-20 w-1 h-16 bg-zinc-800 rounded-r-lg border-r border-zinc-700"></div>
        
        {/* Tela do LCD - Aqui é onde a cor de fundo REAL acontece */}
        <div style={{ backgroundColor: darkMode ? '#09090b' : '#fafafa' }} // Forçando a cor aqui também
  className={`w-full h-full rounded-[2.5rem] overflow-hidden border shadow-inner flex flex-col transition-colors duration-500 ${darkMode ? 'border-zinc-900' : 'border-zinc-300'}`}>
  {children}
</div>

        {/* Sensor Home */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-zinc-800 rounded-full opacity-30"></div>
      </div>
    </div>
  );
}