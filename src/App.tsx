import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Linkedin, 
  Instagram, 
  Mail, 
  Menu,
  X,
  ArrowLeft,
  Target,
  Search,
  Layers,
  Zap,
  Users,
  CreditCard,
  Layout,
  Cpu,
  ExternalLink,
  ArrowUp,
  Send,
  CheckCircle2,
  Loader2,
  Figma,
  Slack,
  Trello,
  FileText,
  Sparkles,
  Code,
  Presentation,
  BookOpen,
  StickyNote,
  Bird,
  Volume2,
  VolumeX
} from 'lucide-react';
import { caseStudies, CaseStudy } from './types';
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'about' | string>('home');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    if (activePage !== 'home') {
      setActiveSection('');
      return;
    }

    const options = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'hero');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    // We need to observe the hero (top), work, and contact sections
    const sections = ['hero', 'work', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Runaway Piano Intro Scroll Effect
  const lastScrollY = useRef(0);
  const noteIndex = useRef(0);
  const lastPlayTime = useRef(0);
  const scrollThreshold = 180; // Pixels per note
  const debounceTime = 250; // ms between notes

  useEffect(() => {
    if (isMuted) return;

    const notes = [1318.51, 1244.51, 1108.73, 880.00, 830.61]; // E6, D#6, C#6, A5, G#5

    const playNote = (freq: number) => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        
        // Create a more piano-like sound with a few harmonics
        const createTone = (f: number, volume: number, decay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          gain.gain.setValueAtTime(volume, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + decay);
        };

        // Fundamental
        createTone(freq, 0.08, 0.6);
        // Harmonics for "piano" character
        createTone(freq * 2, 0.02, 0.3);
        createTone(freq * 3, 0.01, 0.15);
      } catch (e) {
        // Audio might be blocked
      }
    };

    const handleScrollNotes = () => {
      const currentScroll = window.scrollY;
      const now = Date.now();
      
      // Only trigger on downward scroll
      const isDownward = currentScroll > lastScrollY.current;
      const diff = Math.abs(currentScroll - lastScrollY.current);

      if (isDownward && diff >= scrollThreshold && (now - lastPlayTime.current) > debounceTime) {
        playNote(notes[noteIndex.current]);
        noteIndex.current = (noteIndex.current + 1) % notes.length;
        lastScrollY.current = currentScroll;
        lastPlayTime.current = now;
      } else if (!isDownward) {
        // Update lastScrollY even on upward to track relative movement correctly
        lastScrollY.current = currentScroll;
      }
    };

    window.addEventListener('scroll', handleScrollNotes);
    return () => window.removeEventListener('scroll', handleScrollNotes);
  }, [isMuted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderContent = () => {
    if (activePage === 'home') return <Home onNavigate={setActivePage} />;
    if (activePage === 'about') return <AboutPage onNavigate={setActivePage} />;
    
    const study = caseStudies.find(s => s.id === activePage);
    if (study) return <CaseStudyView study={study} onBack={() => setActivePage('home')} />;
    
    return <Home onNavigate={setActivePage} />;
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white font-sans">
      {/* Sticky Navigation */}
      <nav 
        className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100"
        aria-label="Main Navigation"
      >
        <button 
          onClick={() => setActivePage('home')}
          className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Go to home"
        >
          BS.
        </button>
        
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-400 hover:text-black transition-colors cursor-pointer flex items-center gap-2"
            aria-label={isMuted ? "Unmute piano scroll" : "Mute piano scroll"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="hidden lg:inline">{isMuted ? "Muted" : "Sound On"}</span>
          </button>
          <button 
            onClick={() => {
              if (activePage === 'home') {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActivePage('home');
                setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }
            }} 
            className={`hover:opacity-50 transition-opacity cursor-pointer ${activeSection === 'work' ? 'text-black' : 'text-gray-400'}`}
            aria-label="View my work"
          >
            Work
          </button>
          <button 
            onClick={() => setActivePage('about')} 
            className={`hover:opacity-50 transition-opacity cursor-pointer ${activePage === 'about' ? 'text-black' : 'text-gray-400'}`}
            aria-label="Learn more about me"
          >
            About
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`hover:opacity-50 transition-opacity cursor-pointer ${activeSection === 'contact' ? 'text-black' : 'text-gray-400'}`}
            aria-label="Contact me"
          >
            Contact
          </button>
        </div>

        <button 
          className="md:hidden text-black cursor-pointer" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-10 text-black text-3xl font-display font-bold"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Menu"
          >
            <button 
              onClick={() => { 
                if (activePage === 'home') {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActivePage('home');
                  setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }
                setIsMenuOpen(false); 
              }}
              className={`cursor-pointer hover:opacity-50 transition-opacity ${activeSection === 'work' ? 'text-black' : 'text-gray-400'}`}
            >
              Work
            </button>
            <button 
              onClick={() => { setActivePage('about'); setIsMenuOpen(false); }}
              className={`cursor-pointer hover:opacity-50 transition-opacity ${activePage === 'about' ? 'text-black' : 'text-gray-400'}`}
            >
              About
            </button>
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className={`cursor-pointer hover:opacity-50 transition-opacity ${activeSection === 'contact' ? 'text-black' : 'text-gray-400'}`}
            >
              Contact
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-black cursor-pointer"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Chatbot */}
      <Chatbot onNavigate={setActivePage} />

      {/* Flying Bird */}
      <FlyingBird />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-8 z-50 w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contact" className="px-6 py-32 border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Let's build something together.</h2>
              <p className="text-xl text-gray-500 font-light mb-12 max-w-md leading-relaxed">
                I’m always open to discussing new projects, design systems, or opportunities to help teams scale.
              </p>
              
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Location</p>
                  <p className="text-lg font-medium">Amsterdam, Netherlands & Remote</p>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex gap-8">
                    <a href="https://www.linkedin.com/in/mrbenjamint/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" aria-label="LinkedIn"><Linkedin size={24} /></a>
                    <a href="https://www.instagram.com/mr_benjamn_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" aria-label="Instagram"><Instagram size={24} /></a>
                    <a href="mailto:bensackey5@gmail.com" className="text-gray-400 hover:text-black transition-colors" aria-label="Email"><Mail size={24} /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
              <ContactForm />
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="text-xl font-display font-bold tracking-tight">Benjamin Sackey</h3>
              <p className="text-sm text-gray-400">Senior Product Designer at Peach Payments</p>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">© 2026 Benjamin Sackey</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/bensackey5@gmail.com', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-display font-bold mb-2">Message Sent!</h3>
        <p className="text-gray-500 font-light mb-8">Thanks for reaching out. I'll get back to you as soon as possible.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-sm font-bold uppercase tracking-widest border-b-2 border-brand-accent pb-1 hover:opacity-50 transition-opacity"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-black focus:outline-none transition-colors font-light text-lg"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-black focus:outline-none transition-colors font-light text-lg"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          placeholder="Tell me about your project..."
          className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-black focus:outline-none transition-colors font-light text-lg resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-5 bg-brand-accent text-white text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed group"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message 
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
      
      {status === 'error' && (
        <p className="text-red-500 text-xs font-medium text-center">Something went wrong. Please try again or email me directly.</p>
      )}
    </form>
  );
}

