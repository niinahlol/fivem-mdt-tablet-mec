import React, { useState, useEffect } from 'react';
import { Activity, Gauge, Zap, ShieldAlert, CheckCircle } from 'lucide-react';

export default function Diagnostico({ darkMode }) {
  const [scanning, setScanning] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simula o tempo de "leitura" do scanner OBD-II
    setTimeout(() => {
      fetch(`https://redline_tablet/getVehicleData`, { method: 'POST', body: JSON.stringify({}) })
        .then(res => res.json())
        .then(resData => {
          setData(resData);
          setScanning(false);
        });
    }, 2000);
  }, []);

  const theme = {
    card: darkMode ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-zinc-200 shadow-sm',
    textMain: darkMode ? 'text-zinc-100' : 'text-zinc-800',
    barBg: darkMode ? 'bg-zinc-800' : 'bg-zinc-200',
  };

  if (scanning) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <Activity className="text-redline animate-pulse" size={64} />
        <h2 className={`font-black uppercase italic tracking-widest ${theme.textMain}`}>Acedendo ao Sistema OBD-II...</h2>
        <div className={`w-64 h-2 rounded-full overflow-hidden ${theme.barBg}`}>
          <div className="h-full bg-redline animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );
  }

  const StatBar = ({ label, value, icon: Icon, color }) => (
    <div className={`p-6 rounded-[2rem] border ${theme.card}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Icon size={18} className={color} />
          <span className={`text-xs font-black uppercase tracking-widest ${theme.textMain}`}>{label}</span>
        </div>
        <span className={`text-lg font-black ${color}`}>{Math.floor(value)}%</span>
      </div>
      <div className={`w-full h-3 rounded-full overflow-hidden ${theme.barBg}`}>
        <div 
          className={`h-full transition-all duration-1000 ${color.replace('text', 'bg')}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 gap-6">
        <StatBar label="Saúde do Motor" value={data?.motor || 0} icon={Gauge} color={data?.motor > 50 ? "text-green-500" : "text-red-500"} />
        <StatBar label="Integridade Física" value={data?.lataria || 0} icon={ShieldAlert} color="text-blue-500" />
        <StatBar label="Nível de Combustível" value={data?.combustivel || 0} icon={Zap} color="text-yellow-500" />
        
        {/* Card da ECU */}
        <div className={`p-6 rounded-[2rem] border flex items-center justify-between ${theme.card}`}>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-redline/10 rounded-2xl text-redline">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase opacity-50 ${theme.textMain}`}>Software Atual</p>
              <h3 className={`text-xl font-black uppercase italic ${theme.textMain}`}>Estágio {data?.ecu || 0}</h3>
            </div>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Otimizado</span>
          </div>
        </div>
      </div>
    </div>
  );
}