'use client';

import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Send, X, Loader2, ExternalLink } from 'lucide-react';
import { chatApi, ChatProduct } from '@/lib/api/chat';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  products?: ChatProduct[];
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Welcome to Proberry Store! How can I help you today?', isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessageText = inputValue.trim();
    setInputValue('');

    // Add user message immediately
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      // Use a temporary user ID (could be from auth context in real app)
      const userId = 'guest-user';

      const response = await chatApi.search(
        userMessageText,
        userId,
        conversationId
      );

      setConversationId(response.conversation_id);

      // Extract products from metadata if available
      const foundProducts = response.metadata?.products as ChatProduct[] | undefined;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        products: foundProducts && foundProducts.length > 0 ? foundProducts : undefined
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to detect raw Cloudinary/Image URLs and convert to Markdown images if they stand alone
  const processText = (text: string) => {
    // If the text already contains markdown image syntax, don't double wrap it
    // This regex looks for URLs that are NOT preceded by `](` (standard markdown link/image start)
    return text.replace(
      /(?<!\]\()(https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9/._%,?=&-]+|https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp))/g,
      (match) => {
        // Clean trailing punctuation that might have been caught
        const cleanMatch = match.replace(/[.,)]$/, '');
        return `![Image](${cleanMatch})`;
      }
    );
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'fixed bottom-6 right-6 z-[9999] flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110',
          'bg-[#8A33FD] text-white',
          'md:w-16 md:h-16 w-14 h-14',
          isOpen && 'hidden md:flex md:w-12 md:h-12'
        )}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Chat bubble icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
            >
              <rect x="5" y="6" width="18" height="12" rx="2.5" fill="white" />
              <path d="M5 16L2 19V16H5Z" fill="white" />
              <circle cx="9.5" cy="12" r="1.2" fill="#8A33FD" />
              <circle cx="14" cy="12" r="1.2" fill="#8A33FD" />
              <circle cx="18.5" cy="12" r="1.2" fill="#8A33FD" />
            </svg>
          </div>
        )}
      </button>

      {/* Chat Windows (Desktop & Mobile) */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={clsx(
            'fixed z-[9998] bg-white flex flex-col overflow-hidden animate-scaleIn bg-[#F9FAFB]',
            // Desktop styles
            'md:bottom-24 md:right-6 md:w-[375px] md:h-[600px] md:max-h-[calc(100vh-140px)] md:rounded-2xl md:shadow-2xl md:border md:border-gray-100',
            // Mobile styles (full screen)
            'inset-0 md:inset-auto'
          )}
        >
          {/* Header */}
          <div className="bg-[#8A33FD] h-[58px] flex items-center justify-center relative px-4 shrink-0 shadow-sm">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-4 text-white hover:opacity-80 transition-opacity"
              aria-label="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>
              PROBERRY ASSISTANT
            </h2>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-[#F9FAFB]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  'flex flex-col',
                  message.isUser ? 'items-end' : 'items-start'
                )}
              >
                <div
                  className={clsx(
                    'max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-sm overflow-hidden',
                    message.isUser
                      ? 'bg-[#8A33FD] text-white rounded-tr-sm'
                      : 'bg-white text-[#3C4242] border border-gray-100 rounded-tl-sm'
                  )}
                >
                  {message.isUser ? (
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  ) : (
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                          a: ({ node, ...props }) => (
                            <a target="_blank" rel="noopener noreferrer" className="text-[#8A33FD] hover:underline font-medium inline-flex items-center gap-1" {...props}>
                              {props.children} <ExternalLink size={10} />
                            </a>
                          ),
                          ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                          img: ({ node, ...props }) => {
                            const src = String(props.src || '');
                            if (!src) return null;
                            return (
                              <span className="block my-2 relative w-full h-[200px] rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center">
                                <Image
                                  src={src}
                                  alt={props.alt || 'Chat image'}
                                  fill
                                  className="object-contain p-1"
                                  unoptimized
                                />
                              </span>
                            );
                          }
                        }}
                      >
                        {processText(message.text)}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {/* Render Products Carousel if available */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 w-full overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar">
                    <div className="flex gap-3 w-max">
                      {message.products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug || product.id}`}
                          target="_blank"
                          className="w-[140px] bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex-shrink-0 block group"
                        >
                          <div className="relative h-[100px] w-full bg-gray-50">
                            {product.image_url ? (
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                unoptimized
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-300 text-xs">No Image</div>
                            )}
                          </div>
                          <div className="p-2">
                            <h4 className="text-xs font-bold text-[#3C4242] line-clamp-1 mb-1 leading-snug h-8 overflow-hidden">{product.name}</h4>
                            <p className="text-xs font-bold text-[#8A33FD]">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">Thinking...</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#8A33FD] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#8A33FD] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#8A33FD] rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-100 px-4 py-3 pb-6 md:pb-3 flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder={loading ? "Please wait..." : "Ask about products, styles..."}
              className="flex-1 h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-[#3C4242] placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/50 focus:border-[#8A33FD] transition-all disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={loading || !inputValue.trim()}
              className="w-11 h-11 bg-[#8A33FD] rounded-xl flex items-center justify-center text-white hover:bg-[#7229d6] transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#8A33FD]/20"
              aria-label="Send message"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
