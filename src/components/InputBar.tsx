import { useState, useRef, useEffect } from 'react';
import { Send, Wand2, Loader2, Sparkles } from 'lucide-react';

interface InputBarProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function InputBar({ onSend, disabled }: InputBarProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 4000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled && !isSending) {
      setIsSending(true);
      onSend(input.trim());
      setInput('');
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const charCount = input.length;
  const isNearLimit = charCount > MAX_CHARS * 0.8;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className={`bg-[#1a1a2e]/95 backdrop-blur-lg border-t border-[#2d2d44]/50 p-4 transition-all duration-300 ${isFocused ? 'shadow-2xl shadow-purple-500/5' : ''}`}>
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        {/* Input Container */}
        <div className={`relative flex items-end bg-[#16162a] rounded-2xl border transition-all duration-300 ${isFocused ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-[#2d2d44]'} ${disabled ? 'opacity-50' : ''}`}>
          {/* AI Icon */}
          <div className="pl-4 pb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${input.trim() ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-[#2d2d44]'}`}>
              {input.trim() ? <Sparkles className="w-4 h-4 text-white" /> : <span className="text-lg">💬</span>}
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything... Type your message and press Enter to send to all AI services"
            disabled={disabled || isSending}
            className="flex-1 bg-transparent text-white placeholder-gray-500/70 px-4 py-4 pr-12 resize-none outline-none min-h-[52px] max-h-[200px] text-base"
            rows={1}
          />

          <div className="flex items-center gap-2 pr-3 pb-2">
            {/* Prompt Enhancer */}
            <button
              type="button"
              className="group p-2 hover:bg-[#2d2d44] rounded-xl transition-all duration-300 text-gray-500 hover:text-purple-400"
              title="Enhance prompt with AI"
            >
              <Wand2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || disabled || isSending || isOverLimit}
              className={`group relative p-2.5 rounded-xl transition-all duration-300 ${
                input.trim() && !isOverLimit
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                  : 'bg-[#2d2d44] text-gray-500 cursor-not-allowed'
              } ${isSending ? 'animate-pulse' : ''}`}
            >
              {isSending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="hidden sm:flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-[#2d2d44] rounded text-[10px] font-mono">Enter</kbd>
              <span>Send</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-[#2d2d44] rounded text-[10px] font-mono">⇧</kbd>
              <kbd className="px-1.5 py-0.5 bg-[#2d2d44] rounded text-[10px] font-mono">Enter</kbd>
              <span>New line</span>
            </span>
          </div>

          {/* Character Counter */}
          <div className={`text-xs font-mono transition-colors ${isOverLimit ? 'text-red-400' : isNearLimit ? 'text-yellow-400' : 'text-gray-500'}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </div>
        </div>
      </form>
    </div>
  );
}
