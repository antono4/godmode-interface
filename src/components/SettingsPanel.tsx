import { useState } from 'react';
import { X, Moon, Bell, Keyboard, Info, Palette, Volume2 } from 'lucide-react';
import { AIProvider } from '../types/types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  providers: AIProvider[];
  onToggleProvider: (id: string) => void;
}

// Custom Toggle Component
function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: (val: boolean) => void; label?: string }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="group relative flex items-center"
      title={label}
    >
      <div 
        className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
          enabled 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30' 
            : 'bg-[#2d2d44]'
        }`}
      >
        <div 
          className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
            enabled ? 'left-6' : 'left-1'
          }`}
        />
      </div>
    </button>
  );
}

export default function SettingsPanel({ isOpen, onClose, providers, onToggleProvider }: SettingsPanelProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  if (!isOpen) return null;

  const shortcuts = [
    { name: 'New Chat', keys: ['⌘', 'R'] },
    { name: 'Refresh All', keys: ['⌘', '⇧', 'R'] },
    { name: 'Send Message', keys: ['Enter'] },
    { name: 'New Line', keys: ['⇧', 'Enter'] },
    { name: 'Toggle Provider Selector', keys: ['⌘', 'S'] },
    { name: 'Close Modal', keys: ['Esc'] },
  ];

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
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <p className="text-sm text-gray-500">Customize your experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2d2d44] rounded-xl transition-all duration-200 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 -mr-2 custom-scrollbar">
          
          {/* Appearance Section */}
          <section>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Moon size={14} className="text-purple-400" />
              Appearance
            </h3>
            <div className="bg-[#16162a] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-xs text-gray-500 mt-0.5">Use dark theme for better viewing</p>
                </div>
                <Toggle enabled={darkMode} onChange={setDarkMode} label="Toggle dark mode" />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Bell size={14} className="text-purple-400" />
              Notifications
            </h3>
            <div className="bg-[#16162a] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2d2d44] flex items-center justify-center">
                    <Volume2 size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Sound Effects</p>
                    <p className="text-xs text-gray-500 mt-0.5">Play sounds on actions</p>
                  </div>
                </div>
                <Toggle enabled={soundEffects} onChange={setSoundEffects} label="Toggle sound effects" />
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts Section */}
          <section>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Keyboard size={14} className="text-purple-400" />
              Keyboard Shortcuts
            </h3>
            <div className="bg-[#16162a] rounded-xl overflow-hidden">
              {shortcuts.map((shortcut, index) => (
                <div 
                  key={shortcut.name}
                  className={`flex items-center justify-between p-4 ${index !== shortcuts.length - 1 ? 'border-b border-[#2d2d44]/50' : ''}`}
                >
                  <span className="text-white">{shortcut.name}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <kbd 
                        key={i}
                        className="px-2.5 py-1 bg-[#2d2d44] rounded-lg text-xs text-gray-300 font-mono"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Providers Section */}
          <section>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
              Active Providers
            </h3>
            <div className="space-y-2">
              {providers.map((provider) => (
                <label
                  key={provider.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    provider.enabled 
                      ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30' 
                      : 'bg-[#16162a] hover:bg-[#2d2d44]/50 border border-transparent'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${provider.color}30` }}
                  >
                    {provider.icon}
                  </div>
                  <span className="text-white flex-1 font-medium">{provider.name}</span>
                  <Toggle 
                    enabled={provider.enabled} 
                    onChange={() => onToggleProvider(provider.id)} 
                    label={`Toggle ${provider.name}`}
                  />
                </label>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="pt-4 border-t border-[#2d2d44]/50">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Info size={14} className="text-purple-400" />
              About
            </h3>
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="text-white font-bold">GodMode Interface</p>
                  <p className="text-xs text-purple-400">Version 1.0.0</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                A unified interface for accessing multiple AI chat services simultaneously.
                Inspired by the smol-ai/GodMode project.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <a 
                  href="https://github.com/antono4/godmode-interface" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#2d2d44] hover:bg-[#3d3d54] rounded-lg text-xs text-gray-300 transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://github.com/antono4/godmode-interface/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#2d2d44] hover:bg-[#3d3d54] rounded-lg text-xs text-gray-300 transition-colors"
                >
                  Report Issue
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
