import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Play, 
  Settings, 
  ArrowLeft, 
  Video, 
  Tag, 
  LogOut, 
  Star,
  ChevronRight,
  User,
  Layout,
  MessageCircle,
  Clock,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  theme_tag: string;
  created_at: string;
}

export default function Portal() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todas');

  const fetchLessons = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('mentoria_lessons')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLessons(data);
      if (data.length > 0 && !selectedLesson) {
        setSelectedLesson(data[0]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const getVideoEmbedUrl = (url: string) => {
    const ytId = getYoutubeId(url);
    if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1`;
    
    const vimeoId = getVimeoId(url);
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    
    return url;
  };

  const getThumbnail = (url: string) => {
    const ytId = getYoutubeId(url);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    return 'https://cardeal.tv/wp-content/uploads/2026/03/LL_laranja-1.png';
  };

  const filteredLessons = lessons.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         l.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'Todas' || l.theme_tag === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const uniqueTags = ['Todas', ...Array.from(new Set(lessons.map(l => l.theme_tag)))];

  const handleLogout = () => {
    window.location.href = 'https://www.leandrolamezi.com.br/mentoria';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="https://cardeal.tv/wp-content/uploads/2026/03/LL_laranja-1.png" className="w-12 h-12 mb-4 animate-pulse" alt="Logo" />
          <p className="text-brand-gray text-[10px] uppercase tracking-[0.2em] animate-pulse">CarregandoPortal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-brand-white font-futura selection:bg-brand-orange selection:text-black">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 liquid-glass-heavy border-r border-white/5 z-50 hidden lg:flex flex-col">
        <div className="p-8 pb-12 flex items-center space-x-3">
          <a href="https://www.leandrolamezi.com.br/mentoria" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src="https://cardeal.tv/wp-content/uploads/2026/03/LL_laranja-1.png" className="w-7 h-7" alt="Logo" />
            <span className="text-sm font-black tracking-tighter uppercase">Leandro Lamezi</span>
          </a>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20 transition-all font-bold text-xs uppercase tracking-widest">
            <Layout className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-brand-gray hover:text-brand-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest group">
            <Video className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
            <span>Minhas Aulas</span>
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-brand-gray hover:text-brand-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest group">
            <MessageCircle className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
            <span>Comunidade</span>
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-brand-gray hover:text-brand-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest group">
            <Clock className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
            <span>Lives</span>
          </button>
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/40">
          <div className="flex items-center space-x-3 mb-6 p-2 liquid-glass">
            <div className="w-10 h-10 rounded-full force-orange-bg flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-black" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[10px] font-black uppercase truncate">Sócio (Teste)</p>
              <p className="text-[9px] text-brand-gray truncate">Plano Black</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-white/10 text-brand-gray hover:text-red-500 hover:border-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <LogOut className="w-3 h-3" />
            <span>Sair do Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 min-h-screen relative">
        {/* Top Header */}
        <header className="sticky top-0 z-40 px-6 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center lg:hidden space-x-3">
             <a href="https://www.leandrolamezi.com.br/mentoria">
               <img src="https://cardeal.tv/wp-content/uploads/2026/03/LL_laranja-1.png" className="w-6 h-6" alt="Logo" />
             </a>
          </div>

          <div className="relative flex-1 max-w-xl mx-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
            <input 
              type="text" 
              placeholder="Pesquisar aulas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2.5 text-xs text-white focus:outline-none focus:border-brand-orange transition-colors"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-brand-orange/10 border border-brand-orange/20 rounded-full px-4 py-2">
              <Star className="w-3 h-3 text-brand-orange fill-brand-orange" />
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange">VIP ACCESS</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-full border border-white/10 text-brand-gray hover:text-brand-white transition-colors lg:hidden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Video Player Section */}
        {selectedLesson && (
          <section className="p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Aspect ratio container for video */}
              <div className="w-full aspect-video rounded-[32px] overflow-hidden liquid-glass p-2 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] mb-8">
                <div className="w-full h-full bg-black rounded-[24px] overflow-hidden relative">
                   <iframe 
                    src={getVideoEmbedUrl(selectedLesson.video_url)} 
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-12 items-start">
                {/* Lesson Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-brand-orange px-3 py-1 rounded-full text-[9px] font-black uppercase text-black">
                          {selectedLesson.theme_tag}
                        </span>
                        <span className="text-[9px] text-brand-gray uppercase tracking-widest">
                          Adicionada em {new Date(selectedLesson.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase">{selectedLesson.title}</h1>
                    </div>
                  </div>
                  
                  <div className="liquid-glass p-6 md:p-8 space-y-4">
                    <h3 className="text-xs font-black uppercase text-brand-orange flex items-center">
                      <Layout className="w-4 h-4 mr-2" />
                      Sobre esta aula
                    </h3>
                    <p className="text-brand-gray text-sm md:text-base leading-relaxed italic border-l-2 border-brand-orange/30 pl-4 whitespace-pre-wrap">
                      {selectedLesson.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button className="force-orange-bg px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-brand-orange/20">
                      <MessageCircle className="w-4 h-4" />
                      <span>Comentar Aula</span>
                    </button>
                    <button className="liquid-glass border border-white/10 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2 hover:bg-white/5 transition-all">
                      <Star className="w-4 h-4" />
                      <span>Favoritar</span>
                    </button>
                    <button className="liquid-glass border border-white/10 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2 hover:bg-white/5 transition-all">
                      <ExternalLink className="w-4 h-4" />
                      <span>Materiais Extra</span>
                    </button>
                  </div>
                </div>

                {/* Playlist / Sidebar */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-widest flex items-center">
                      <Video className="w-4 h-4 text-brand-orange mr-2" />
                      Próximas Aulas
                    </h2>
                    <span className="text-[10px] text-brand-gray font-bold">{filteredLessons.length} Aulas</span>
                  </div>

                  {/* Filter Tags */}
                  <div className="flex flex-wrap gap-2">
                    {uniqueTags.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                          activeFilter === tag 
                          ? 'force-orange-bg text-black shadow-lg shadow-brand-orange/20' 
                          : 'bg-white/5 text-brand-gray hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                    {filteredLessons.map((lesson) => (
                      <button 
                        key={lesson.id}
                        onClick={() => {
                          setSelectedLesson(lesson);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full group text-left p-3 rounded-2xl transition-all border ${
                          selectedLesson.id === lesson.id 
                          ? 'bg-brand-orange/10 border-brand-orange/30' 
                          : 'bg-white/5 border-transparent hover:bg-white/10'
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="w-32 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0 relative group">
                            <img 
                              src={getThumbnail(lesson.video_url)} 
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                              alt={lesson.title} 
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                          </div>
                          <div className="flex-1 overflow-hidden py-1">
                            <p className={`text-[8px] font-black uppercase tracking-widest mb-1 ${
                              selectedLesson.id === lesson.id ? 'text-brand-orange' : 'text-brand-gray'
                            }`}>
                              {lesson.theme_tag}
                            </p>
                            <h4 className="text-[10px] md:text-xs font-black uppercase leading-tight line-clamp-2">
                              {lesson.title}
                            </h4>
                          </div>
                        </div>
                      </button>
                    ))}

                    {filteredLessons.length === 0 && (
                      <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <Video className="w-8 h-8 text-brand-gray mx-auto mb-4 opacity-20" />
                        <p className="text-[10px] uppercase tracking-widest text-brand-gray">Nenhuma aula encontrada</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
