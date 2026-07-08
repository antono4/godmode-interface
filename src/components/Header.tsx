import { RefreshCw, Settings, Zap, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNewChat: () => void;
  onSettings: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export default function Header({ onNewChat, onSettings, onRefresh, isLoading }: HeaderProps) {
  return (
    <header className="bg-[#1a1a2e]/90 backdrop-blur-md border-b border-[#2d2d44]/50 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a2e] animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            GodMode
            <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 rounded-full border border-purple-500/30">
              BETA
            </span>
          </h1>
          <p className="text-xs text-gray-500">Multi-AI Chat Interface</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Tooltip Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="group relative p-2.5 hover:bg-[#2d2d44] rounded-xl transition-all duration-300 text-gray-400 hover:text-white disabled:opacity-50"
          title="Refresh all panels"
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#0f0f1a] text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#2d2d44]">
            Refresh (⌘⇧R)
          </span>
        </button>

        {/* Keyboard Shortcut Info */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#16162a] rounded-lg border border-[#2d2d44]/50">
          <kbd className="px-1.5 py-0.5 bg-[#2d2d44] rounded text-[10px] text-gray-400 font-mono">⌘</kbd>
          <span className="text-[10px] text-gray-500">+</span>
          <kbd className="px-1.5 py-0.5 bg-[#2d2d44] rounded text-[10px] text-gray-400 font-mono">R</kbd>
          <span className="text-[10px] text-gray-500 ml-1">New Chat</span>
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          disabled={isLoading}
          className="group relative px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-sm text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            New Chat
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>

        {/* Settings Button */}
        <button
          onClick={onSettings}
          className="group relative p-2.5 hover:bg-[#2d2d44] rounded-xl transition-all duration-300 text-gray-400 hover:text-white"
          title="Settings"
        >
          <Settings size={18} className="group-hover:rotate-45 transition-transform duration-300" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#0f0f1a] text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#2d2d44]">
            Settings
          </span>
        </button>
      </div>
    </header>
  );
}
