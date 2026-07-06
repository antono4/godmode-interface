import { RefreshCw, Settings } from 'lucide-react';

interface HeaderProps {
  onNewChat: () => void;
  onSettings: () => void;
  onRefresh: () => void;
}

export default function Header({ onNewChat, onSettings, onRefresh }: HeaderProps) {
  return (
    <header className="bg-[#1a1a2e] border-b border-[#2d2d44] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🐣</span>
          GodMode
        </h1>
        <span className="text-xs text-gray-500 bg-[#2d2d44] px-2 py-1 rounded">
          AI Chat Browser
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-[#2d2d44] rounded-lg transition-colors text-gray-400 hover:text-white"
          title="Refresh all"
        >
          <RefreshCw size={18} />
        </button>
        <button
          onClick={onNewChat}
          className="px-3 py-1.5 bg-[#4a4a6a] hover:bg-[#5a5a7a] rounded-lg text-sm text-white transition-colors"
        >
          New Chat
        </button>
        <button
          onClick={onSettings}
          className="p-2 hover:bg-[#2d2d44] rounded-lg transition-colors text-gray-400 hover:text-white"
          title="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
