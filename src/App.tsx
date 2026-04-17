/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Library, 
  Search, 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  ChevronRight, 
  Book, 
  School,
  ArrowRightLeft,
  Info,
  CheckCircle2,
  X,
  Menu,
  MessageSquare,
  Volume2,
  VolumeX,
  Send,
  Loader2,
  PlayCircle,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { GoogleGenAI, Modality, ThinkingLevel } from "@google/genai";
import { allBooks, Book as BookType, detailedBooks } from './data/books';
import { expandedDictionary } from './data/dictionaryService';
import { unitCategories, convertUnits } from './data/units';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [activeTab, setActiveTab] = useState<'library' | 'dictionary' | 'converter' | 'teacher'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Gamification state
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [completedBooks, setCompletedBooks] = useState<string[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  React.useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) {
      alert("Para instalar, abra este link diretamente no seu navegador (Safari no iOS ou Chrome no Android) e use a opção 'Adicionar à Tela de Início'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  // Search results for Library
  const filteredBooks = useMemo(() => {
    let base = allBooks;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      base = allBooks.filter(book => 
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.theme.toLowerCase().includes(q) ||
        book.keywords.some(k => k.toLowerCase().includes(q))
      );
    }
    return base.sort((a, b) => (a.level || 0) - (b.level || 0));
  }, [searchQuery]);

  // Search results for Dictionary
  const filteredTerms = useMemo(() => {
    if (!searchQuery) return expandedDictionary.slice(0, 50); // Show first 50 initially
    const q = searchQuery.toLowerCase();
    return expandedDictionary.filter(t => 
      t.word.toLowerCase().includes(q) || 
      t.definition.toLowerCase().includes(q)
    ).slice(0, 100);
  }, [searchQuery]);

  const addXP = (amount: number) => {
    setUserXP(prev => {
      const next = prev + amount;
      if (next >= userLevel * 500) {
        setUserLevel(l => l + 1);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gb-bg font-sans text-gb-text-main">
      {/* Sidebar - Geometric Balance Aside */}
      <aside className="hidden md:flex flex-col w-[280px] bg-gb-sidebar text-white shadow-xl flex-shrink-0">
        <div className="p-8 pb-4">
          <div className="text-xl font-extrabold tracking-tighter flex items-center gap-2">
            <span className="text-gb-accent">CHEM</span>LIB ACADEMY
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2 p-4 pt-8">
          {/* XP Bar in Sidebar */}
          <div className="px-4 mb-8">
            <div className="flex justify-between items-center text-[10px] font-bold text-gb-accent uppercase tracking-widest mb-2">
              <span>Nível {userLevel}</span>
              <span>{userXP} / {userLevel * 500} XP</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gb-accent transition-all duration-1000" 
                style={{ width: `${(userXP / (userLevel * 500)) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="px-4 text-[11px] uppercase tracking-widest text-[#64748B] mb-2">Monitoramento</h3>
          <button 
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'library' ? 'bg-gb-accent text-white shadow-lg shadow-gb-accent/20' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}
          >
            <Library size={18} /> Biblioteca
          </button>
          <button 
            onClick={() => setActiveTab('dictionary')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'dictionary' ? 'bg-gb-accent text-white shadow-lg shadow-gb-accent/20' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}
          >
            <Book size={18} /> Dicionário
          </button>
          <button 
            onClick={() => setActiveTab('converter')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'converter' ? 'bg-gb-accent text-white shadow-lg shadow-gb-accent/20' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}
          >
            <Calculator size={18} /> Conversor
          </button>
          <button 
            onClick={() => setActiveTab('teacher')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'teacher' ? 'bg-gb-accent text-white shadow-lg shadow-gb-accent/20' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}
          >
            <MessageSquare size={18} /> Professor IA
          </button>
        </nav>

        <div className="p-8 border-t border-white/5 opacity-50 text-[10px] space-y-1">
          <p>Acesso Acadêmico v2.4.0</p>
          <p>© 2024 Biblioteca de Ciência</p>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden bg-gb-sidebar p-4 flex justify-between items-center text-white sticky top-0 z-50">
        <div className="text-lg font-extrabold tracking-tighter">
          <span className="text-gb-accent">CHEM</span>LIB
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden bg-gb-sidebar text-[#94A3B8] overflow-hidden flex flex-col border-t border-white/5"
          >
            {['library', 'dictionary', 'converter', 'teacher'].map((t) => (
              <button 
                key={t}
                onClick={() => { setActiveTab(t as any); setIsMobileMenuOpen(false); }}
                className={`p-4 text-left font-semibold uppercase tracking-widest text-xs border-b border-white/5 ${activeTab === t ? 'text-gb-accent' : ''}`}
              >
                {t === 'library' ? 'Biblioteca' : t === 'dictionary' ? 'Dicionário' : t === 'converter' ? 'Conversor' : 'Professor IA'}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 flex flex-col gap-8">
        {/* Header Search - Matching Geometric Balance Style */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gb-border flex items-center gap-4 transition-focus focus-within:ring-2 focus-within:ring-gb-accent/30">
          <Search className="text-gb-text-dim" size={20} />
          <input 
            type="text"
            placeholder="Pesquisar por autor, livro, tema ou palavras-chave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent"
          />
        </div>

        {activeTab === 'library' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { val: '1.010', lbl: 'Acervo Acadêmico' },
                { val: '10', lbl: 'Módulos Didáticos Premium' },
                { val: '1.000', lbl: 'Tratados e Guias' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border-l-4 border-l-gb-accent shadow-sm">
                  <div className="text-3xl font-bold text-gb-text-main">{s.val}</div>
                  <div className="text-xs font-semibold text-gb-text-dim uppercase tracking-wider mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Módulos Didáticos */}
            {(!searchQuery || filteredBooks.some(b => b.type === 'detailed')) && (
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Módulos Didáticos (8ª a 12ª Classe)</h3>
                  <span className="text-xs font-bold text-gb-accent uppercase tracking-widest cursor-pointer hover:underline">
                    Ver todos os {detailedBooks.length} módulos
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredBooks.filter(b => b.type === 'detailed').map(book => {
                    const isLocked = book.requiredXP > userXP;
                    return (
                      <div key={book.id} className="relative">
                        <BookCard 
                          book={book} 
                          onClick={() => !isLocked && setSelectedBook(book)} 
                        />
                        {isLocked && (
                          <div className="absolute inset-0 bg-gb-sidebar/80 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center text-white p-4 text-center">
                            <ArrowRightLeft className="mb-2 opacity-50" size={24} />
                            <div className="text-[10px] font-bold uppercase tracking-widest">Bloqueado</div>
                            <div className="text-[9px] opacity-70 mt-1">Requer {book.requiredXP} XP</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Guias Gerais */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Guias Gerais de Referência</h3>
                <span className="text-xs font-bold text-gb-accent uppercase tracking-widest">
                  Mostrando {Math.min(filteredBooks.filter(b => b.type === 'guide').length, 12)} de {filteredBooks.filter(b => b.type === 'guide').length}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {filteredBooks.filter(b => b.type === 'guide').slice(0, 50).map(book => (
                  <div 
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    className="bg-white p-4 rounded-xl border border-gb-border flex justify-between items-center text-sm hover:border-gb-accent transition-colors cursor-pointer group"
                  >
                    <span className="font-semibold text-gb-text-main group-hover:text-gb-accent truncate mr-4">{book.title}</span>
                    <span className="text-[11px] text-gb-text-dim flex-shrink-0 uppercase tracking-tighter">{book.author}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* PWA Install Banner */}
            <section className="pt-10 pb-20">
              <div className="bg-gb-sidebar p-8 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gb-accent/20 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gb-accent rounded-full blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gb-accent border border-white/10">
                    <FlaskConical size={12} /> Aplicativo Oficial
                  </div>
                  <h3 className="text-2xl font-black italic tracking-tighter">TRANSFERIR PARA O TELEMÓVEL</h3>
                  <p className="text-white/70 text-sm max-w-md leading-relaxed">
                    Instale a versão completa como um <span className="text-gb-accent font-bold">WebAPK</span>. 
                    Experiência nativa, carregamento instantâneo e acesso direto da tela inicial, como um aplicativo de sistema.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 relative z-10">
                  <button 
                    onClick={installPWA}
                    className="bg-gb-accent text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-white hover:text-gb-sidebar transition-all shadow-[0_0_30px_-5px_var(--color-gb-accent)] hover:shadow-white/20 active:scale-95 group"
                  >
                    <ArrowRightLeft className="rotate-90 group-hover:scale-110 transition-transform" size={24} />
                    INSTALAR AGORA
                  </button>
                  <div className="flex gap-4 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" className="h-6 w-auto" alt="Android" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-6 w-auto brightness-200" alt="iOS" />
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gb-bg rounded-xl border border-dashed border-gb-border text-center">
                <p className="text-[10px] text-gb-text-dim font-medium">
                  Nota: No Android será instalado como um <span className="font-bold">APK Inteligente</span>. No iOS, será adicionado como um <span className="font-bold">App Standalone</span>. 
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'dictionary' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="space-y-2">
              <h2 className="text-2xl font-bold">Dicionário Químico Avançado</h2>
              <p className="text-gb-text-dim text-sm">Glossário acadêmico com resumos teóricos e exemplos práticos.</p>
            </header>
            <div className="grid grid-cols-1 gap-6">
              {filteredTerms.map((term) => (
                <div key={term.word} className="bg-white p-8 rounded-2xl border border-gb-border shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gb-accent/10 flex items-center justify-center text-gb-accent">
                      <FlaskConical size={18} />
                    </div>
                    <h4 className="font-bold text-gb-text-main text-lg uppercase tracking-tight">{term.word}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gb-accent uppercase tracking-widest">Definição Técnica</label>
                      <p className="text-sm text-gb-text-main leading-relaxed">{term.definition}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gb-accent uppercase tracking-widest">Resumo Didático</label>
                      <p className="text-sm text-gb-text-dim italic leading-relaxed">{term.summary}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gb-bg p-4 rounded-xl border border-dashed border-gb-border">
                    <label className="text-[10px] font-bold text-gb-text-dim uppercase tracking-widest block mb-2">Exemplo de Aplicação</label>
                    <code className="text-[13px] font-mono text-gb-sidebar">{term.example}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'converter' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="space-y-2">
              <h2 className="text-2xl font-bold">Conversor de Unidades</h2>
              <p className="text-gb-text-dim text-sm">Ferramenta de precisão para grandezas.</p>
            </header>
            <UnitConverter />
          </div>
        )}

        {activeTab === 'teacher' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 h-full flex flex-col">
            <header className="space-y-2 flex-shrink-0">
              <h2 className="text-2xl font-bold">Professor de Química IA</h2>
              <p className="text-gb-text-dim text-sm">Diálogo didático, resoluções passo a passo e recomendações de vídeos.</p>
            </header>
            <ChemistryTeacher 
              onSelectBook={setSelectedBook} 
              onSwitchTab={setActiveTab} 
            />
          </div>
        )}
      </main>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookDetailModal 
            book={selectedBook} 
            onClose={() => setSelectedBook(null)} 
            onComplete={() => {
              addXP(100);
              if (!completedBooks.includes(selectedBook.id)) {
                setCompletedBooks(prev => [...prev, selectedBook.id]);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface BookCardProps {
  book: BookType;
  onClick: () => void;
  key?: React.Key;
}

function BookCard({ book, onClick }: BookCardProps) {
  const getIcon = () => {
    if (book.theme.includes('Orgânica')) return '⚛️';
    if (book.theme.includes('Inorgânica')) return '🧪';
    if (book.theme.includes('Matéria')) return '🧊';
    if (book.theme.includes('Termo')) return '🔥';
    return '⚖️';
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl border border-gb-border overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="h-[140px] bg-[#E2E8F0] flex items-center justify-center text-4xl relative">
        {getIcon()}
        {book.type === 'detailed' && (
          <div className="absolute top-2 right-2 bg-gb-accent text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest shadow-sm">
            EXERCÍCIOS
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          <h3 className="text-[13px] font-bold text-gb-text-main leading-tight line-clamp-2 h-8 group-hover:text-gb-accent">
            {book.title}
          </h3>
          <p className="text-[11px] text-gb-text-dim uppercase tracking-tighter">
            {book.grade ? `${book.grade}ª Classe` : 'Ref'} • {book.author.split(' ').pop()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function BookDetailModal({ book, onClose, onComplete }: { book: BookType, onClose: () => void, onComplete: () => void }) {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const toggleAnswer = (i: number) => {
    if (!showAnswers[i]) {
      setCompletedExercises(prev => prev.includes(i) ? prev : [...prev, i]);
    }
    setShowAnswers(s => ({...s, [i]: !s[i]}));
  };

  const isDone = completedExercises.length === (book.exercises?.length || 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gb-sidebar/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-gb-border"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-gb-accent/10 text-gb-accent text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest">
                  Fase {book.level} • {book.grade ? `${book.grade}ª Classe` : 'Referência'}
                </span>
                {isDone && (
                  <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 size={10} /> Concluído
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gb-text-main tracking-tight">{book.title}</h2>
              <p className="text-sm text-gb-text-dim">Por {book.author}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gb-bg rounded-lg text-gb-text-dim"><X /></button>
          </div>

          <div className="space-y-6">
            <div className="bg-gb-bg p-8 rounded-2xl border border-gb-border text-sm text-gb-text-main leading-relaxed prose prose-slate max-w-none">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {book.content || "Este manual contém diretrizes acadêmicas avançadas e referências bibliográficas essenciais para o curso de ciência."}
              </ReactMarkdown>
            </div>

            {book.exercises && book.exercises.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-gb-text-dim">Desafios da Fase ({completedExercises.length}/{book.exercises.length})</h4>
                  <div className="text-[10px] font-bold text-gb-accent">Ganhe +{book.exercises.reduce((acc, curr) => acc + curr.points, 0)} XP</div>
                </div>
                {book.exercises.map((ex, i) => (
                  <div key={i} className={`p-5 rounded-2xl border transition-all ${completedExercises.includes(i) ? 'bg-green-50 border-green-200' : 'bg-white border-gb-border shadow-sm'}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="font-semibold text-sm flex-1">
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{ex.question}</ReactMarkdown>
                      </div>
                      <div className="text-[10px] font-black text-gb-accent bg-gb-accent/10 px-2 py-1 rounded">+{ex.points} XP</div>
                    </div>
                    
                    <button 
                      onClick={() => toggleAnswer(i)}
                      className="mt-4 text-xs font-bold text-gb-accent uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                      {showAnswers[i] ? 'Ocultar Resposta' : 'Revelar Solução'}
                    </button>
                    
                    <AnimatePresence>
                      {showAnswers[i] && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 p-4 bg-white rounded-xl border border-green-100 text-[13px] text-green-900 shadow-inner">
                            <strong className="text-green-700 block mb-1">Gabarito:</strong> 
                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{ex.answer}</ReactMarkdown>
                            <div className="mt-2 text-xs opacity-80 leading-relaxed italic border-t border-green-100 pt-2">
                              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{ex.explanation}</ReactMarkdown>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
            
            {isDone && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  onComplete();
                  onClose();
                }}
                className="w-full py-4 bg-gb-accent text-white rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-gb-accent/20 hover:scale-[1.02] transition-all"
              >
                Resgatar Recompensas e Finalizar
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState(unitCategories[0]);
  const [inputVal, setInputVal] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState(selectedCategory.units[0].value);
  const [toUnit, setToUnit] = useState(selectedCategory.units[1].value);

  const result = useMemo(() => {
    return convertUnits(inputVal, fromUnit, toUnit, selectedCategory.name);
  }, [inputVal, fromUnit, toUnit, selectedCategory]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl border border-gb-border shadow-sm max-w-4xl">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-48 space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gb-text-dim mb-4">Grandeza</h4>
          {unitCategories.map(cat => (
            <button 
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat);
                setFromUnit(cat.units[0].value);
                setToUnit(cat.units[1].value);
              }}
              className={`w-full text-left p-3 rounded-lg text-sm font-semibold transition-all ${
                selectedCategory.name === cat.name 
                  ? 'bg-gb-sidebar text-white' 
                  : 'text-gb-text-dim hover:bg-gb-bg'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gb-text-dim">Entrada</label>
              <div className="flex gap-2">
                <input 
                  type="number"
                  value={inputVal}
                  onChange={(e) => setInputVal(Number(e.target.value))}
                  className="w-full p-4 bg-gb-bg border border-transparent rounded-xl focus:bg-white focus:border-gb-accent outline-none font-bold transition-all"
                />
                <select 
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="bg-white border border-gb-border rounded-xl px-2 outline-none text-xs font-bold w-32"
                >
                  {selectedCategory.units.map(u => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gb-text-dim">Conversão</label>
              <div className="flex gap-2">
                <div className="w-full p-4 bg-gb-accent text-white rounded-xl font-bold flex justify-between items-center min-w-[200px]">
                  <span>{result.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}</span>
                  <span className="text-[10px] opacity-70 ml-2">{toUnit}</span>
                </div>
                <select 
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="bg-white border border-gb-border rounded-xl px-2 outline-none text-xs font-bold w-32"
                >
                  {selectedCategory.units.map(u => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gb-bg rounded-xl border border-gb-border flex items-center gap-3 text-xs text-gb-text-dim">
            <Info size={14} />
            Cálculo instantâneo baseado em padrões SI internacionais.
          </div>
        </div>
      </div>
    </div>
  );
}

function ChemistryTeacher({ 
  onSelectBook, 
  onSwitchTab 
}: { 
  onSelectBook: (book: BookType) => void, 
  onSwitchTab: (tab: 'library' | 'dictionary' | 'converter' | 'teacher') => void 
}) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string, audio?: string, videoUrl?: string, imageUrl?: string, bookRef?: BookType }[]>([
    { role: 'model', text: 'Olá! Sou seu professor de Química. Como posso te ajudar hoje? Posso explicar fórmulas, resolver exercícios passo a passo, recomendar vídeos interessantes ou até gerar imagens didáticas.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const recognitionRef = React.useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e: any) => console.error("Speech Error", e);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInput(text);
        setTimeout(() => sendMessage(text), 500);
      };
      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  const sendMessage = async (overrideInput?: string) => {
    const userMsg = (overrideInput || input).trim();
    if (!userMsg || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user' as const, text: userMsg }].slice(-50));
    setIsLoading(true);

    try {
      const model = "gemini-2.0-flash"; 
      
      // Start resources analysis early if possible
      const stream = await ai.models.generateContentStream({
        model,
        contents: [
          { role: 'user', parts: [{ text: `Professor Acadêmico IA (Química). 
          Foco: Resposta técnica, objetiva, acadêmica. 
          Use Search + LaTeX + Citação de Livros.
          Livros: ${allBooks.map(b => b.title).slice(0, 15).join(',')}
          Pergunta: ${userMsg}` }] }
        ],
        config: {
          temperature: 0.1, // Minimum temperature for maximum speed and precision
          tools: [{ googleSearch: {} }]
        }
      });

      let modelText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of stream) {
        const delta = chunk.text || "";
        if (!delta) continue;
        modelText += delta;
        setMessages(prev => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (updated[lastIdx].text === modelText) return prev;
          updated[lastIdx] = { ...updated[lastIdx], text: modelText };
          return updated;
        });
      }

      setIsLoading(false);
      processResources(modelText);
    } catch (error) {
      console.error("Erro na IA:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Erro na conexão. Tente novamente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const processResources = async (text: string) => {
    setIsProcessing(true);
    
    // Core speed: Parallel detection + AI tasks
    const tasks = [];

    // 1. Resource Detection (Books) - SYNC & FAST
    const foundBook = allBooks.find(b => 
      text.toLowerCase().includes(b.title.toLowerCase()) || 
      (b.keywords && b.keywords.some(k => text.toLowerCase().includes(k.toLowerCase())))
    );
    
    if (foundBook) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], bookRef: foundBook };
        return updated;
      });
    }

    // 2. Image Generation
    const imageMatch = text.match(/\[IMAGE_PROMPT: (.*?)\]/);
    if (imageMatch) {
      const prompt = imageMatch[1];
      tasks.push((async () => {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: [{ parts: [{ text: `Scientific chemistry diagram: ${prompt}. Educational, white background, High Resolution.` }] }],
          });
          
          const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
          if (part?.inlineData) {
            const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { ...updated[updated.length - 1], imageUrl };
              return updated;
            });
          }
        } catch (e) {
          console.error("Erro imagem:", e);
        }
      })());
    }

    // 3. TTS Audio
    if (isAudioEnabled) {
      tasks.push((async () => {
        try {
          const ttsResponse = await ai.models.generateContent({
            model: "gemini-3.1-flash-tts-preview",
            contents: [{ parts: [{ text: text.replace(/\[IMAGE_PROMPT:.*?\]/g, '') }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
            }
          });
          const audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (audio) {
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { ...updated[updated.length - 1], audio };
              return updated;
            });
            playAudio(audio);
          }
        } catch (e) {
          console.error("Erro TTS:", e);
        }
      })());
    }

    await Promise.allSettled(tasks);
    setIsProcessing(false);
  };

  const playAudio = (base64: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        if (audioRef.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(audioRef.current.src);
        }
      }

      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Check for RIFF header (WAV)
      const isWav = binaryString.startsWith('RIFF');
      let finalBlob;

      if (!isWav) {
        // Assume 24kHz Mono 16-bit PCM (Standard Gemini TTS output)
        const header = new ArrayBuffer(44);
        const view = new DataView(header);
        
        view.setUint32(0, 0x52494646, false); // "RIFF"
        view.setUint32(4, 36 + len, true);    // RIFF size
        view.setUint32(8, 0x57415645, false); // "WAVE"
        view.setUint32(12, 0x666d7420, false); // "fmt "
        view.setUint32(16, 16, true);          // fmt chunk size
        view.setUint16(20, 1, true);           // PCM
        view.setUint16(22, 1, true);           // Mono
        view.setUint32(24, 24000, true);       // Sample Rate
        view.setUint32(28, 24000 * 2, true);   // Byte Rate
        view.setUint16(32, 2, true);           // Block Align
        view.setUint16(34, 16, true);          // Bits per sample
        view.setUint32(36, 0x64617461, false); // "data"
        view.setUint32(40, len, true);         // data chunk size

        const combined = new Uint8Array(44 + len);
        combined.set(new Uint8Array(header));
        combined.set(bytes, 44);
        finalBlob = new Blob([combined], { type: 'audio/wav' });
      } else {
        finalBlob = new Blob([bytes], { type: 'audio/wav' });
      }

      const url = URL.createObjectURL(finalBlob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setPlayingAudio(base64);
      
      audio.play().catch(err => {
        console.error("Erro ao reproduzir áudio:", err);
        setPlayingAudio(null);
      });

      audio.onended = () => {
        setPlayingAudio(null);
        URL.revokeObjectURL(url);
      };
    } catch (e) {
      console.error("Audio internal error:", e);
      setPlayingAudio(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl border border-gb-border shadow-sm overflow-hidden h-[600px] mb-8 relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-gb-accent text-white rounded-tr-none shadow-lg shadow-gb-accent/20' 
                : 'bg-gb-bg text-gb-text-main rounded-tl-none border border-gb-border'
            }`}>
              <div className={`text-sm prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ children }) => {
                      const text = String(children);
                      const ytMatch = text.match(/\[(.*?)\]\((https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/.*?)\)/);
                      if (ytMatch) {
                        return (
                          <div className="my-4 p-4 bg-white/10 rounded-xl border border-white/20">
                            <p className="mb-3 opacity-90">{text.replace(/\[.*?\]\(.*?\)/, '')}</p>
                            <a 
                              href={ytMatch[2]} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-gb-sidebar px-4 py-3 rounded-lg hover:bg-gb-accent hover:text-white transition-all shadow-sm"
                            >
                              <PlayCircle size={16} /> Assistir Vídeo: {ytMatch[1]}
                            </a>
                          </div>
                        );
                      }
                      
                      if (text.includes('[IMAGE_PROMPT:')) {
                        const promptFromText = text.match(/\[IMAGE_PROMPT: (.*?)\]/)?.[1];
                        return (
                          <div className="my-4 rounded-xl overflow-hidden border border-gb-border bg-white p-4 space-y-3">
                             <div className="flex items-center gap-2 text-gb-accent font-bold text-[10px] uppercase tracking-widest">
                               <ImageIcon size={14} /> {msg.imageUrl ? 'Esboço Didático Final' : 'Gerando Ilustração...'}
                             </div>
                             <img 
                               src={msg.imageUrl || `https://picsum.photos/seed/${promptFromText?.replace(/\s/g, '')}/800/600`} 
                               alt={promptFromText} 
                               className={`w-full h-auto rounded-lg shadow-inner transition-all duration-700 ${!msg.imageUrl ? 'blur-sm grayscale opacity-50' : 'blur-0 grayscale-0 opacity-100'}`}
                               referrerPolicy="no-referrer"
                             />
                             <p className="text-[10px] text-gb-text-dim italic">
                               {msg.imageUrl ? 'Ilustração científica gerada por IA.' : `Preparando ilustração sobre: ${promptFromText}`}
                             </p>
                          </div>
                        );
                      }
                      
                      return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
                    }
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
              {msg.audio && (
                <button 
                  onClick={() => playAudio(msg.audio!)}
                  className={`mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${
                    playingAudio === msg.audio ? 'text-white pulse' : 'opacity-70'
                  }`}
                >
                  <Volume2 size={14} /> {playingAudio === msg.audio ? 'Ouvindo...' : 'Ouvir novamente'}
                </button>
              )}
              {msg.bookRef && (
                <div className="mt-4 p-3 bg-gb-accent/10 border border-gb-accent/20 rounded-xl flex items-center gap-3">
                  <div className="bg-gb-accent p-2 rounded-lg text-white">
                    <BookOpen size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-gb-accent tracking-widest">Referência Citada</p>
                    <p className="text-xs font-bold text-gb-text-main">{msg.bookRef.title}</p>
                    <button 
                      onClick={() => {
                        onSelectBook(msg.bookRef!);
                        onSwitchTab('library');
                      }}
                      className="text-[9px] font-bold text-gb-accent hover:underline flex items-center gap-1 mt-1"
                    >
                      Ler na biblioteca <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gb-bg border border-gb-border p-4 rounded-2xl animate-pulse">
              <Loader2 className="animate-spin text-gb-accent" size={20} />
            </div>
          </div>
        )}
        {isProcessing && !isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-[10px] text-gray-500 font-bold uppercase tracking-widest border border-gray-200">
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-gb-accent rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-gb-accent rounded-full animate-bounce delay-100"></span>
                <span className="w-1 h-1 bg-gb-accent rounded-full animate-bounce delay-200"></span>
              </div>
              Processando Áudio e Recursos...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gb-border bg-gb-bg/50 flex flex-col gap-3">
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Pergunte sobre uma fórmula, exercício ou tema..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-4 bg-white border border-gb-border rounded-xl focus:ring-2 focus:ring-gb-accent outline-none text-sm"
          />
          <button 
            onClick={() => sendMessage()}
            disabled={isLoading}
            className="bg-gb-sidebar text-white p-4 rounded-xl hover:bg-gb-accent transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
