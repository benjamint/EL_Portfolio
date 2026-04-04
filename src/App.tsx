import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Loader2
} from 'lucide-react';
import { caseStudies, CaseStudy } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'about' | string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100">
        <button 
          onClick={() => setActivePage('home')}
          className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity"
        >
          BS.
        </button>
        
        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest">
          <button 
            onClick={() => {
              if (activePage === 'home') {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActivePage('home');
                setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }
            }} 
            className={`hover:opacity-50 transition-opacity cursor-pointer ${activePage === 'home' ? 'text-black' : 'text-gray-400'}`}
          >
            Work
          </button>
          <button 
            onClick={() => setActivePage('about')} 
            className={`hover:opacity-50 transition-opacity cursor-pointer ${activePage === 'about' ? 'text-black' : 'text-gray-400'}`}
          >
            About
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-gray-400 hover:text-black transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          >
            <button onClick={() => { setActivePage('home'); setIsMenuOpen(false); }}>Work</button>
            <button onClick={() => { setActivePage('about'); setIsMenuOpen(false); }}>About</button>
            <a href="mailto:bensackey5@gmail.com">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

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
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-gray-800 transition-colors"
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
                  <p className="text-lg font-medium">Accra, Ghana & Remote</p>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex gap-8">
                    <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Linkedin size={24} /></a>
                    <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Instagram size={24} /></a>
                    <a href="mailto:bensackey5@gmail.com" className="text-gray-400 hover:text-black transition-colors"><Mail size={24} /></a>
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
          className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-opacity"
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
        className="w-full py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed group"
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
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-12">
              Benjamin Sackey
            </h1>
            <div className="max-w-3xl space-y-8 text-xl md:text-2xl font-light text-gray-500 leading-relaxed mb-16">
              <p>
                I’m a Senior Product Designer currently leading payment experiences at Peach Payments, focusing on reducing friction, improving trust, and driving measurable outcomes across digital commerce in Africa.
              </p>
              <p>
                Previously, I was Product Design Lead at Float, where I helped design a new SME credit model using transaction-level virtual cards to reduce default risk.
              </p>
              <p>
                I’ve also worked across Hubtel and Farmerline, and consult for Sommalife, designing systems that support commerce and real-world operations at scale.
              </p>
              <p className="text-black font-medium">
                I focus on turning complex systems into clear, scalable products.
              </p>
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors cursor-pointer"
              >
                View Case Studies
              </button>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-gray-200 text-sm font-bold uppercase tracking-widest hover:border-black transition-colors cursor-pointer"
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
                className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
                onClick={() => onNavigate(study.id)}
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
                    <span className="font-bold border-b-2 border-black pb-0.5">{study.title}</span> — {study.subtitle}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black mt-8">
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

      {/* Credibility Strip */}
      <section className="px-6 py-24 bg-gray-50 mb-40">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-12">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            <img src="https://logo.clearbit.com/peachpayments.com" alt="Peach Payments" className="h-8 md:h-12 w-auto" referrerPolicy="no-referrer" />
            <img src="https://logo.clearbit.com/float.cash" alt="Float" className="h-8 md:h-12 w-auto" referrerPolicy="no-referrer" />
            <img src="https://logo.clearbit.com/farmerline.co" alt="Farmerline" className="h-8 md:h-12 w-auto" referrerPolicy="no-referrer" />
            <img src="https://logo.clearbit.com/hubtel.com" alt="Hubtel" className="h-8 md:h-12 w-auto" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">About</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-3xl md:text-5xl font-display font-bold leading-tight mb-12 tracking-tight">
              I focus on turning complex systems into clear, scalable products.
            </p>
            <button 
              onClick={() => onNavigate('about')}
              className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
            >
              Read more about my approach <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-start">
          <div className="md:col-span-7">
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-16 tracking-tighter leading-none">
              Designing systems for commerce and real-world operations.
            </h1>
            
            <div className="space-y-12 text-xl font-light leading-relaxed text-gray-600">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Narrative</h3>
                <p className="mb-8">
                  I’m a Senior Product Designer currently leading payment experiences at Peach Payments, focusing on reducing friction, improving trust, and driving measurable outcomes across digital commerce in Africa.
                </p>
                <p className="mb-8">
                  Previously, I was Product Design Lead at Float, where I helped design a new SME credit model using transaction-level virtual cards to reduce default risk.
                </p>
                <p className="mb-8">
                  I’ve also worked across Hubtel and Farmerline, and consult for Sommalife, designing systems that support commerce and real-world operations at scale.
                </p>
                <p className="text-black font-medium">
                  I focus on turning complex systems into clear, scalable products.
                </p>
              </section>

              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Design Philosophy</h3>
                <div className="grid grid-cols-1 gap-8">
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
              </section>

              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Career Highlights</h3>
                <ul className="space-y-8">
                  <li className="flex justify-between items-start border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-black font-bold">Peach Payments</p>
                      <p className="text-sm text-gray-400">Senior Product Designer</p>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2022 — Present</p>
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
                </ul>
              </section>
            </div>
          </div>
          
          <div className="md:col-span-5 sticky top-40">
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
              <img 
                src="https://picsum.photos/seed/benjamin/800/1200" 
                alt="Benjamin Sackey"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyView({ study, onBack }: { study: CaseStudy, onBack: () => void }) {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 hover:opacity-50 transition-opacity text-gray-400"
        >
          <ArrowLeft size={14} /> Back to Work
        </button>

        {/* Project Title */}
        <header className="mb-32">
          <div className="flex gap-3 mb-8">
            {study.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-1 border border-gray-100 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter leading-none">
            {study.title}
          </h1>
          <p className="text-2xl md:text-4xl font-light text-gray-400 leading-tight max-w-4xl">
            {study.subtitle}
          </p>
        </header>

        {/* 1. Impact (Hero Section) */}
        <section className="mb-40">
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
        </section>

        {/* 2. Overview */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
          </div>
        </section>

        {/* 3. Problem */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 4. Goal */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 5. My Role */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 6. Key Insight */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 7. Solution */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 8. Key Decisions (CRITICAL) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 9. Execution */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 10. Outcome */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
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
        </section>

        {/* 11. Reflection */}
        <section className="mb-40 py-24 px-12 bg-gray-50 rounded-sm border border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Reflection</h3>
            <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter leading-tight">
              {study.reflection}
            </p>
          </div>
        </section>

        {/* Next Project */}
        <div className="pt-24 border-t border-gray-100 flex justify-center">
          <button 
            onClick={onBack}
            className="group flex flex-col items-center gap-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Next Project</span>
            <span className="text-4xl md:text-7xl font-display font-bold group-hover:opacity-50 transition-opacity tracking-tighter">
              View all work <ArrowRight className="inline-block ml-6 group-hover:translate-x-6 transition-transform" size={48} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
