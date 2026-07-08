import { useState } from 'react';
import { X, Search, Check, ExternalLink, Sparkles } from 'lucide-react';
import { AIProvider } from '../types/types';

interface ProviderSelectorProps {
  providers: AIProvider[];
  selectedProviders: string[];
  onToggle: (id: string) => void;
  onClose: () => void;
}

export default function ProviderSelector({ providers, selectedProviders, onToggle, onClose }: ProviderSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = selectedProviders.length;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1a2e] rounded-2xl border border-[#2d2d44] w-full max-w-lg p-6 max-h-[85vh] overflow-hidden flex flex-col animate-slide-up shadow-2xl shadow-purple-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Providers</h2>
              <p className="text-sm text-gray-500">{selectedCount} selected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2d2d44] rounded-xl transition-all duration-200 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search providers..."
            className="w-full bg-[#16162a] border border-[#2d2d44] rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Provider List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 -mr-2 custom-scrollbar">
          {filteredProviders.map((provider) => {
            const isSelected = selectedProviders.includes(provider.id);
            return (
              <label
                key={provider.id}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30' 
                    : 'bg-[#16162a] hover:bg-[#2d2d44]/50 border border-transparent'
                }`}
              >
                {/* Checkbox */}
                <div className={`relative w-6 h-6 rounded-lg transition-all duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                    : 'bg-[#2d2d44]'
                }`}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(provider.id)}
                    className="sr-only"
                  />
                  <Check 
                    className={`absolute inset-0 m-auto w-4 h-4 text-white transition-all duration-300 ${
                      isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`} 
                  />
                </div>

                {/* Icon */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${provider.color}30` }}
                >
                  {provider.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{provider.name}</p>
                  <p className="text-xs text-gray-500 truncate">{provider.url}</p>
                </div>

                {/* Color indicator */}
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: provider.color }}
                />

                {/* External link */}
                <a
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-500 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                </a>
              </label>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#2d2d44]/50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
