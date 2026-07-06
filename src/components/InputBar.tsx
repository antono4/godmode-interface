import { useState } from 'react';
import { Send, Wand2 } from 'lucide-react';

interface InputBarProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function InputBar({ onSend, disabled }: InputBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-[#1a1a2e] border-t border-[#2d2d44] p-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-[#2d2d44] rounded-xl border border-[#3d3d54] focus-within:border-[#6366f1] transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            disabled={disabled}
            className="flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-3 pr-12 resize-none outline-none min-h-[48px] max-h-[200px]"
            rows={1}
          />
          <div className="flex items-center gap-1 pr-2">
            <button
              type="button"
              className="p-2 hover:bg-[#3d3d54] rounded-lg transition-colors text-gray-400 hover:text-purple-400"
              title="Prompt Critic (improve your prompt)"
            >
              <Wand2 size={18} />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="p-2 bg-[#6366f1] hover:bg-[#5558e3] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Press Enter to send to all AI services</span>
          <span>⌘R to start new conversation</span>
        </div>
      </form>
    </div>
  );
}