function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="pt-32 pb-20">
      <Helmet>
        <title>Benjamin Sackey — Senior Product Designer</title>
        <meta name="description" content="Portfolio of Benjamin Sackey, a Senior Product Designer specializing in systems for commerce and real-world operations." />
      </Helmet>
      {/* Hero Section */}
      <section id="hero" className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-8xl font-swear font-bold tracking-tighter mb-12 italic">
              Benjamin Sackey
            </h1>
            <div className="max-w-3xl font-light text-gray-500 leading-relaxed mb-[53px]">
              <p className="text-[22px] mb-[20px]">
                I’m a Senior Product Designer currently leading payment experiences at Peach Payments, focusing on reducing friction, improving trust, and driving measurable outcomes across digital commerce in Africa.
              </p>
              <p className="text-[22px] mb-[20px]">
                Previously, I was Product Design Lead at Float, where I helped design a new SME credit model using transaction-level virtual cards to reduce default risk.
              </p>
              <p className="text-[22px]">
                I’ve also worked across Hubtel and Farmerline, and consult for Sommalife, designing systems that support commerce and real-world operations at scale.
              </p>
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-brand-accent text-white text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-colors cursor-pointer"
              >
                View Case Studies
              </button>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-gray-200 text-sm font-bold uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-16 border-b border-gray-100 pb-4">Selected Work</h3>
          <div className="flex flex-col gap-40">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  y: { duration: 0.3, ease: "easeOut" }
                }}
                className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-8 rounded-sm"
                onClick={() => onNavigate(study.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(study.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View case study: ${study.title}`}
              >
                <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-50 rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  <motion.img 
                    src={study.image} 
                    alt={study.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex gap-3 mb-6">
                    {study.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-1 border border-gray-100 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-medium tracking-tight group-hover:opacity-70 transition-opacity leading-tight">
                    <span className="font-bold border-b-2 border-brand-accent pb-0.5">{study.title}</span> — {study.subtitle}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent mt-8">
                    View Case Study <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-16 border-b border-gray-100 pb-4">Media & Podcasts</h3>
          
          <div className="flex flex-col gap-32">
            {/* Episode 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
            >
              <div className="w-full">
                <iframe 
                  data-testid="embed-iframe" 
                  title="Spotify Podcast Episode: Building Bytes with Benjamin Sackey"
                  style={{ borderRadius: '12px' }} 
                  src="https://open.spotify.com/embed/episode/4hiCfVS8VIGEXyd41GHtrI?utm_source=generator" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Mar 5, 2024</p>
                <h3 className="text-2xl md:text-4xl font-display font-medium tracking-tight leading-tight mb-6">
                  <span className="font-bold border-b-2 border-black pb-0.5">Building Bytes</span> — The evolution of Ghana's product design and development space with Benjamin Sackey
                </h3>
                <p className="text-lg md:text-xl font-light text-gray-500 leading-relaxed">
                  "Benjamin Sackey a seasoned product designer and manager with over a decade of experience working in Ghana's product design and development space discussed how the space has evolved over the last ten years in this episode of Building Bytes."
                </p>
              </div>
            </motion.div>

            {/* Episode 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
            >
              <div className="w-full md:order-last">
                <iframe 
                  data-testid="embed-iframe" 
                  style={{ borderRadius: '12px' }} 
                  src="https://open.spotify.com/embed/episode/6Smk6gqZh4b3Fj4lsx37C0?utm_source=generator" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Oct 24, 2023</p>
                <h3 className="text-2xl md:text-4xl font-display font-medium tracking-tight leading-tight mb-6">
                  <span className="font-bold border-b-2 border-black pb-0.5">Demo Fridays</span> — Building technology for the Ghanaian market
                </h3>
                <p className="text-lg md:text-xl font-light text-gray-500 leading-relaxed">
                  "This episode shares insights from the panel at the last Demo Fridays where we discussed how to build technology for the Ghanaian market with Irina Oduro, Benjamin Sackey and Stefan Froelich (DumbTechGuy)."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="pt-40 pb-20 px-6">
      <Helmet>
        <title>About — Benjamin Sackey</title>
        <meta name="description" content="Learn more about Benjamin Sackey's approach to product design, his philosophy, and his career highlights." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[72px] font-sans font-bold mb-24 tracking-tighter leading-none"
          >
            Designing systems for commerce and real-world operations.
          </motion.h1>
          
          <div className="space-y-24 text-xl font-light leading-relaxed text-gray-600">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-8 border-b border-gray-100 pb-4">Narrative</h3>
              <div className="max-w-2xl">
                <p className="mb-8">
                  I’m a Senior Product Designer currently leading payment experiences at Peach Payments, focusing on reducing friction, improving trust, and driving measurable outcomes across digital commerce in Africa.
                </p>
                <p className="mb-8">
                  Previously, I was Product Design Lead at Float, where I helped design a new SME credit model using transaction-level virtual cards to reduce default risk.
                </p>
                <p className="mb-8">
                  I’ve also worked across Hubtel and Farmerline, and consult for Sommalife, designing systems that support commerce and real-world operations at scale.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-8 border-b border-gray-100 pb-4">Design Philosophy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-lg font-bold text-black mb-2">Clarity over complexity</h4>
                  <p className="text-sm text-gray-500">If it's not simple, it's not finished. I strip away the noise to find the core value.</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-lg font-bold text-black mb-2">Systems over screens</h4>
                  <p className="text-sm text-gray-500">I design the underlying logic and patterns, not just the visual interface.</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-lg font-bold text-black mb-2">Impact over aesthetics</h4>
                  <p className="text-sm text-gray-500">Beauty is a byproduct of a solution that actually works and moves the needle.</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-8 border-b border-gray-100 pb-4">Experience</h3>
              <ul className="space-y-8 max-w-2xl">
                <li className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-black font-bold">Peach Payments</p>
                    <p className="text-sm text-gray-400">Senior Product Designer</p>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2022 — Present</p>
                </li>
                <li className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-black font-bold">Sommalife</p>
                    <p className="text-sm text-gray-400">Design Consultant</p>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2020 — Present</p>
                </li>
                <li className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-black font-bold">Float (YC Startup)</p>
                    <p className="text-sm text-gray-400">Product Design Lead</p>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2021 — 2022</p>
                </li>
                <li className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-black font-bold">Farmerline Group</p>
                    <p className="text-sm text-gray-400">Product Designer</p>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2019 — 2020</p>
                </li>
                <li className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-black font-bold">Hubtel</p>
                    <p className="text-sm text-gray-400">Product Designer</p>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2017 — 2019</p>
                </li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-12 border-t border-gray-100"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Tech Stack</p>
              <h2 className="text-[55px] font-sans font-bold mb-12 text-[#101010]">What I Use</h2>
              
              <p className="text-lg text-gray-500 mb-16 leading-relaxed max-w-2xl">
                I use a mix of design, product, and AI tools to move quickly from idea to execution, balancing clarity, speed, and collaboration across teams.
              </p>

              <div className="space-y-20">
                {/* Design & Collaboration */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-8 border-b border-gray-100 pb-4">Design & Collaboration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/figma" alt="Figma" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">Figma</p>
                        <p className="text-sm text-gray-400">UI, prototyping, systems</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/miro" alt="Miro" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">FigJam / Miro</p>
                        <p className="text-sm text-gray-400">workshops, ideation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product & Delivery */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-8 border-b border-gray-100 pb-4">Product & Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/jira" alt="Jira" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">Jira</p>
                        <p className="text-sm text-gray-400">delivery, sprints</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/confluence" alt="Confluence" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">Confluence</p>
                        <p className="text-sm text-gray-400">documentation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/slack" alt="Slack" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">Slack</p>
                        <p className="text-sm text-gray-400">team collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI & Prototyping */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-8 border-b border-gray-100 pb-4">AI & Prototyping</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/openai" alt="ChatGPT" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">ChatGPT / Claude / Gemini</p>
                        <p className="text-sm text-gray-400">research, thinking, writing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/cursor" alt="Cursor" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">Cursor / Lovable</p>
                        <p className="text-sm text-gray-400">rapid prototyping</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <div className="w-full h-full bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                          <Presentation size={20} />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-black">Gamma</p>
                        <p className="text-sm text-gray-400">storytelling, visuals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <img src="https://cdn.simpleicons.org/google" alt="NotebookLM" className="w-full h-full object-contain grayscale" />
                      </div>
                      <div>
                        <p className="font-bold text-black">NotebookLM</p>
                        <p className="text-sm text-gray-400">knowledge synthesis</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-50 group">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-110">
                        <div className="w-full h-full bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                          <StickyNote size={20} />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-black">Granola</p>
                        <p className="text-sm text-gray-400">notes, insights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-20 text-lg text-black font-medium border-l-2 border-black pl-6 italic">
                Increasingly, I use AI tools to accelerate product thinking, prototyping, and decision-making.
              </p>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyView({ study, onBack }: { study: CaseStudy, onBack: () => void }) {
  return (
    <div className="pt-32 pb-20 px-6">
      <Helmet>
        <title>{study.seo.title}</title>
        <meta name="description" content={study.seo.description} />
        <meta name="keywords" content={study.seo.keywords.join(', ')} />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 hover:opacity-50 transition-opacity text-gray-400 cursor-pointer"
          aria-label="Back to work"
        >
          <ArrowLeft size={14} /> Back to Work
        </motion.button>

        {/* Project Title */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-32"
        >
          <div className="flex gap-3 mb-8">
            {study.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-1 border border-gray-100 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-5xl md:text-8xl font-swear font-bold mb-6 tracking-tighter leading-none italic">
            {study.title}
          </h1>
          <p className="text-2xl md:text-4xl font-light text-gray-400 leading-tight max-w-4xl">
            {study.subtitle}
          </p>
          {study.link && (
            <div className="mt-12 flex flex-wrap gap-8">
              <a 
                href={study.link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-black hover:opacity-50 transition-opacity"
              >
                {study.link.label} <ExternalLink size={14} />
              </a>
              {study.pdfLink && (
                <a 
                  href={study.pdfLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
                >
                  View Case Work PDF <FileText size={14} />
                </a>
              )}
            </div>
          )}
        </motion.header>

        {/* 1. Impact (Hero Section) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-40"
        >
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-12 border-b border-gray-100 pb-4">Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {study.impact.map((item, i) => (
              <div key={i} className="p-12 bg-gray-50 rounded-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-6xl md:text-8xl font-display font-bold mb-4" style={{ color: study.color }}>
                  {item.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 2. Overview */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Overview</h3>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Role</p>
              <p className="text-lg font-medium">{study.overview.role}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Scope</p>
              <p className="text-lg font-medium">{study.overview.scope}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Team</p>
              <p className="text-lg font-medium">{study.overview.team}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Context</p>
              <p className="text-lg font-medium">{study.overview.context}</p>
            </div>
            {study.link && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Live Project</p>
                <a 
                  href={study.link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-medium border-b border-brand-accent hover:opacity-50 transition-opacity inline-flex items-center gap-2"
                >
                  {study.link.label} <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
        </motion.section>

        {/* 3. Problem */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Problem</h3>
          </div>
          <div className="md:col-span-8">
            <div className="p-10 md:p-16 bg-gray-50 rounded-sm border border-gray-100">
              <ul className="space-y-6">
                {study.problem.map((p, i) => (
                  <li key={i} className="text-2xl md:text-4xl font-display font-bold tracking-tight leading-tight text-gray-800">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* 4. Goal */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Goal</h3>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-4">
              {study.goal.map((g, i) => (
                <li key={i} className="text-2xl font-light text-gray-600 leading-relaxed">• {g}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* 5. My Role */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">My Role</h3>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-4">
              {study.myRole.map((r, i) => (
                <li key={i} className="text-2xl font-light text-gray-600 leading-relaxed">• {r}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* 6. Key Insight */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Key Insight</h3>
          </div>
          <div className="md:col-span-8">
            <div className="p-10 md:p-16 bg-black text-white rounded-sm">
              <p className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight italic">
                "{study.keyInsight[0]}"
              </p>
            </div>
          </div>
        </motion.section>

        {/* 7. Solution */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Solution</h3>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-4">
              {study.solution.map((s, i) => (
                <li key={i} className="text-2xl font-light text-gray-600 leading-relaxed">• {s}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* 8. Key Decisions (CRITICAL) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Key Decisions</h3>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {study.keyDecisions.map((decision, i) => (
              <div key={i} className="p-10 bg-gray-50 rounded-sm border border-gray-100 flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Decision</p>
                  <p className="text-xl font-bold">{decision.title}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Why</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{decision.why}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Tradeoff</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{decision.tradeoff}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 9. Execution */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Execution</h3>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-4">
              {study.execution.map((e, i) => (
                <li key={i} className="text-2xl font-light text-gray-600 leading-relaxed">• {e}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* 10. Outcome */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Outcome</h3>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-4">
              {study.outcome.map((o, i) => (
                <li key={i} className="text-3xl font-display font-bold tracking-tight text-black">• {o}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* 11. Reflection */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 py-24 px-12 bg-gray-50 rounded-sm border border-gray-100"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Reflection</h3>
            <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter leading-tight">
              {study.reflection}
            </p>
          </div>
        </motion.section>

        {/* 12. Live Project Link */}
        {(study.link || study.pdfLink) && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-40"
          >
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-16">
              {study.link && (
                <a 
                  href={study.link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex flex-col items-center gap-6"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Live Project</span>
                  <span className="text-4xl md:text-6xl font-display font-bold border-b-4 border-brand-accent pb-2 group-hover:opacity-50 transition-opacity tracking-tighter">
                    {study.link.label} <ExternalLink className="inline-block ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" size={40} />
                  </span>
                </a>
              )}

              {study.pdfLink && (
                <a 
                  href={study.pdfLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex flex-col items-center gap-6"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Documentation</span>
                  <span className="text-2xl md:text-4xl font-display font-bold text-gray-400 group-hover:text-black transition-colors tracking-tighter">
                    View Case Work PDF <FileText className="inline-block ml-3 group-hover:scale-110 transition-transform" size={24} />
                  </span>
                </a>
              )}
            </div>
          </motion.section>
        )}

        {/* Next Project */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-24 border-t border-gray-100 flex justify-center"
        >
          <button 
            onClick={onBack}
            className="group flex flex-col items-center gap-6 cursor-pointer"
            aria-label="View all work"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Next Project</span>
            <span className="text-4xl md:text-7xl font-display font-bold group-hover:opacity-50 transition-opacity tracking-tighter">
              View all work <ArrowRight className="inline-block ml-6 group-hover:translate-x-6 transition-transform" size={48} />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function FlyingBird() {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [yPos, setYPos] = useState(20);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const triggerFlight = () => {
      const delay = 2000 + Math.random() * 8000; // Fly every 2-10 seconds
      timeoutId = setTimeout(() => {
        setDirection(Math.random() > 0.5 ? 'right' : 'left');
        setYPos(15 + Math.random() * 50); // Random height between 15% and 65%
        setIsVisible(true);
      }, delay);
    };

    if (!isVisible) {
      triggerFlight();
    }

    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="flying-bird"
          initial={{ 
            x: direction === 'right' ? '-20vw' : '120vw',
            y: `${yPos}vh`,
            scaleX: direction === 'right' ? 1 : -1
          }}
          animate={{ 
            x: direction === 'right' ? '120vw' : '-20vw',
            y: [`${yPos}vh`, `${yPos - 4}vh`, `${yPos}vh`]
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            x: { duration: 7, ease: "linear" },
            y: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
          }}
          onAnimationComplete={() => setIsVisible(false)}
          className="fixed top-0 left-0 z-[9999] pointer-events-none text-yellow-400 drop-shadow-md"
          style={{ width: '32px', height: '32px' }}
        >
          <motion.div
            animate={{ rotate: [-15, 15, -15] }}
            transition={{ duration: 0.15, repeat: Infinity }}
          >
            <Bird size={32} fill="currentColor" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
