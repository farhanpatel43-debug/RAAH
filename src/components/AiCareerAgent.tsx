import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import {
  Sparkles,
  Send,
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Target,
  Code2,
  Calendar,
  Layers,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

interface AiCareerAgentProps {
  user: UserProfile;
  isFloatingDrawer?: boolean;
  onClose?: () => void;
  dark?: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export const AiCareerAgent: React.FC<AiCareerAgentProps> = ({
  user,
  isFloatingDrawer = false,
  onClose,
  dark = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: `Hello **${user.name}**! 👋 I am your **RAAH AI Career & Roadmap Advisor**.\n\nI see you are in **${user.branch}** (${user.currentYear}) preparing to become a **${user.targetCareer}** with a **${user.readinessScore}%** readiness score.\n\nHow can I help you accelerate your journey today? Pick a suggested topic below or type your question!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🎯 Analyze My Skill Gap', prompt: 'Analyze my skill gap for Data Scientist and tell me what to study next.' },
    { label: '📅 2-Hour Daily Study Schedule', prompt: 'Create a personalized 2-hour daily study schedule for my 3rd year.' },
    { label: '💻 Explain Regression vs Classification', prompt: 'Explain the difference between Linear Regression and Logistic Regression with Python code.' },
    { label: '🚀 Recommend Top Portfolio Project', prompt: 'Recommend a standout real-world Machine Learning project for my resume that recruiters love.' },
    { label: '⚡ Top DSA Patterns for AI/ML', prompt: 'What DSA patterns are most commonly asked in Data Science and AI/ML technical interviews?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          studentContext: user,
          conversationHistory: messages.slice(-4),
        }),
      });

      const data = await response.json();
      const agentReply = data.reply || "I'm reviewing your 4-year roadmap. Keep focusing on SQL, Python, and Machine Learning!";

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: agentReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error('AI agent fetch error:', err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: `Here is advice for **${user.name}**:\n\nBased on your current 3rd-year **${user.branch}** curriculum, your immediate focus should be closing the **25% SQL gap** and completing **Chapter 3: Regression** in Machine Learning. Build one end-to-end API project before Semester 6 placements!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'agent',
        text: `Chat reset. Hello **${user.name}**! Ask me anything about your 4-year ${user.branch} roadmap, coding practice, or career preparation.`,
        timestamp: 'Just now',
      },
    ]);
  };

  // Render markdown-like text with code blocks and bolding
  const renderFormattedText = (content: string) => {
    type TextPart = { type: 'text'; content: string };
    type CodePart = { type: 'code'; language: string; code: string };
    type Part = TextPart | CodePart;

    // If text contains code block ```python ... ```
    const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
    const parts: Part[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index),
        });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'python',
        code: match[2] || '',
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex),
      });
    }

    return (
      <div className="space-y-2">
        {parts.map((p, idx) => {
          if (p.type === 'code') {
            return (
              <div
                key={idx}
                className="my-3 rounded-xl overflow-hidden border border-gray-800 bg-[#0B1B36] font-mono text-xs shadow-sm"
              >
                <div className="bg-[#14264A] px-3 py-1.5 flex items-center justify-between text-gray-300 text-[11px]">
                  <span className="text-[#F2B544] font-semibold">{p.language}</span>
                  <button
                    onClick={() => copyToClipboard(p.code, `code-${idx}`)}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    {copiedId === `code-${idx}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                  {p.code}
                </pre>
              </div>
            );
          }

          // Handle regular text formatting (bold and newlines)
          const lines = p.content.split('\n');
          return (
            <div key={idx} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                if (!line.trim()) return <div key={lIdx} className="h-1.5" />;
                // Quick bold replacement
                const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ') || /^\d+\./.test(line.trim());
                return (
                  <p
                    key={lIdx}
                    className={`leading-relaxed text-xs sm:text-sm ${isBullet ? 'pl-2' : ''}`}
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col h-full rounded-3xl border transition-all ${
        dark
          ? 'bg-[#0F1D38] border-[#1C2E52] text-[#F1F5F9]'
          : 'bg-white border-[#EAF0F7] text-[#182235]'
      } shadow-sm overflow-hidden`}
    >
      {/* Header */}
      <div
        className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          dark ? 'border-[#1C2E52] bg-[#14264A]/60' : 'border-[#F1EFEA] bg-[#FAF7F2]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14264A] text-[#F2B544] flex items-center justify-center shadow-xs border border-[#F2B544]/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm sm:text-base">RAAH AI Career Advisor</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className={`text-[11px] ${dark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
              Personalized guidance for {user.name} ({user.branch})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            className={`p-2 rounded-xl text-xs font-semibold transition-colors ${
              dark
                ? 'hover:bg-[#1A2E56] text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-[#6B7280] hover:text-[#14264A]'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {isFloatingDrawer && onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Student Context Bar */}
      <div
        className={`px-4 py-2.5 border-b text-[11px] flex flex-wrap items-center justify-between gap-2 ${
          dark ? 'border-[#1C2E52] bg-[#0B162C]' : 'border-gray-100 bg-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-[#F2B544]">
            <Target className="w-3 h-3" /> {user.targetCareer}
          </span>
          <span className="hidden sm:inline text-gray-400">•</span>
          <span className="hidden sm:inline text-gray-400">{user.currentYear} ({user.branch})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Readiness: {user.readinessScore}%</span>
          <span className="text-emerald-500 font-bold">Streak: {user.streakDays}d 🔥</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAgent ? 'justify-start' : 'justify-end'}`}
            >
              {isAgent && (
                <div className="w-8 h-8 rounded-xl bg-[#14264A] text-[#F2B544] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs relative ${
                  isAgent
                    ? dark
                      ? 'bg-[#14264A]/80 border border-[#1E3563] text-gray-100'
                      : 'bg-[#F8F5EE] border border-[#EAF0F7] text-[#182235]'
                    : 'bg-[#14264A] text-white rounded-tr-xs'
                }`}
              >
                {renderFormattedText(msg.text)}

                <div
                  className={`mt-2 text-[10px] flex items-center justify-between ${
                    isAgent ? (dark ? 'text-gray-400' : 'text-gray-400') : 'text-gray-300'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isAgent && (
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="hover:underline flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAgent && (
                <div className="w-8 h-8 rounded-xl bg-[#F2B544] text-[#14264A] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#14264A] text-[#F2B544] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 ${
                dark ? 'bg-[#14264A]/80 text-gray-200' : 'bg-[#F8F5EE] text-[#182235]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#F2B544] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#F2B544] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#F2B544] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px] font-semibold text-gray-400">
                RAAH AI is formulating personalized guidance...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div
        className={`p-3 border-t overflow-x-auto whitespace-nowrap flex gap-2 ${
          dark ? 'border-[#1C2E52] bg-[#0B162C]' : 'border-[#F1EFEA] bg-[#FAF7F2]'
        }`}
      >
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.prompt)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              dark
                ? 'bg-[#14264A] hover:bg-[#1E386D] text-gray-200 border border-[#1E3563]'
                : 'bg-white hover:bg-[#F2EFE8] text-[#14264A] border border-[#EAF0F7] shadow-2xs'
            }`}
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div
        className={`p-3 sm:p-4 border-t ${
          dark ? 'border-[#1C2E52] bg-[#0F1D38]' : 'border-[#F1EFEA] bg-white'
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask RAAH AI about ${user.targetCareer} roadmap, code, or schedule...`}
            className={`flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm focus:outline-none transition-colors ${
              dark
                ? 'bg-[#0B162C] border border-[#1C2E52] text-white focus:border-[#F2B544]'
                : 'bg-[#F8F5EE] border border-gray-200 text-[#182235] focus:border-[#14264A]'
            }`}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 bg-[#14264A] hover:bg-[#0B1B36] disabled:opacity-40 text-white rounded-2xl shadow-sm transition-all flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-[#F2B544]" />
          </button>
        </form>
      </div>
    </div>
  );
};
