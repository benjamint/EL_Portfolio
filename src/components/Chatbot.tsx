import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, User, Bot, Sparkles, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { caseStudies } from '../types';

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Benjamin Sackey's professional portfolio. Your goal is to help visitors learn more about Benjamin's experience, skills, and work.

Benjamin Sackey is a Senior Product Designer specializing in systems for commerce and real-world operations.

Key Information:
- Current Role: Senior Product Designer at Peach Payments, leading payment experiences to reduce friction and improve trust in digital commerce across Africa.
- Previous Roles: 
    - Product Design Lead at Float (YC-backed), where he designed a new SME credit model using transaction-level virtual cards.
    - Product Designer at Farmerline Group.
    - Product Designer at Hubtel.
- Consulting: Consults for Sommalife.
- Design Philosophy:
    - Clarity over complexity: Stripping away noise to find core value.
    - Systems over screens: Designing underlying logic and patterns.
    - Impact over aesthetics: Beauty as a byproduct of a solution that works.

Case Studies:
${caseStudies.map(study => `
- ${study.title} (ID: ${study.id}): ${study.subtitle}
    - Company: ${study.company}
    - Role: ${study.role}
    - Impact: ${study.impact.map(i => `${i.label}: ${i.value}`).join(', ')}
    - Problem: ${study.problem.join(' ')}
    - Solution: ${study.solution.join(' ')}
`).join('\n')}

Tech Stack:
- Design: Figma, FigJam, Miro
- Product: Jira, Confluence, Slack
- AI & Prototyping: ChatGPT, Claude, Gemini, Cursor, Lovable, Gamma, NotebookLM, Granola

Tone: Professional, helpful, concise, and insightful.

IMPORTANT: When you mention a specific case study, you MUST offer to show it to the user by including a special tag at the end of your message in the format: [VIEW_PROJECT:id:Title].
Example: "You can learn more about this in the Float project. [VIEW_PROJECT:float-virtual-card:Float Virtual Card]"

Always refer to Benjamin in the third person.
`;

export function Chatbot({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm Benjamin's AI assistant. Ask me anything about his work, experience, or design approach." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `Context: ${SYSTEM_INSTRUCTION}\n\nUser Question: ${userMessage}` }] }
        ],
        config: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        }
      });

      const botText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (msg: { role: 'user' | 'bot'; text: string }) => {
    const projectMatch = msg.text.match(/\[VIEW_PROJECT:(.*?):(.*?)\]/);
    const cleanText = msg.text.replace(/\[VIEW_PROJECT:.*?:.*?\]/, '').trim();

    return (
      <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-brand-accent text-white' : 'bg-gray-200 text-gray-600'}`}>
            {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
          </div>
          <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-accent text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'}`}>
            {cleanText}
          </div>
        </div>
        {projectMatch && (
          <div className={`ml-10 ${msg.role === 'user' ? 'mr-10 ml-0' : ''}`}>
            <button
              onClick={() => {
                onNavigate(projectMatch[1]);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-accent text-brand-accent rounded-full text-xs font-bold hover:bg-brand-accent hover:text-white transition-all cursor-pointer shadow-sm"
            >
              View {projectMatch[2]} <ArrowRight size={12} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-accent text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform cursor-pointer"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-brand-accent text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">Portfolio Assistant</p>
                  <p className="text-[10px] opacity-60">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-50 transition-opacity">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
              {messages.map((msg, i) => (
                <div key={i}>
                  {renderMessage(msg)}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-brand-accent text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
