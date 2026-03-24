import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { Settings, Users, CreditCard, Trash2, ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const { plans, waitlist, updatePlanPrice, removeWaitlistEntry } = useAppStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'plans' | 'subscribers' | 'courses'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dbSubscribers, setDbSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lamezi2026') {
      setIsAuthenticated(true);
      setError('');
      fetchSubscribers();
    } else {
      setError('Senha incorreta');
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('mentoria_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setDbSubscribers(data || []);
    } catch (err) {
      console.error('Erro ao buscar inscritos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscribers();
    }
  }, [isAuthenticated]);

  const handlePriceChange = (id: string, field: 'priceBRL' | 'priceUSD', value: string) => {
    const plan = plans.find(p => p.id === id);
    if (plan) {
      if (field === 'priceBRL') {
        updatePlanPrice(id, value, plan.priceUSD);
      } else {
        updatePlanPrice(id, plan.priceBRL, value);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-futura selection:bg-brand-orange selection:text-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-brand-orange shadow-[0_0_15px_rgba(255,72,0,0.8)] rounded-b-md"></div>
          <Lock className="w-12 h-12 text-brand-orange mx-auto mb-6" />
          <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Acesso Restrito</h2>
          <p className="text-brand-gray text-xs italic mb-8">Digite a senha para acessar o painel administrativo.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange transition-colors text-center tracking-[0.2em]"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button type="submit" className="w-full bg-brand-orange text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl text-xs hover:scale-[1.02] transition-transform">
              Entrar
            </button>
          </form>
          
          <div className="mt-8">
            <Link to="/" className="text-brand-gray hover:text-brand-orange text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center">
              <ArrowLeft className="w-3 h-3 mr-2" /> Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-futura selection:bg-brand-orange selection:text-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-brand-gray hover:text-brand-orange transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-black uppercase tracking-widest flex items-center">
              <Settings className="w-5 h-5 mr-2 text-brand-orange" />
              Painel Admin
            </h1>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'dashboard' ? 'bg-brand-orange text-black' : 'bg-white/5 text-brand-gray hover:bg-white/10'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'plans' ? 'bg-brand-orange text-black' : 'bg-white/5 text-brand-gray hover:bg-white/10'}`}
            >
              Planos
            </button>
            <button 
              onClick={() => setActiveTab('subscribers')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'subscribers' ? 'bg-brand-orange text-black' : 'bg-white/5 text-brand-gray hover:bg-white/10'}`}
            >
              Assinantes
            </button>
            <button 
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'courses' ? 'bg-brand-orange text-black' : 'bg-white/5 text-brand-gray hover:bg-white/10'}`}
            >
              Aulas
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-brand-gray text-[10px] font-black uppercase tracking-widest mb-2">Total Assinantes</p>
                <p className="text-4xl font-black text-brand-orange">{dbSubscribers.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-brand-gray text-[10px] font-black uppercase tracking-widest mb-2">Aulas Ativas</p>
                <p className="text-4xl font-black text-brand-orange">42</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-brand-gray text-[10px] font-black uppercase tracking-widest mb-2">Receita Est. (Mês)</p>
                <p className="text-4xl font-black text-brand-orange">R$ 24.500</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-brand-gray text-[10px] font-black uppercase tracking-widest mb-2">Novos Inscritos (Hoje)</p>
                <p className="text-4xl font-black text-brand-orange">3</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black uppercase tracking-widest">Atividade Recente (Global)</h3>
                <button onClick={fetchSubscribers} className="text-xs text-brand-gray hover:text-brand-orange transition-colors">Atualizar</button>
              </div>
              <div className="space-y-4">
                {dbSubscribers.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange text-xs font-bold">
                        {entry.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{entry.name}</p>
                        <p className="text-[10px] text-brand-gray">{entry.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-brand-gray italic">
                      {new Date(entry.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center space-x-3 mb-8">
              <CreditCard className="w-6 h-6 text-brand-orange" />
              <h2 className="text-2xl font-black uppercase tracking-widest">Controle de Valores</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                  {plan.isPopular && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange"></div>
                  )}
                  <h3 className="text-lg font-black text-brand-orange uppercase tracking-widest mb-2">{plan.namePt}</h3>
                  <p className="text-xs text-brand-gray mb-6 h-10">{plan.descPt}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Preço (R$)</label>
                      <input 
                        type="text" 
                        value={plan.priceBRL}
                        onChange={(e) => handlePriceChange(plan.id, 'priceBRL', e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1">Preço (USD)</label>
                      <input 
                        type="text" 
                        value={plan.priceUSD}
                        onChange={(e) => handlePriceChange(plan.id, 'priceUSD', e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-brand-orange" />
                <h2 className="text-2xl font-black uppercase tracking-widest">Monitorar Assinantes</h2>
              </div>
              <span className="bg-brand-orange/20 text-brand-orange px-3 py-1 rounded-full text-xs font-bold">
                {dbSubscribers.length} cadastrados
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center p-20">
                <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
              </div>
            ) : dbSubscribers.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-brand-gray italic">Nenhum assinante cadastrado ainda.</p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-brand-gray">
                      <tr>
                        <th className="px-6 py-4 font-bold">Data</th>
                        <th className="px-6 py-4 font-bold">Nome</th>
                        <th className="px-6 py-4 font-bold">Email</th>
                        <th className="px-6 py-4 font-bold">Telefone</th>
                        <th className="px-6 py-4 font-bold text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {dbSubscribers.map((entry) => (
                        <tr key={entry.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-brand-gray text-xs">
                            {new Date(entry.created_at).toLocaleDateString('pt-BR', {
                              day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </td>
                          <td className="px-6 py-4 font-medium">{entry.name}</td>
                          <td className="px-6 py-4 text-brand-gray">{entry.email}</td>
                          <td className="px-6 py-4 text-brand-gray">{entry.phone}</td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={async () => {
                                if(confirm('Remover este assinante?')) {
                                  const { error } = await supabase.from('mentoria_subscribers').delete().eq('id', entry.id);
                                  if (error) alert('Erro ao remover: ' + error.message);
                                  fetchSubscribers();
                                }
                              }}
                              className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                              title="Remover"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center space-x-3 mb-8">
              <Settings className="w-6 h-6 text-brand-orange" />
              <h2 className="text-2xl font-black uppercase tracking-widest">Monitorar Aulas</h2>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-brand-gray italic">Módulo de gerenciamento de aulas em desenvolvimento.</p>
              <p className="text-[10px] text-brand-gray/50 uppercase mt-2">Total de módulos no site: 5</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
