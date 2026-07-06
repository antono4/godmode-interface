import { X } from 'lucide-react';
import { AIProvider } from '../types/types';

interface ProviderSelectorProps {
  providers: AIProvider[];
  selectedProviders: string[];
  onToggle: (id: string) => void;
  onClose: () => void;
}

export default function ProviderSelector({ providers, selectedProviders, onToggle, onClose }: ProviderSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2d2d44] w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Select AI Providers</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#2d2d44] rounded transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-2">
          {providers.map((provider) => (
            <label
              key={provider.id}
              className="flex items-center gap-3 p-3 bg-[#16162a] rounded-lg cursor-pointer hover:bg-[#2d2d44] transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedProviders.includes(provider.id)}
                onChange={() => onToggle(provider.id)}
                className="w-5 h-5 rounded border-gray-500 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-[#2d2d44]"
              />
              <span className="text-xl">{provider.icon}</span>
              <span className="text-white flex-1">{provider.name}</span>
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-300"
                onClick={(e) => e.stopPropagation()}
              >
                {provider.url}
              </a>
            </label>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-[#2d2d44]">
          <p className="text-sm text-gray-500">
            Select the AI services you want to display. Changes will take effect immediately.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-[#6366f1] hover:bg-[#5558e3] rounded-lg text-white font-medium transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
