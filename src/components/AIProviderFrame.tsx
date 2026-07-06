import { ExternalLink, Eye, EyeOff, X } from 'lucide-react';
import { AIProvider } from '../types/types';

interface AIProviderFrameProps {
  provider: AIProvider;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function AIProviderFrame({ provider, onRemove, onToggle }: AIProviderFrameProps) {
  return (
    <div className="flex flex-col h-full bg-[#16162a] rounded-lg overflow-hidden border border-[#2d2d44]">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: '#2d2d44', backgroundColor: `${provider.color}15` }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{provider.icon}</span>
          <span className="font-medium text-white">{provider.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={provider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
            title="Open in new tab"
          >
            <ExternalLink size={14} />
          </a>
          <button
            onClick={() => onToggle(provider.id)}
            className="p-1.5 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
            title={provider.enabled ? 'Hide iframe' : 'Show iframe'}
          >
            {provider.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
          <button
            onClick={() => onRemove(provider.id)}
            className="p-1.5 hover:bg-red-500/20 rounded transition-colors text-gray-400 hover:text-red-400"
            title="Remove"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {provider.enabled ? (
          <iframe
            src={provider.url}
            className="w-full h-full border-0"
            title={provider.name}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <EyeOff size={32} className="mx-auto mb-2 opacity-50" />
              <p>{provider.name} is hidden</p>
              <button
                onClick={() => onToggle(provider.id)}
                className="mt-2 text-sm text-purple-400 hover:underline"
              >
                Show iframe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
