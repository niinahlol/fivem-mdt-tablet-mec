import React from 'react';
import { Package, Gauge, Wrench, Zap } from 'lucide-react';

export default function BauEstoque() {
  const itens = [
    { id: 1, nome: "Turbo Nível 3", qtd: 5, cat: "Motor" },
    { id: 2, nome: "Suspensão a Ar", qtd: 2, cat: "Chassi" },
    { id: 3, nome: "Pneu de Arrancada", qtd: 0, cat: "Pneus" },
  ];

  return (
    <div className="p-6 bg-mecanica-dark">
      <div className="max-w-4xl mx-auto bg-mecanica-card border-l-4 border-redline p-8 rounded-r-2xl shadow-2xl">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-white italic uppercase">
            Redline <span className="text-redline">Inventory</span>
          </h1>
          <p className="text-white font-bold text-xs tracking-widest uppercase">Mecânica de Tuning</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itens.map((item) => (
            <div key={item.id} className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold uppercase">{item.nome}</h3>
                <p className="text-white text-xs">{item.cat}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-white">{item.qtd}</p>
                <p className="text-[10px] text-white uppercase font-bold">Unid.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}