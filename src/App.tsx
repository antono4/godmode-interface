import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import InputBar from './components/InputBar';
import AIProviderFrame from './components/AIProviderFrame';
import ProviderSelector from './components/ProviderSelector';
import SettingsPanel from './components/SettingsPanel';
import { defaultProviders } from './providers/defaultProviders';
import { AIProvider } from './types/types';

export default function App() {
  const [providers, setProviders] = useState<AIProvider[]>(defaultProviders);
  const [showProviderSelector, setShowProviderSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const enabledProviders = providers.filter((p) => p.enabled);

  const handleNewChat = useCallback(() => {
    enabledProviders.forEach((provider) => {
      const iframe = document.querySelector(`iframe[title="${provider.name}"]`) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = provider.url;
      }
    });
  }, [enabledProviders]);

  const handleRefresh = useCallback(() => {
    enabledProviders.forEach((provider) => {
      const iframe = document.querySelector(`iframe[title="${provider.name}"]`) as HTMLIFrameElement;
      if (iframe) {
        iframe.src = iframe.src;
      }
    });
  }, [enabledProviders]);

  const handleRemoveProvider = useCallback((id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: false } : p))
    );
  }, []);

  const handleToggleProvider = useCallback((id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    console.log('Message to send:', message);
    // In a real implementation, this would use postMessage API to communicate with iframes
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

  return (
    <div className="flex flex-col h-screen bg-[#1a1a2e]">
      <Header
        onNewChat={handleNewChat}
        onSettings={() => setShowSettings(true)}
        onRefresh={handleRefresh}
      />

      {/* Provider Selector Button */}
      <div className="px-4 py-2 bg-[#16162a] border-b border-[#2d2d44]">
        <button
          onClick={() => setShowProviderSelector(true)}
          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
        >
          <span>{enabledProviders.length} provider(s) active</span>
          <span className="text-gray-500">|</span>
          <span>Click to manage</span>
        </button>
      </div>

      {/* Main Content - Split Panes */}
      <div className="flex-1 p-4 overflow-hidden">
        {enabledProviders.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-xl text-gray-400 mb-4">No AI providers selected</p>
              <button
                onClick={() => setShowProviderSelector(true)}
                className="px-4 py-2 bg-[#6366f1] hover:bg-[#5558e3] rounded-lg text-white transition-colors"
              >
                Select Providers
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 h-full">
            {enabledProviders.map((provider) => (
              <div
                key={provider.id}
                className="flex-1 min-w-0"
                style={{
                  flexBasis: `${100 / enabledProviders.length}%`,
                }}
              >
                <AIProviderFrame
                  provider={provider}
                  onRemove={handleRemoveProvider}
                  onToggle={handleToggleProvider}
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
    </div>
  );
}
