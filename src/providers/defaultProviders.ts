import { AIProvider } from '../types/types';

export const defaultProviders: AIProvider[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '🤖',
    url: 'https://chat.openai.com',
    color: '#10a37f',
    enabled: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '🧠',
    url: 'https://claude.ai',
    color: '#d4a574',
    enabled: true,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: '🔍',
    url: 'https://www.perplexity.ai',
    color: '#6e51e0',
    enabled: true,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '✨',
    url: 'https://gemini.google.com',
    color: '#4285f4',
    enabled: true,
  },
  {
    id: 'copilot',
    name: 'Copilot',
    icon: '💻',
    url: 'https://copilot.microsoft.com',
    color: '#0078d4',
    enabled: false,
  },
];
