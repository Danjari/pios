// components/AIAssistant.tsx
'use client'
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare, Sparkles } from 'lucide-react';
import ReactMarkdown from "react-markdown"
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isSendHovered, setIsSendHovered] = useState(false);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(120, e.target.scrollHeight)}px`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;

  //   // Add user message
  //   const userMessage: Message = { 
  //     role: 'user', 
  //     content: input.trim(),
  //     timestamp: new Date()
  //   };
  //   setMessages([...messages, userMessage]);
  //   setInput('');
  //   setIsLoading(true);

  //   try {
  //     // Call OpenAI API
  //     const response = await fetch('/api/chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         messages: messages.concat(userMessage).map(msg => ({
  //           role: msg.role,
  //           content: msg.content
  //         })),
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to get response');
  //     }

  //     const data = await response.json();
      
  //     // Add assistant message
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { 
  //         role: 'assistant', 
  //         content: data.message,
  //         timestamp: new Date()
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { 
  //         role: 'assistant', 
  //         content: 'Sorry, I encountered an error. Please try again.',
  //         timestamp: new Date()
  //       },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage: Message = { 
      role: 'user', 
      content: input.trim(),
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
  
    try {
      // Call your agent endpoint
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage.content,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
  
      const data = await response.json();
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: data.answer, // we use 'answer' from new endpoint
          timestamp: new Date()
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleAssistant}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 z-50 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-90 scale-110' 
            : 'bg-blue-500 hover:bg-blue-600 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-400"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat modal */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 z-40 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        {/* Header */}
        <div className="bg-blue-600 p-3 sm:p-4 text-white flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg">AI Assistant</h3>
              <p className="text-[10px] sm:text-xs text-blue-100">Powered by Gemini</p>
            </div>
          </div>
          <button 
            onClick={toggleAssistant}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Messages container */}
        <div className="h-[calc(100vh-300px)] sm:h-96 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 sm:mt-20 px-4 sm:px-6">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full inline-flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
              <p className="font-medium text-gray-700 mb-1 text-sm sm:text-base">Comment puis je t&apos;aider aujourd&apos;hui?</p>
              <p className="text-xs sm:text-sm text-gray-500">Demande-moi tout ce que tu veux et je ferai de mon mieux pour y aider.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 sm:mb-4 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div className="inline-block max-w-[85%] sm:max-w-md">
                  <div
                    className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <div className={`text-[10px] sm:text-xs mt-1 text-gray-500 ${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="text-left mb-3 sm:mb-4">
              <div className="inline-block max-w-[85%] sm:max-w-md">
                <div className="rounded-2xl px-3 py-2 sm:px-4 sm:py-3 bg-gray-200 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 sm:p-4 bg-white">
          <div className="flex items-end bg-gray-100 rounded-2xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-lg transition duration-200">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 sm:px-4 sm:py-3 border-none bg-transparent focus:outline-none resize-none min-h-10 max-h-32 text-sm sm:text-base"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-2 sm:p-3 m-1 rounded-xl transition-all duration-200 flex items-center justify-center ${
                isLoading || !input.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
              }`}
              onMouseEnter={() => setIsSendHovered(true)}
              onMouseLeave={() => setIsSendHovered(false)}
            >
              <Send 
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 ${isSendHovered ? 'translate-x-1 -translate-y-1' : ''}`} 
              />
            </button>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 text-center">
            Envoyer avec Entrée, nouvelle ligne avec Maj+Entrée
          </div>
        </form>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={toggleAssistant}
        />
      )}
    </>
  );
}