"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistantPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    {
      title: "Jelaskan filosofi batik Parang",
      description: "Pahami makna di balik motif klasik.",
    },
    {
      title: "Apa itu upacara Rambu Solo'?",
      description: "Temukan tradisi unik dari Tana Toraja.",
    },
    {
      title: "Sebutkan alat musik dari Jawa Barat",
      description: "Kenali instrumen tradisional Sunda.",
    },
    {
      title: "Ceritakan legenda Candi Prambanan",
      description: "Dengarkan kisah cinta Roro Jonggrang.",
    },
  ];

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Scroll after user message
    setTimeout(() => scrollToBottom(), 100);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Maaf, saya tidak dapat memahami pertanyaan.";

      const assistantMessage: Message = {
        role: "assistant",
        content: aiText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Scroll after AI response
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Terjadi kesalahan pada server. Silakan coba lagi.",
          timestamp: new Date(),
        },
      ]);
      setTimeout(() => scrollToBottom(), 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(inputValue);

  const handleSuggestionClick = (text: string) => sendMessage(text);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-8 pb-8 px-4">
      <div className="w-full max-w-4xl rounded-4xl bg-white shadow-xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
        
        {/* CHAT BOX */}
        <div ref={chatContainerRef} className="flex-1 overflow-auto px-6 pt-8 pb-6">
          {/* SUGGESTIONS */}
          {showSuggestions && messages.length === 0 && (
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-600 via-red-600 to-teal-700 flex items-center justify-center">
                <svg width="48" height="58" viewBox="0 0 48 58" fill="white">
                  <path d="M38 23L35.5 17.5L30 15L35.5 12.5L38 7L40.5 12.5L46 15L40.5 17.5L38 23Z..." />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-center">AI Assistant Budaya</h1>
              <p className="text-gray-600 text-center">
                Saya siap membantu Anda mengenal budaya Indonesia.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s.title)}
                    className="p-3 bg-gray-100 rounded-3xl hover:bg-gray-200 transition"
                  >
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-xs text-gray-500">{s.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          <div className="flex flex-col gap-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-600 to-red-600 flex items-center justify-center">
                    <span className="text-white font-bold">AI</span>
                  </div>
                )}

                <div
                  className={`max-w-xl px-4 py-3 rounded-3xl ${
                    msg.role === "user"
                      ? "bg-yellow-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc ml-5 mb-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-5 mb-2">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-600 animate-pulse"></div>
                <div className="px-4 py-3 bg-gray-100 rounded-3xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* INPUT */}
        <div className="border-t border-gray-200 px-6 py-4 bg-white">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Tanyakan tentang budaya Nusantara..."
              className="w-full bg-gray-100 rounded-full py-3 pl-5 pr-14 focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
