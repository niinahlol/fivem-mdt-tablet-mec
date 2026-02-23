import React, { useState } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle2, Clock, Plus, X, Send } from 'lucide-react';

// Recebemos o playClick via props para tocar os sons configurados no App.jsx
export default function Avisos({ darkMode, playClick }) {
  const [criando, setCriando] = useState(false);
  const [formData, setFormData] = useState({ titulo: '', mensagem: '', tipo: 'info' });

  // Lista de exemplo (Mock)
  const avisos = [
    {
      id: 1,
      tipo: 'urgente',
      titulo: 'Reunião Geral',
      mensagem: 'Reunião hoje às 20h para alinhar as metas da oficina.',
      data: '10 min atrás',
      icon: <AlertTriangle className="text-red-500" size={20} />
    },
    {
      id: 2,
      tipo: 'info',
      titulo: 'Peças em Falta',
      mensagem: 'O estoque de Pastilhas de Freio está abaixo do limite.',
      data: '2 horas atrás',
      icon: <Info className="text-blue-500" size={20} />
    }
  ];

  const theme = {
    card: darkMode ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-zinc-200 shadow-sm',
    textMain: darkMode ? 'text-zinc-100' : 'text-zinc-800',
    textSub: darkMode ? 'text-zinc-400' : 'text-zinc-500',
    input: darkMode ? 'bg-zinc-900 border-white/5 text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-900',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tocar o som de sucesso/envio que definimos no Lua
    if (playClick) playClick();

    // Integração com o Lua
    fetch(`https://redline_tablet/postarAviso`, {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    setCriando(false);
    setFormData({ titulo: '', mensagem: '', tipo: 'info' });
  };

  return (
    <div className="w-full h-full p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Cabeçalho com Botão de Novo Aviso */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-redline rounded-2xl shadow-lg shadow-red-600/20 text-white">
            <Bell size={24} />
          </div>
          <div>
            <h1 className={`text-2xl font-black uppercase tracking-tighter ${theme.textMain}`}>Central de Avisos</h1>
            <p className={`text-xs font-medium uppercase tracking-[0.2em] opacity-60 ${theme.textSub}`}>Notificações Redline</p>
          </div>
        </div>

        {!criando && (
          <button 
            onClick={() => {
              if (playClick) playClick(); // Toca o som ao abrir o form
              setCriando(true);
            }}
            className="flex items-center gap-2 bg-redline hover:bg-red-700 text-white px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg transition-all active:scale-95"
          >
            <Plus size={16} /> Novo Aviso
          </button>
        )}
      </div>

      {criando ? (
        /* FORMULÁRIO DE ENVIO */
        <div className={`p-8 rounded-[2.5rem] border animate-in zoom-in-95 duration-300 ${theme.card}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`font-black uppercase italic ${theme.textMain}`}>Criar Comunicado</h2>
            <button 
              onClick={() => {
                if (playClick) playClick();
                setCriando(false);
              }} 
              className="text-zinc-500 hover:text-redline transition-colors"
            >
              <X size={20}/>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
              {['urgente', 'info', 'sucesso'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    if (playClick) playClick();
                    setFormData({...formData, tipo: t});
                  }}
                  className={`flex-1 py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all
                    ${formData.tipo === t 
                      ? 'border-redline bg-redline/10 text-redline shadow-[0_0_15px_rgba(255,0,0,0.1)]' 
                      : `border-transparent ${darkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-100 text-zinc-400'}`
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <input 
              className={`p-4 rounded-xl border outline-none text-sm transition-all focus:border-redline ${theme.input}`}
              placeholder="Título do aviso..."
              value={formData.titulo}
              onChange={e => setFormData({...formData, titulo: e.target.value})}
              required
            />

            <textarea 
              className={`p-4 rounded-xl border outline-none text-sm resize-none transition-all focus:border-redline ${theme.input}`}
              placeholder="Escreva a mensagem aqui..."
              rows="4"
              value={formData.mensagem}
              onChange={e => setFormData({...formData, mensagem: e.target.value})}
              required
            />

            <button type="submit" className="bg-redline text-white font-black uppercase py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-red-700 transition-all active:scale-[0.98] shadow-lg shadow-red-600/20">
              <Send size={18} /> Publicar Aviso
            </button>
          </form>
        </div>
      ) : (
        /* LISTA DE AVISOS */
        <div className="flex flex-col gap-4">
          {avisos.map((aviso) => (
            <div 
              key={aviso.id} 
              className={`flex items-start gap-5 p-6 rounded-[2rem] border transition-all hover:scale-[1.01] hover:border-redline/30 ${theme.card}`}
            >
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800 shadow-inner' : 'bg-zinc-100'}`}>
                {/* Aqui os ícones já usam as cores corretas que você definiu */}
                {aviso.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm uppercase tracking-tight ${theme.textMain}`}>{aviso.titulo}</h3>
                  <div className={`flex items-center gap-1 text-[10px] font-bold uppercase opacity-40 ${theme.textSub}`}>
                    <Clock size={10} /> {aviso.data}
                  </div>
                </div>
                <p className={`text-sm leading-relaxed ${theme.textSub}`}>{aviso.mensagem}</p>
              </div>
            </div>
          ))}

          {avisos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <Bell size={48} className={theme.textSub} />
              <p className={`mt-4 font-black uppercase text-xs tracking-widest ${theme.textSub}`}>Mural Vazio</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}