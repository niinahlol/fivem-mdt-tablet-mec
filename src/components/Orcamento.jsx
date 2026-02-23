import React, { useState, useEffect } from 'react';
import { Activity, Trash2 } from 'lucide-react';

export default function Orcamento({ darkMode }) { // Recebendo o darkMode do App.jsx
  const [itens, setItens] = useState([]);
  const [nomeItem, setNomeItem] = useState('');
  const [valor, setValor] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('orcamento');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.action === 'comecarProgresso') {
        setCarregando(true);
        let p = 0;
        const intervalo = setInterval(() => {
          p += 2;
          setProgresso(p);
          if (p >= 100) {
            clearInterval(intervalo);
            setTimeout(() => {
              setCarregando(false);
              setProgresso(0);
              fetch(`https://redline_tablet/finalizarInstalacao`, { method: 'POST', body: JSON.stringify({}) });
            }, 500);
          }
        }, 80);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const total = itens.reduce((acc, item) => acc + item.valor, 0);

  // MAPEAMENTO DE CORES DINÂMICAS (O segredo do Modo Claro/Escuro)
  const theme = {
    bg: darkMode ? 'bg-zinc-900/50' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-zinc-900',
    subtext: darkMode ? 'text-zinc-500' : 'text-zinc-400',
    card: darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200',
    input: darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-300 text-zinc-900',
  };

  return (
    <div className={`w-full p-8 flex flex-col gap-6 min-h-full transition-colors duration-500 ${theme.bg} ${theme.text}`}>
      
      {/* Overlay de Instalação (Sempre Dark para manter o foco) */}
      {carregando && (
        <div className="absolute inset-0 bg-zinc-950/98 z-[110] flex flex-col items-center justify-center p-10">
          <Activity size={48} className="text-redline animate-pulse mb-6" />
          <h2 className="text-2xl font-black italic uppercase text-white">Instalando Software...</h2>
          <div className="w-full max-w-md h-2 bg-zinc-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-redline transition-all duration-100" style={{ width: `${progresso}%` }} />
          </div>
        </div>
      )}

      {/* Cabeçalho do App */}
      <div className="flex flex-col gap-4">
        <h1 className={`text-4xl font-black italic uppercase leading-none ${theme.text}`}>
          SISTEMA <span className="text-redline">REDLINE</span>
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setAbaAtiva('orcamento')} 
            className={`px-6 py-2 rounded-lg font-bold uppercase text-[10px] tracking-tighter border transition-all ${abaAtiva === 'orcamento' ? 'bg-redline border-redline text-white shadow-lg' : `${theme.card} ${theme.subtext}`}`}
          >
            Orçamento
          </button>
          <button 
            onClick={() => setAbaAtiva('remap')} 
            className={`px-6 py-2 rounded-lg font-bold uppercase text-[10px] tracking-tighter border transition-all ${abaAtiva === 'remap' ? 'bg-redline border-redline text-white shadow-lg' : `${theme.card} ${theme.subtext}`}`}
          >
            ECU Remap
          </button>
        </div>
      </div>

      {abaAtiva === 'orcamento' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
          {/* Inputs Dinâmicos */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            <input type="text" placeholder="Nome do Serviço" className={`md:col-span-4 border p-4 rounded-xl outline-none focus:border-redline transition-colors ${theme.input}`} value={nomeItem} onChange={(e) => setNomeItem(e.target.value)} />
            <input type="number" placeholder="R$" className={`md:col-span-2 border p-4 rounded-xl outline-none focus:border-redline transition-colors ${theme.input}`} value={valor} onChange={(e) => setValor(e.target.value)} />
            <button onClick={() => { if(nomeItem && valor) { setItens([...itens, {id: Date.now(), nome: nomeItem, valor: parseFloat(valor)}]); setNomeItem(''); setValor(''); }}} className="bg-redline text-white font-black uppercase rounded-xl hover:bg-red-700 transition-all active:scale-95">Add</button>
          </div>
          
          {/* Tabela de Itens Dinâmica */}
          <div className={`rounded-2xl border overflow-hidden shadow-2xl transition-colors ${theme.card}`}>
            <table className="w-full border-collapse">
              <thead className={`${darkMode ? 'bg-zinc-900/50' : 'bg-zinc-200'} text-[10px] font-black ${theme.subtext} uppercase`}>
                <tr>
                  <th className="p-4 text-left">Descrição do Serviço</th>
                  <th className="p-4 text-left">Valor</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {itens.length === 0 && (
                  <tr><td colSpan="3" className={`p-10 text-center font-bold uppercase text-xs ${theme.subtext}`}>Nenhum item adicionado</td></tr>
                )}
                {itens.map(item => (
                  <tr key={item.id} className={`border-t transition-colors ${darkMode ? 'border-zinc-900 hover:bg-white/[0.02]' : 'border-zinc-200 hover:bg-black/[0.02]'}`}>
                    <td className={`p-4 font-bold uppercase text-xs ${theme.text}`}>{item.nome}</td>
                    <td className="p-4 text-redline font-black italic">R$ {item.valor.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => setItens(itens.filter(i => i.id !== item.id))} className="text-zinc-500 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Totalizador (Sempre Redline) */}
          <div className="bg-redline p-6 rounded-2xl flex justify-between items-center shadow-[0_10px_30px_rgba(255,0,0,0.2)] mb-10">
             <span className="font-black uppercase text-xs text-white/80">Valor Total do Serviço</span>
             <span className="text-4xl font-black italic text-white tracking-tighter">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {abaAtiva === 'remap' && (
        <div className="flex flex-col gap-4 animate-in slide-in-from-right duration-500 pb-10">
            {[ {n:1, t:'STREET', d:'Melhora resposta de torque'}, {n:2, t:'RACING', d:'Potência máxima liberada'}, {n:3, t:'DRIFT', d:'Modo Tração Off + Backfire'} ].map(st => (
              <button 
                key={st.n} 
                onClick={() => fetch('https://redline_tablet/iniciarInstalacaoECU', { method: 'POST', body: JSON.stringify({ nivel: st.n }) })} 
                className={`group flex justify-between items-center border p-6 rounded-2xl transition-all active:scale-95 text-left ${theme.card} hover:border-redline`}
              >
                <div>
                  <p className={`font-black text-2xl italic uppercase group-hover:text-redline transition-colors ${theme.text}`}>ESTÁGIO {st.n}</p>
                  <p className={`${theme.subtext} text-[10px] font-bold uppercase tracking-widest`}>{st.d}</p>
                </div>
                <span className="bg-redline text-white px-6 py-2 rounded-lg font-black text-xs italic shadow-lg">INSTALAR</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}