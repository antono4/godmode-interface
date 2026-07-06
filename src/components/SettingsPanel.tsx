import { X, Moon, Bell, Keyboard, Info } from 'lucide-react';
import { AIProvider } from '../types/types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  providers: AIProvider[];
  onToggleProvider: (id: string) => void;
}

export default function SettingsPanel({ isOpen, onClose, providers, onToggleProvider }: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2d2d44] w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#2d2d44] rounded transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Appearance Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Moon size={14} />
            Appearance
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-[#16162a] rounded-lg">
              <span className="text-white">Dark Mode</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#2d2d44] rounded-full peer peer-checked:bg-[#6366f1] cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              </div>
            </label>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Bell size={14} />
            Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-[#16162a] rounded-lg">
              <span className="text-white">Sound Effects</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#2d2d44] rounded-full peer peer-checked:bg-[#6366f1] cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              </div>
            </label>
          </div>
        </div>

        {/* Keyboard Shortcuts Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Keyboard size={14} />
            Keyboard Shortcuts
          </h3>
          <div className="bg-[#16162a] rounded-lg divide-y divide-[#2d2d44]">
            <div className="flex items-center justify-between p-3">
              <span className="text-white">New Chat</span>
              <kbd className="px-2 py-1 bg-[#2d2d44] rounded text-sm text-gray-300">⌘ R</kbd>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-white">Refresh All</span>
              <kbd className="px-2 py-1 bg-[#2d2d44] rounded text-sm text-gray-300">⌘ ⇧ R</kbd>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-white">Send Message</span>
              <kbd className="px-2 py-1 bg-[#2d2d44] rounded text-sm text-gray-300">Enter</kbd>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-white">New Line</span>
              <kbd className="px-2 py-1 bg-[#2d2d44] rounded text-sm text-gray-300">⇧ Enter</kbd>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-white">Toggle Provider Selector</span>
              <kbd className="px-2 py-1 bg-[#2d2d44] rounded text-sm text-gray-300">⌘ S</kbd>
            </div>
          </div>
        </div>

        {/* Active Providers Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
            Active Providers
          </h3>
          <div className="space-y-2">
            {providers.map((provider) => (
              <label
                key={provider.id}
                className="flex items-center gap-3 p-3 bg-[#16162a] rounded-lg cursor-pointer hover:bg-[#2d2d44] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={provider.enabled}
                  onChange={() => onToggleProvider(provider.id)}
                  className="w-4 h-4 rounded border-gray-500 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-[#2d2d44]"
                />
                <span className="text-xl">{provider.icon}</span>
                <span className="text-white flex-1">{provider.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="pt-4 border-t border-[#2d2d44]">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Info size={14} />
            About
          </h3>
          <div className="bg-[#16162a] rounded-lg p-4">
            <p className="text-white font-medium">GodMode Interface</p>
            <p className="text-sm text-gray-500 mt-1">Version 1.0.0</p>
            <p className="text-sm text-gray-500 mt-2">
              A unified interface for accessing multiple AI chat services simultaneously.
              Inspired by the smol-ai/GodMode project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
