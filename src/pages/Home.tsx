import React, { useState, useEffect } from 'react';
import { User, Check, Star, ChevronDown, MessageCircle, Instagram, Youtube, Apple, Play, ArrowUp, ShieldCheck, CreditCard, X, ArrowRight } from 'lucide-react';
import { uiTranslations, modulesData, testData, faqsData, logoUrls, welcomeMessages } from '../data';
import { useAppStore } from '../store';

type Lang = 'pt' | 'en';

export default function Home() {
  const [lang, setLang] = useState<Lang>('pt');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [modalModule, setModalModule] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Waitlist form state
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  // Zustand Store
  const { plans, addWaitlistEntry } = useAppStore();

  const t = (key: keyof typeof uiTranslations['pt']) => uiTranslations[lang][key];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPrecos = () => {
    const offset = window.innerWidth < 768 ? 80 : 120;
    const precosEl = document.getElementById('precos');
    if (precosEl) {
      window.scrollTo({ top: precosEl.offsetTop - offset, behavior: 'smooth' });
    }
  };

  const handleLevelSelect = (index: number) => {
    setSelectedLevel(index);
  };

  const handleQuizSubmit = () => {
    scrollToPrecos();
  };

  const openModal = (id: string) => {
    setModalModule(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalModule(null);
    document.body.style.overflow = 'auto';
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      if (loginEmail === 'admin@lamezi.com' && loginPassword === 'lamezi2026') {
        window.location.href = '/admin';
      } else {
        setLoginError('Acesso não autorizado ou credenciais incorretas.');
        setTimeout(() => setLoginError(''), 3000);
      }
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistName && waitlistEmail) {
      addWaitlistEntry({
        name: waitlistName,
        email: waitlistEmail,
        phone: waitlistPhone
      });
      setWaitlistSuccess(true);
      setWaitlistName('');
      setWaitlistEmail('');
      setWaitlistPhone('');
      setTimeout(() => setWaitlistSuccess(false), 5000);
    }
  };

  const activeModule = modalModule ? modulesData.find(m => m.id === modalModule) : null;

  return (
    <div className="selection:bg-brand-orange selection:text-black font-futura text-brand-white">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-orb-1"></div>
        <div className="ambient-orb-2"></div>
        <div className="ambient-orb-3"></div>
      </div>

      {/* Promo Bar */}
      <div className="promo-bar flex items-center justify-center gap-3">
        <img src="https://static.wixstatic.com/media/dc7632_f080074922bd4a98a43ac019ff128960~mv2.gif" alt="Promo" className="w-4 h-4 md:w-5 md:h-5 object-contain rounded-sm" />
        <span className="leading-tight text-center">{t('promo')}</span>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[200]">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
          <div className="relative liquid-glass-heavy w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 rounded-[32px] border border-brand-orange/20">
            <button onClick={() => setShowLoginModal(false)} className="clean-btn absolute top-4 right-4 md:top-6 md:right-6 text-brand-gray hover:text-brand-white z-50">
              <X className="w-6 h-6" />
            </button>
            <div className="p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-brand-orange shadow-[0_0_20px_rgba(255,72,0,0.8)] rounded-b-xl"></div>
              
              <h2 className="text-3xl font-black uppercase mb-4 text-brand-white mt-4">Login</h2>
              <p className="text-brand-gray text-sm italic mb-8">
                {lang === 'pt' ? 'Acesse sua área exclusiva.' : 'Access your exclusive area.'}
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">E-mail</label>
                  <input 
                    type="email" 
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange transition-colors text-white"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">Senha</label>
                  <input 
                    type="password" 
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange transition-colors text-white"
                    placeholder="••••••••"
                  />
                </div>
                
                {loginError && <p className="text-red-500 text-[10px] font-bold uppercase text-center mt-2">{loginError}</p>}

                <button type="submit" className="force-orange-bg w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center space-x-2 mt-6">
                  <span>{lang === 'pt' ? 'Entrar' : 'Sign In'}</span>
                </button>
                <div className="text-center mt-4">
                  <a href="#" className="text-[10px] text-brand-gray hover:text-brand-orange uppercase tracking-widest font-bold">Esqueceu a senha?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[200]">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowWaitlistModal(false)}></div>
          <div className="relative liquid-glass-heavy w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 rounded-[32px] border border-brand-orange/20">
            <button onClick={() => setShowWaitlistModal(false)} className="clean-btn absolute top-4 right-4 md:top-6 md:right-6 text-brand-gray hover:text-brand-white z-50">
              <X className="w-6 h-6" />
            </button>
            <div className="p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-brand-orange shadow-[0_0_20px_rgba(255,72,0,0.8)] rounded-b-xl"></div>
              
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-brand-white mt-4">
                {lang === 'pt' ? 'Lista de Espera' : 'Waitlist'}
              </h2>
              <p className="text-brand-gray text-sm md:text-base italic mb-8 max-w-xl mx-auto">
                {lang === 'pt' 
                  ? 'Garanta sua vaga na próxima turma e receba condições exclusivas de lançamento.' 
                  : 'Secure your spot in the next class and receive exclusive launch conditions.'}
              </p>

              {waitlistSuccess ? (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-2xl animate-in fade-in zoom-in">
                  <Check className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-black uppercase tracking-widest mb-2">
                    {lang === 'pt' ? 'Cadastro Realizado!' : 'Registration Successful!'}
                  </h3>
                  <p className="text-sm italic">
                    {lang === 'pt' ? 'Você está na lista. Avisaremos assim que abrirmos novas vagas.' : 'You are on the list. We will notify you as soon as we open new spots.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto space-y-4 text-left">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                      {lang === 'pt' ? 'Nome Completo' : 'Full Name'}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange transition-colors text-white"
                      placeholder={lang === 'pt' ? 'Seu nome' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                      {lang === 'pt' ? 'E-mail' : 'Email'}
                    </label>
                    <input 
                      type="email" 
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange transition-colors text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                      {lang === 'pt' ? 'WhatsApp (Opcional)' : 'WhatsApp (Optional)'}
                    </label>
                    <input 
                      type="tel" 
                      value={waitlistPhone}
                      onChange={(e) => setWaitlistPhone(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange transition-colors text-white"
                      placeholder="+55 (00) 00000-0000"
                    />
                  </div>
                  <button type="submit" className="force-orange-bg w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center space-x-2 mt-6 hover:scale-[1.02] transition-transform">
                    <span>{lang === 'pt' ? 'Entrar para a Lista' : 'Join Waitlist'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {activeModule && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[200]">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative liquid-glass-heavy w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button onClick={closeModal} className="clean-btn absolute top-4 right-4 md:top-8 md:right-8 text-brand-gray hover:text-brand-white z-50">
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <div className="p-6 md:p-8 lg:p-20 max-h-[85vh] overflow-y-auto modal-scroll">
              <div className="space-y-8 md:space-y-10 text-brand-white">
                <div className="flex items-center space-x-3 md:space-x-8 mb-6 md:mb-10">
                  <div className="text-brand-orange font-black text-4xl md:text-7xl leading-none drop-shadow-md">{activeModule.id}</div>
                  <h2 className="text-xl md:text-4xl font-black uppercase text-brand-white font-futura">{activeModule[lang].title}</h2>
                </div>
                <div className="space-y-4 md:space-y-8 font-futura text-brand-gray text-xs md:text-base">
                  <div className="liquid-glass p-4 md:p-6">
                    <h4 className="text-brand-orange font-black uppercase mb-2 text-[11px] md:text-sm">{activeModule[lang].det_h1}</h4>
                    <p className="leading-relaxed">{activeModule[lang].det_p1}</p>
                  </div>
                  <div className="liquid-glass p-4 md:p-6">
                    <h4 className="text-brand-orange font-black uppercase mb-2 text-[11px] md:text-sm">{activeModule[lang].det_h2}</h4>
                    <p className="leading-relaxed">{activeModule[lang].det_p2}</p>
                  </div>
                  <div className="liquid-glass p-4 md:p-6">
                    <h4 className="text-brand-orange font-black uppercase mb-2 text-[11px] md:text-sm">{activeModule[lang].det_h3}</h4>
                    <p className="leading-relaxed">{activeModule[lang].det_p3}</p>
                  </div>
                </div>
                <div className="pt-8 md:pt-16 flex justify-center">
                  <button onClick={closeModal} className="force-orange-bg px-8 md:px-12 py-3 md:py-4 rounded-full font-black text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-futura">
                    {lang === 'pt' ? 'FECHAR' : 'CLOSE'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 liquid-glass border-x-0 border-t-0 rounded-none px-4 md:px-6 lg:px-12 py-4 md:py-5 font-futura uppercase tracking-widest h-nav-height">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center h-full">
          <div className="flex items-center justify-start space-x-3 md:space-x-4">
            <img src="https://cardeal.tv/wp-content/uploads/2026/03/LL_laranja-1.png" className="w-7 h-7 md:w-8 md:h-8" alt="Logotipo Leandro Lamezi" />
            <div className="text-lg md:text-xl font-black tracking-tighter text-brand-white hidden sm:block">LEANDRO LAMEZI</div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3 bg-black/30 p-1 md:p-1.5 rounded-full border border-white/10">
            <button onClick={() => setLang('pt')} className={`lang-btn px-2 md:px-3 py-1 ${lang === 'pt' ? 'active' : ''}`}>PT</button>
            <div className="w-[1px] h-3 bg-white/20"></div>
            <button onClick={() => setLang('en')} className={`lang-btn px-2 md:px-3 py-1 ${lang === 'en' ? 'active' : ''}`}>EN</button>
          </div>

          <div className="hidden lg:flex items-center justify-center space-x-12 text-[11px] font-medium text-brand-gray">
            <a href="#aprender" className="hover:text-brand-orange transition-colors">{t('nav_aulas')}</a>
            <a href="#instrutor" className="hover:text-brand-orange transition-colors">{t('nav_mentor')}</a>
            <a href="#precos" className="hover:text-brand-orange transition-colors">{t('nav_planos')}</a>
            <a href="#faq" className="hover:text-brand-orange transition-colors">{t('nav_duvidas')}</a>
          </div>
          
          <div className="flex items-center justify-end space-x-4 md:space-x-6 lg:space-x-8">
            <button 
              type="button" 
              onClick={() => setShowLoginModal(true)}
              className="clean-btn flex items-center space-x-2 lg:space-x-3 text-[10px] text-brand-gray font-bold hover:text-brand-orange uppercase tracking-widest group bg-transparent border-none"
            >
              <User className="w-4 h-4 text-brand-orange" />
              <span className="hidden sm:inline">Login</span>
            </button>
            <button onClick={() => setShowWaitlistModal(true)} className="force-orange-bg px-5 py-2 md:px-6 md:py-2.5 lg:px-7 lg:py-2.5 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.15em] transition-all text-center">
              {t('nav_assinar')}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-20 px-6 lg:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative z-20 text-center lg:text-left">
              <h1 className="mb-6 md:mb-8 leading-[1.1] uppercase font-futura">
                <span className="text-4xl md:text-5xl lg:text-[58px] block font-black text-brand-gray">{t('hero_t1')}</span>
                <span className="text-4xl md:text-5xl lg:text-[58px] block mt-1 font-black">
                  <span className="animate-cores-mix">COLOR GRADING</span>
                </span>
              </h1>
              <div className="w-16 md:w-20 h-1.5 bg-brand-orange mb-8 md:mb-12 shadow-[0_0_15px_rgba(255,72,0,0.6)] mx-auto lg:mx-0"></div>
              <p className="text-base md:text-lg text-brand-gray mb-10 max-w-sm mx-auto lg:mx-0 uppercase tracking-widest">{t('hero_sub')}</p>
              
              <div className="max-w-md mx-auto lg:mx-0 liquid-glass p-6 md:p-8 relative">
                <p className="text-[10px] md:text-[11px] font-medium mb-6 uppercase tracking-[0.25em] text-brand-gray italic">{t('hero_cta_sub')}</p>
                <button onClick={scrollToPrecos} className="force-orange-bg w-full py-4 md:py-5 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em]">{t('hero_cta')}</button>
                <p className="text-[9px] md:text-[10px] text-brand-gray/80 mt-6 uppercase tracking-widest text-center">{t('hero_cta_note')}</p>
              </div>
            </div>

            <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] relative rounded-[32px] md:rounded-[40px] liquid-glass p-2 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-brand-white/10">
              <div className="w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden relative bg-black">
                <iframe src="https://player.vimeo.com/video/547792423?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1" className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" frameBorder="0" allow="autoplay; fullscreen"></iframe>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 rounded-[32px] md:rounded-[40px] pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Marquee Textos Reverso */}
        <section className="marquee-wrap pb-0 border-b-0 bg-white">
          <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-12">
            <div className="relative overflow-hidden">
              <div className="marquee-track-reverse" aria-hidden="true">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="marquee-item">NARRATIVA <span className="marquee-separator">|</span> TÉCNICA <span className="marquee-separator">|</span> WORKFLOW <span className="marquee-separator">|</span> CARREIRA</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Logos */}
        <section className="marquee-wrap pt-6 md:pt-10 bg-white">
          <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-12">
            <div className="relative overflow-hidden">
              <div className="marquee-track" aria-hidden="true">
                {[...logoUrls, ...logoUrls].map((url, i) => (
                  <img key={i} src={url} className="marquee-logo-img" alt="Logo Parceiro" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Psicologia das Cores */}
        <section className="py-16 lg:py-32 px-6 lg:px-12 relative overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16 uppercase tracking-[0.3em]">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                <span>{t('psi_title')}</span> <span className="animate-cores-mix">{t('psi_title_color')}</span>
              </h2>
              <p className="text-[9px] md:text-[11px] text-brand-gray font-bold uppercase">{t('psi_sub')}</p>
              <div className="w-20 md:w-24 h-1 bg-brand-orange mx-auto mt-6 md:mt-8 shadow-[0_0_15px_rgba(255,72,0,0.8)]"></div>
            </div>
            <div className="video-container w-full">
              <iframe src="https://player.vimeo.com/video/547792423?background=1&autoplay=1&loop=1&byline=0&title=0#t=10s" frameBorder="0" allow="autoplay; fullscreen"></iframe>
            </div>
            <div className="mt-10 md:mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center uppercase text-[10px] tracking-widest liquid-glass p-6 md:p-8 lg:p-12">
              <div className="space-y-3 md:space-y-4">
                <h4 className="text-brand-orange font-black text-sm drop-shadow-md">{t('psi_t1')}</h4>
                <p className="text-brand-gray italic">{t('psi_d1')}</p>
              </div>
              <div className="space-y-3 md:space-y-4 pt-4 md:pt-0 border-t border-brand-white/10 md:border-none">
                <h4 className="text-brand-orange font-black text-sm drop-shadow-md">{t('psi_t2')}</h4>
                <p className="text-brand-gray italic">{t('psi_d2')}</p>
              </div>
              <div className="space-y-3 md:space-y-4 pt-4 md:pt-0 border-t border-brand-white/10 md:border-none">
                <h4 className="text-brand-orange font-black text-sm drop-shadow-md">{t('psi_t3')}</h4>
                <p className="text-brand-gray italic">{t('psi_d3')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Consultoria & Visão */}
        <section className="py-12 lg:py-24 px-6 lg:px-12 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="liquid-glass-heavy p-8 md:p-12 lg:p-16 flex flex-col justify-center text-center lg:text-left shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-float">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase text-brand-white mb-6 leading-tight drop-shadow-lg">
                {t('cons_t1')}
              </h2>
              <p className="text-base md:text-xl lg:text-2xl text-brand-orange font-bold uppercase tracking-widest italic drop-shadow-[0_0_10px_rgba(255,72,0,0.5)]">
                {t('cons_t2')}
              </p>
              <div className="w-full lg:w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-white/20 to-transparent lg:from-brand-white/20 lg:via-brand-white/10 lg:to-transparent mt-10 md:mt-12"></div>
            </div>
            <div className="liquid-glass-heavy p-8 md:p-12 lg:p-16 flex flex-col justify-center shadow-[0_20px_40px_rgba(0,0,0,0.6)] text-center lg:text-left animate-float-delayed">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-brand-white mb-3 leading-none drop-shadow-lg" dangerouslySetInnerHTML={{ __html: t('vis_t1') }}></h2>
              <p className="text-[9px] md:text-xs font-bold text-brand-white/70 uppercase tracking-widest mb-6 md:mb-8 drop-shadow-md">{t('vis_sub')}</p>
              <div className="w-12 h-1 bg-brand-orange shadow-[0_0_10px_rgba(255,72,0,0.8)] mb-6 md:mb-10 mx-auto lg:mx-0"></div>
              <p className="text-sm md:text-lg lg:text-xl font-light text-brand-white uppercase leading-relaxed tracking-wide drop-shadow-md" dangerouslySetInnerHTML={{ __html: t('vis_desc') }}></p>
            </div>
          </div>
        </section>

        {/* Módulos */}
        <section id="aprender" className="py-16 lg:py-32 px-6 lg:px-12 relative border-t border-brand-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-16 lg:mb-24 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-brand-white">{t('mod_title')}</h2>
              <div className="w-16 h-1.5 bg-brand-orange shadow-[0_0_15px_rgba(255,72,0,0.6)] mx-auto lg:mx-0"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 lg:gap-y-24">
              {modulesData.map(m => (
                <div key={m.id} className="module-item group flex flex-col md:flex-row gap-8">
                  <div className="module-img-container flex-shrink-0 w-full max-w-[280px] aspect-square rounded-[24px] overflow-hidden border border-white/10 border-t-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mx-auto md:mx-0">
                    <img src={m.img} className="module-img w-full h-full object-cover" alt="Módulo" />
                  </div>
                  <div className="flex-1 liquid-glass p-6 md:p-8 hover:-translate-y-1 transition-transform w-full mt-[-2rem] md:mt-0 relative z-10 md:z-auto ml-0 md:-ml-8 pt-12 md:pt-8">
                    <div className="module-number text-[3.5rem] font-black text-brand-orange leading-none mb-4 drop-shadow-md">{m.id}</div>
                    <h3 className="module-title text-xl font-black uppercase text-brand-white">{m[lang].title}</h3>
                    <p className="module-desc italic uppercase text-xs md:text-sm mt-2 text-brand-gray">{m[lang].desc}</p>
                    <button onClick={() => openModal(m.id)} className="btn-details mt-4 md:mt-6 w-full sm:w-auto text-center">
                      {lang === 'pt' ? 'MAIS DETALHES' : 'MORE DETAILS'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section className="py-16 lg:py-32 px-6 lg:px-12 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center uppercase tracking-widest">
            <h2 className="text-3xl md:text-4xl font-black mb-12 md:mb-16 lg:mb-20 text-brand-white">{t('test_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left normal-case">
              {testData.map((tItem, i) => (
                <div key={i} className="liquid-glass p-6 md:p-10 flex flex-col justify-between hover:-translate-y-2 transition-transform">
                  <p className="text-xs md:text-sm italic text-brand-white mb-6 md:mb-8">"{tItem[lang].text}"</p>
                  <div className="flex items-center space-x-4 border-t border-brand-white/10 pt-5 md:pt-6">
                    <img src={tItem.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full grayscale border border-brand-orange/50" alt={tItem[lang].name} />
                    <div><h5 className="text-[9px] md:text-[10px] font-black uppercase text-brand-orange">{tItem[lang].name}</h5></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section id="nivel" className="py-16 lg:py-24 px-6 lg:px-12 relative border-b border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black uppercase text-brand-white mb-4 md:mb-6">{t('quiz_title')}</h2>
              <p className="text-brand-gray italic leading-relaxed max-w-xl mx-auto lg:mx-0 text-sm md:text-base">
                {t('quiz_desc')}
              </p>
              <div className="w-16 h-1.5 bg-brand-orange shadow-[0_0_15px_rgba(255,72,0,0.6)] mt-6 md:mt-8 mx-auto lg:mx-0"></div>
            </div>
            <div className="lg:col-span-6 mt-4 md:mt-0">
              <div className="liquid-glass p-6 md:p-10">
                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 uppercase text-[10px] md:text-[12px] tracking-widest">
                  {[t('q1'), t('q2'), t('q3')].map((q, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleLevelSelect(i)} 
                      className={`quiz-option liquid-glass w-full flex items-center p-4 md:p-5 rounded-xl text-left transition-all ${selectedLevel === i ? 'active' : ''}`}
                    >
                      <div className="dot w-3.5 h-3.5 border border-white/20 rounded-full mr-3 md:mr-4 shrink-0 transition-all"></div>
                      <span className="text-brand-white font-bold leading-tight">{q}</span>
                    </button>
                  ))}
                </div>
                <button onClick={handleQuizSubmit} className="force-orange-bg w-full py-4 md:py-5 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em]">
                  {t('q_btn')}
                </button>
                <p className="text-[8px] md:text-[10px] text-brand-gray mt-5 md:mt-6 text-center uppercase tracking-widest">
                  {t('q_note')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor */}
        <section id="instrutor" className="py-16 lg:py-32 px-6 lg:px-12 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="space-y-6 md:space-y-8 lg:space-y-10 text-center lg:text-left">
              <span className="bg-brand-orange text-black px-4 md:px-5 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full inline-block">{t('mentor_tag')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter italic leading-none text-brand-white">LEANDRO <span className="text-brand-orange drop-shadow-[0_0_10px_rgba(255,72,0,0.5)]">LAMEZI</span></h2>
              <div className="space-y-4 lg:space-y-6 text-brand-gray italic leading-relaxed max-w-xl mx-auto lg:mx-0 text-sm lg:text-base p-6 md:p-8 liquid-glass text-left">
                <p>{t('m1')}</p>
                <p>{t('m2')}</p>
                <p>{t('m3')}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4 md:mt-0">
              <div className="liquid-glass-heavy p-3 pb-8 md:p-4 md:pb-12 lg:rotate-2 hover:rotate-0 transition-transform duration-500 w-full max-w-sm md:max-w-md">
                <img src="https://cardeal.tv/wp-content/uploads/2026/02/ChatGPT-Image-5-de-fev.-de-2026-14_51_48.png" className="w-full rounded-xl shadow-2xl" alt="Foto de Leandro Lamezi" />
              </div>
            </div>
          </div>
        </section>

        {/* Preços */}
        <section id="precos" className="py-16 lg:py-32 px-6 lg:px-12 relative border-t border-white/5">
          <div className="max-w-[1400px] mx-auto text-center">
            
            <div className="mb-8 md:mb-12">
              {selectedLevel !== null ? (
                <div className="liquid-glass p-4 md:p-6 inline-block mb-4 md:mb-6">
                  <p className="text-brand-white italic text-sm md:text-base lg:text-lg leading-relaxed animate-in fade-in slide-in-from-top-4">
                    "{welcomeMessages[lang][selectedLevel]}"
                  </p>
                </div>
              ) : (
                <div className="liquid-glass p-4 md:p-6 inline-block mb-4 md:mb-6">
                  <p className="text-brand-gray italic text-sm md:text-base lg:text-lg leading-relaxed animate-in fade-in slide-in-from-top-4">
                    "{lang === 'pt' ? 'Escolha seu nível no quiz para receber uma recomendação.' : 'Choose your level in the quiz to receive a recommendation.'}"
                  </p>
                </div>
              )}
            </div>
            
            {/* Features Topo */}
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-10 text-[9px] md:text-[10px] uppercase tracking-widest text-brand-gray">
              <span className="flex items-center justify-center bg-black/50 border border-brand-orange/30 rounded-full px-4 py-2"><Check className="w-3 h-3 text-brand-orange mr-2" /><span>{t('p_f1')}</span></span>
              <span className="flex items-center justify-center bg-black/50 border border-brand-orange/30 rounded-full px-4 py-2"><Check className="w-3 h-3 text-brand-orange mr-2" /><span>{t('p_f2')}</span></span>
              <span className="flex items-center justify-center bg-black/50 border border-brand-orange/30 rounded-full px-4 py-2"><Check className="w-3 h-3 text-brand-orange mr-2" /><span>{t('p_f3')}</span></span>
              <span className="flex items-center justify-center bg-black/50 border border-brand-orange/30 rounded-full px-4 py-2"><Check className="w-3 h-3 text-brand-orange mr-2" /><span>{t('p_f4')}</span></span>
            </div>

            {/* Desconto */}
            <div className="flex justify-center mb-10 md:mb-12 lg:mb-16">
              <div className="border border-brand-orange text-brand-orange px-6 py-2 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,72,0,0.2)]">
                <span>{t('ex_aluno_discount')}</span>
              </div>
            </div>

            {/* Cards Pricing Dinâmicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left items-stretch max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.id} className={`${plan.isPopular ? 'liquid-glass-heavy transform lg:scale-105 z-10 border border-brand-orange/30 bg-black/90 shadow-[0_15px_40px_rgba(255,72,0,0.15)] mt-4 lg:mt-0' : 'liquid-glass bg-black/80'} p-6 md:p-8 lg:p-10 flex flex-col hover:-translate-y-2 transition-transform duration-300 relative`}>
                  {plan.isPopular && (
                    <>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-brand-orange shadow-[0_0_15px_rgba(255,72,0,0.8)] rounded-b-md"></div>
                      <div className="absolute top-4 right-4 md:top-6 md:right-6"><Star className="w-5 h-5 text-brand-orange fill-brand-orange drop-shadow-[0_0_5px_rgba(255,72,0,0.8)]" /></div>
                    </>
                  )}
                  
                  <h4 className={`text-[11px] md:text-[12px] font-black ${plan.isPopular ? 'text-brand-orange' : 'text-brand-gray'} mb-3 md:mb-4 uppercase tracking-widest`}>
                    {lang === 'pt' ? plan.namePt : plan.nameEn}
                  </h4>
                  <p className="text-[11px] md:text-[12px] text-brand-gray mb-6 md:mb-8 min-h-[40px]">
                    {lang === 'pt' ? plan.descPt : plan.descEn}
                  </p>
                  <div className="mb-8 md:mb-10 text-brand-white flex items-baseline">
                    <span className={`text-3xl md:text-4xl lg:text-5xl font-black ${plan.isPopular ? 'drop-shadow-lg' : ''}`}>
                      {lang === 'pt' ? plan.priceBRL : plan.priceUSD}
                    </span>
                    <span className={`${plan.isPopular ? 'text-brand-orange font-bold' : 'text-brand-gray'} text-xs ml-2`}>
                      {lang === 'pt' ? plan.sufPt : plan.sufEn}
                    </span>
                  </div>
                  <ul className={`space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1 ${plan.isPopular ? 'text-brand-white' : 'text-brand-gray'} text-xs`}>
                    {(lang === 'pt' ? plan.featuresPt : plan.featuresEn).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 text-brand-orange mr-3 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowWaitlistModal(true)} className={`${plan.isPopular ? 'force-orange-bg' : 'liquid-glass border border-white/10 bg-black/40 hover:bg-brand-white hover:text-black'} w-full py-4 md:py-5 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all`}>
                    {plan.isPopular ? t('buy_btn2') : t('buy_btn')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 lg:py-32 px-6 lg:px-12 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12 md:mb-16 lg:mb-24 uppercase text-brand-white">{t('faq_title')}</h2>
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
              <div className="w-full lg:col-span-7 space-y-3 md:space-y-4">
                {faqsData.map((f, i) => (
                  <div key={i} className={`faq-item liquid-glass ${activeFaq === i ? 'active' : ''}`}>
                    <button onClick={() => toggleFaq(i)} className="w-full px-5 py-4 md:px-8 md:py-6 flex items-center justify-between text-[9px] md:text-[11px] text-left text-brand-white hover:text-brand-orange uppercase font-black clean-btn transition-colors bg-transparent border-none">
                      <span className="pr-3 md:pr-4 leading-relaxed">{f[lang].q}</span>
                      <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-brand-orange shrink-0 transition-transform duration-300" />
                    </button>
                    <div className="faq-answer px-5 md:px-8">
                      <p className="text-brand-gray text-[10px] md:text-xs leading-relaxed pb-5 md:pb-8 italic uppercase">{f[lang].a}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="w-full lg:col-span-5 lg:sticky lg:top-[120px] self-start mt-8 md:mt-0">
                <div className="liquid-glass-heavy p-6 md:p-8 lg:p-12 text-center flex flex-col items-center">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover mb-4 md:mb-6 lg:mb-8 border-2 border-brand-orange/50 shadow-[0_0_20px_rgba(255,72,0,0.3)] grayscale" alt="Atendimento" />
                  <p className="text-brand-gray italic text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 lg:mb-10">{t('faq_box')}</p>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="liquid-glass border-brand-orange/50 w-full py-4 md:py-5 lg:py-6 rounded-2xl font-black uppercase text-[9px] md:text-[10px] lg:text-xs flex items-center justify-center space-x-2 md:space-x-3 lg:space-x-4 hover:bg-brand-orange hover:text-black transition-all group text-brand-white">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-brand-white group-hover:text-black" />
                    <span>{t('faq_btn')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-16 lg:pt-32 pb-6 md:pb-8 lg:pb-12 px-6 lg:px-12 border-t border-white/5 text-brand-gray uppercase tracking-widest relative">
        <div className="max-w-7xl mx-auto liquid-glass p-6 md:p-8 lg:p-12 mb-6 md:mb-8 lg:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-16 text-[10px] md:text-[11px]">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6 lg:mb-8">
                <img src="https://cardeal.tv/wp-content/uploads/2026/03/LL_laranja-1.png" className="w-7 md:w-8 lg:w-10" alt="Logo Lamezi" />
                <span className="text-brand-white font-black text-base md:text-lg lg:text-xl tracking-tighter">LEANDRO LAMEZI</span>
              </div>
              <p className="text-[11px] md:text-xs lg:text-sm leading-relaxed max-w-sm mb-6 lg:mb-10 normal-case lowercase text-brand-gray">{t('footer_desc')}</p>
              <div className="flex space-x-5 md:space-x-6">
                <a href="#" className="hover:text-brand-orange"><Instagram className="w-5 h-5 text-brand-gray hover:text-brand-orange" /></a>
                <a href="#" className="hover:text-brand-orange"><Youtube className="w-5 h-5 text-brand-gray hover:text-brand-orange" /></a>
              </div>
            </div>
            <div>
              <h5 className="text-brand-white font-black mb-4 md:mb-6 lg:mb-10">{t('footer_p1')}</h5>
              <ul className="space-y-3 lg:space-y-4 font-medium lowercase">
                <li><a href="#aprender" className="hover:text-brand-orange">{t('nav_aulas')}</a></li>
                <li><a href="#instrutor" className="hover:text-brand-orange">{t('nav_mentor')}</a></li>
                <li><a href="#precos" className="hover:text-brand-orange">{t('nav_planos')}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-brand-white font-black mb-4 md:mb-6 lg:mb-10">{t('footer_p2')}</h5>
              <ul className="space-y-3 lg:space-y-4 font-medium lowercase">
                <li><a href="#faq" className="hover:text-brand-orange">{t('nav_duvidas')}</a></li>
                <li><a href="#" className="hover:text-brand-orange">{t('footer_priv')}</a></li>
                <li><a href="#" className="hover:text-brand-orange">{t('footer_term')}</a></li>
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-span-4 lg:col-span-1 mt-4 md:mt-6 lg:mt-0">
              <h5 className="text-brand-white font-black mb-4 md:mb-6 lg:mb-10">Mobile</h5>
              <div className="flex flex-row sm:flex-col gap-3 md:gap-4 lg:space-y-4 lg:gap-0">
                <button className="liquid-glass p-2 md:p-3 flex items-center space-x-2 md:space-x-3 w-full max-w-[140px] md:max-w-[160px] lg:w-44 hover:border-brand-orange bg-transparent">
                  <Apple className="w-4 h-4 lg:w-5 lg:h-5 text-brand-white" />
                  <div className="text-left leading-none"><p className="text-[6px] lg:text-[7px] opacity-50 mb-1">{t('down_app')}</p><p className="text-[9px] lg:text-[10px] font-black text-brand-white">App Store</p></div>
                </button>
                <button className="liquid-glass p-2 md:p-3 flex items-center space-x-2 md:space-x-3 w-full max-w-[140px] md:max-w-[160px] lg:w-44 hover:border-brand-orange bg-transparent">
                  <Play className="w-4 h-4 lg:w-5 lg:h-5 text-brand-white" />
                  <div className="text-left leading-none"><p className="text-[6px] lg:text-[7px] opacity-50 mb-1">{t('down_play')}</p><p className="text-[9px] lg:text-[10px] font-black text-brand-white">Google Play</p></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] font-black gap-3 md:gap-4 lg:gap-8 text-center md:text-left">
          <p>© 2026 LEANDRO LAMEZI • HIGH-END COLOR LAB • TODOS OS DIREITOS RESERVADOS</p>
          <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-12 opacity-50 justify-center">
            <span className="flex items-center"><ShieldCheck className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-brand-orange" /> SSL SECURE</span>
            <span className="flex items-center"><CreditCard className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-brand-orange" /> PAGAMENTO SEGURO</span>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className={`fixed bottom-[100px] right-[30px] bg-black/60 backdrop-blur-md border border-white/20 text-white w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 z-[999] hover:bg-brand-orange hover:text-black cursor-pointer ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      
      <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="fixed bottom-[30px] right-[30px] z-[999] transition-transform duration-300 hover:scale-110">
        <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#25D366] rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] group overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
