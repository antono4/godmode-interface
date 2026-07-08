import { ExternalLink, EyeOff, X, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { AIProvider } from '../types/types';

interface AIProviderFrameProps {
  provider: AIProvider;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  isLoading?: boolean;
  onIframeLoad?: () => void;
}

export default function AIProviderFrame({ 
  provider, 
  onRemove, 
  onToggle, 
  isLoading,
  onIframeLoad 
}: AIProviderFrameProps) {
  const handleIframeLoad = () => {
    onIframeLoad?.();
  };

  return (
    <div className="flex flex-col h-full bg-[#16162a] rounded-xl overflow-hidden border border-[#2d2d44]/50 shadow-xl shadow-black/20 group">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b backdrop-blur-sm transition-all duration-300"
        style={{ 
          borderColor: '#2d2d44', 
          backgroundColor: `${provider.color}20` 
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ backgroundColor: `${provider.color}30` }}
          >
            {provider.icon}
          </div>
          <div>
            <span className="font-medium text-white">{provider.name}</span>
            <div 
              className="w-2 h-2 rounded-full mt-0.5"
              style={{ backgroundColor: provider.color }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href={provider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white"
            title="Open in new tab"
          >
            <ExternalLink size={14} />
          </a>
          <button
            onClick={() => onToggle(provider.id)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white"
            title={provider.enabled ? 'Minimize' : 'Maximize'}
          >
            {provider.enabled ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={() => onRemove(provider.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-gray-400 hover:text-red-400"
            title="Close panel"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {provider.enabled ? (
          <>
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-[#16162a] flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-3">
                    <div 
                      className="absolute inset-0 rounded-full border-2 opacity-25"
                      style={{ borderColor: provider.color }}
                    />
                    <Loader2 
                      className="absolute inset-0 w-12 h-12 animate-spin" 
                      style={{ color: provider.color }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">Loading {provider.name}...</p>
                </div>
              </div>
            )}
            
            {/* iframe */}
            <iframe
              src={provider.url}
              className="w-full h-full border-0"
              title={provider.name}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-forms"
              onLoad={handleIframeLoad}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#2d2d44]/50 flex items-center justify-center">
                <EyeOff size={28} className="opacity-50" />
              </div>
              <p className="text-white font-medium mb-1">{provider.name} minimized</p>
              <p className="text-sm text-gray-500 mb-4">This panel is currently hidden</p>
              <button
                onClick={() => onToggle(provider.id)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500 hover:to-blue-500 rounded-lg text-sm text-white transition-all duration-300"
              >
                Show panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
