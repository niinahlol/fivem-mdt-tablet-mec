import React, { useState } from 'react';
import { Send, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';

export default function NovoAvisoForm({ darkMode, onFechar }) {
  const [formData, setFormData] = useState({
    titulo: '',
    mensagem: '',
    tipo: 'info'
  });

  const tipos = [
    { id: 'urgente', label: 'Urgente', icon: <AlertTriangle size={16} />, color: 'bg-red-500' },
    { id: 'info', label: 'Informativo', icon: <Info size={16} />, color: 'bg-blue-500' },
    { id: 'sucesso', label: 'Sucesso', icon: <CheckCircle2 size={16} />, color: 'bg-green-500' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seu amigo vai conectar o fetch para o servidor FiveM
    console.log('Enviando Aviso:', formData);
    
    fetch(`https://redline_tablet/postarAviso`, {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (onFechar) onFechar();
  };

  const theme = {
    input: darkMode ? 'bg-zinc-900 border-white/5 text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-900',
    label: darkMode ? 'text-zinc-400' : 'text-zinc-500'
  };

  return (
    <div className="flex flex-col gap-6 p-2 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-black uppercase italic ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
          Criar <span className="text-redline">Novo Aviso</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Seleção de Tipo */}
        <div className="flex gap-3">
          {tipos.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFormData({...formData, tipo: t.id})}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all font-bold text-[10px] uppercase tracking-widest
                ${formData.tipo === t.id 
                  ? 'border-redline bg-redline/10 text-redline shadow-lg' 
                  : `${darkMode ? 'border-white/5 bg-zinc-900 text-zinc-500' : 'border-zinc-200 bg-zinc-100 text-zinc-400'}`
                }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Campo Título */}
        <div className="flex flex-col gap-2">
          <label className={`text-[10px] font-black uppercase tracking-widest ml-2 ${theme.label}`}>Título do Aviso</label>
          <input
            type="text"
            required
            className={`p-4 rounded-2xl border outline-none transition-all focus:border-redline ${theme.input}`}
            placeholder="Ex: Peças Novas no Estoque"
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
          />
        </div>

        {/* Campo Mensagem */}
        <div className="flex flex-col gap-2">
          <label className={`text-[10px] font-black uppercase tracking-widest ml-2 ${theme.label}`}>Mensagem Detalhada</label>
          <textarea
            required
            rows="4"
            className={`p-4 rounded-2xl border outline-none transition-all focus:border-redline resize-none ${theme.input}`}
            placeholder="Descreva o aviso para a equipe..."
            value={formData.mensagem}
            onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
          />
        </div>

        {/* Botão Enviar */}
        <button
          type="submit"
          className="mt-2 w-full bg-redline hover:bg-red-700 text-white font-black uppercase py-4 rounded-2xl shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          <Send size={20} /> Postar no Mural
        </button>
      </form>
    </div>
  );
}