export interface AIProvider {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  enabled: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  providerId: string;
}
