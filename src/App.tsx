import { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import InputBar from './components/InputBar';
import AIProviderFrame from './components/AIProviderFrame';
import ProviderSelector from './components/ProviderSelector';
import SettingsPanel from './components/SettingsPanel';
import Toast from './components/Toast';
import { defaultProviders } from './providers/defaultProviders';
import { AIProvider } from './types/types';

export default function App() {
  const [providers, setProviders] = useState<AIProvider[]>(defaultProviders);
  const [showProviderSelector, setShowProviderSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const enabledProviders = providers.filter((p) => p.enabled);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleNewChat = useCallback(() => {
    setIsLoading(true);
    enabledProviders.forEach((provider) => {
      const iframe = document.querySelector(`iframe[title="${provider.name}"]`) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = provider.url;
        setIframeLoaded(prev => ({ ...prev, [provider.id]: false }));
      }
    });
    showToast('Starting new conversation...', 'info');
  }, [enabledProviders, showToast]);

  const handleRefresh = useCallback(() => {
    enabledProviders.forEach((provider) => {
      const iframe = document.querySelector(`iframe[title="${provider.name}"]`) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = iframe.src;
        setIframeLoaded(prev => ({ ...prev, [provider.id]: false }));
      }
    });
    showToast('Refreshing all panels...', 'info');
  }, [enabledProviders, showToast]);

  const handleRemoveProvider = useCallback((id: string) => {
    const provider = providers.find(p => p.id === id);
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: false } : p))
    );
    showToast(`${provider?.name || 'Provider'} removed`, 'info');
  }, [providers, showToast]);

  const handleToggleProvider = useCallback((id: string) => {
    const provider = providers.find(p => p.id === id);
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
    showToast(`${provider?.name} ${provider?.enabled ? 'hidden' : 'visible'}`, 'success');
  }, [providers, showToast]);

  const handleSendMessage = useCallback((message: string) => {
    console.log('Message to send:', message);
    showToast('Message sent to all providers!', 'success');
  }, [showToast]);

  const handleIframeLoad = useCallback((id: string) => {
    setIsLoading(false);
    setIframeLoaded(prev => ({ ...prev, [id]: true }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'r':
            e.preventDefault();
            handleNewChat();
            break;
          case 's':
            e.preventDefault();
            setShowProviderSelector(true);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNewChat]);

  // Close modals on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showProviderSelector) setShowProviderSelector(false);
        if (showSettings) setShowSettings(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showProviderSelector, showSettings]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#0f0f1a]">
      <Header
        onNewChat={handleNewChat}
        onSettings={() => setShowSettings(true)}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {/* Provider Selector Button */}
      <div className="px-4 py-3 bg-[#16162a]/80 backdrop-blur-sm border-b border-[#2d2d44]/50">
        <button
          onClick={() => setShowProviderSelector(true)}
          className="group text-sm text-gray-400 hover:text-purple-400 flex items-center gap-2 transition-all duration-300 hover:gap-3"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-medium">{enabledProviders.length} AI{enabledProviders.length !== 1 ? 's' : ''} active</span>
          <span className="text-gray-600 group-hover:text-gray-500">|</span>
          <span className="group-hover:underline">Manage providers</span>
          <svg className="w-4 h-4 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Main Content - Split Panes */}
      <div ref={containerRef} className="flex-1 p-4 overflow-hidden">
        {enabledProviders.length === 0 ? (
          <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-5xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No AI Providers Selected</h2>
              <p className="text-gray-400 mb-6">Select at least one AI provider to start chatting with multiple AI assistants simultaneously.</p>
              <button
                onClick={() => setShowProviderSelector(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                Select Providers
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 h-full">
            {enabledProviders.map((provider, index) => (
              <div
                key={provider.id}
                className="flex-1 min-w-0 animate-slide-up"
                style={{
                  flexBasis: `${100 / enabledProviders.length}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <AIProviderFrame
                  provider={provider}
                  onRemove={handleRemoveProvider}
                  onToggle={handleToggleProvider}
                  isLoading={!iframeLoaded[provider.id]}
                  onIframeLoad={() => handleIframeLoad(provider.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <InputBar onSend={handleSendMessage} />

      {/* Modals */}
      {showProviderSelector && (
        <ProviderSelector
          providers={providers}
          selectedProviders={enabledProviders.map((p) => p.id)}
          onToggle={handleToggleProvider}
          onClose={() => setShowProviderSelector(false)}
        />
      )}

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        providers={providers}
        onToggleProvider={handleToggleProvider}
      />

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
