import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-futura selection:bg-brand-orange selection:text-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-orb-1 opacity-20"></div>
        <div className="ambient-orb-3 opacity-10"></div>
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <div className="text-brand-orange font-black text-[120px] md:text-[180px] leading-none mb-4 drop-shadow-[0_0_30px_rgba(255,72,0,0.4)] animate-pulse">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] mb-6">Página não encontrada</h1>
        <p className="text-brand-gray text-xs md:text-sm italic mb-10 leading-relaxed uppercase tracking-widest">
          O conteúdo que você está procurando foi movido, removido ou nunca existiu.
        </p>
        
        <Link 
          to="/" 
          className="force-orange-bg px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] inline-flex items-center space-x-3 hover:scale-105 transition-transform"
        >
          <Home className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </Link>
      </div>
      
      {/* Branding fixo */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-3 opacity-30">
        <img src="https://cardeal.tv/wp-content/uploads/2026/03/LL_laranja-1.png" className="w-6 h-6 grayscale" alt="Logo" />
        <span className="text-[10px] font-black tracking-widest uppercase">Leandro Lamezi</span>
      </div>
    </div>
  );
}
