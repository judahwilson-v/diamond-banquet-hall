import { useEffect, useRef, useState } from 'react';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const DEFAULT_ENDPOINT = import.meta.env.VITE_CONCIERGE_API_ENDPOINT || '/api/concierge-chat';
const INITIAL_MESSAGE =
  'Hello! I am the virtual manager of Diamond Banquet Hall. How can I help you plan your event today?';

type Message = {
  role: 'user' | 'model';
  text: string;
};

type ChatbotProps = {
  endpoint?: string;
};

export function Chatbot({ endpoint = DEFAULT_ENDPOINT }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', text: INITIAL_MESSAGE }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const conversation = [...messages, { role: 'user' as const, text: userText }];
    setInput('');
    setMessages(conversation);
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversation,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { reply?: string; error?: string }
        | null;

      if (!response.ok || !payload?.reply) {
        throw new Error(payload?.error || 'Chat request failed');
      }

      setMessages(prev => [...prev, { role: 'model', text: payload.reply }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us via WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 flex h-[500px] max-h-[calc(100vh-120px)] w-[350px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl sm:right-8"
          >
            <div className="bg-amber-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-amber-100" />
                <span className="font-medium">Diamond Concierge</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                aria-label="Close concierge chat"
                className="text-amber-100 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  key={`${msg.role}-${idx}`}
                  className={cn(
                    'flex max-w-[85%]',
                    msg.role === 'user' ? 'ml-auto justify-end' : 'justify-start'
                  )}
                >
                  <motion.div
                    whileHover={msg.role === 'user' ? { scale: 1.02, backgroundColor: "#262626" } : {}}
                    className={cn(
                      'origin-bottom-right rounded-2xl p-3 text-sm shadow-sm transition-all',
                      msg.role === 'user'
                        ? 'cursor-default rounded-br-sm bg-neutral-900 text-white'
                        : 'rounded-bl-sm border border-neutral-100 bg-white text-neutral-800'
                    )}
                  >
                    {msg.role === 'model' ? (
                      <div className="prose prose-sm prose-p:my-1 prose-ul:my-1 prose-neutral">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </motion.div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex max-w-[85%] justify-start">
                  <div className="bg-white border border-neutral-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-neutral-100">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void handleSend();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about parking, catering..."
                  className="flex-1 bg-neutral-100 text-neutral-900 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label={isOpen ? 'Close concierge chat' : 'Open concierge chat'}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-4 sm:right-8 w-14 h-14 bg-amber-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-amber-700 transition z-50 border-4 border-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
