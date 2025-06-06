export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'code' | 'analysis' | 'explanation';
  metadata?: {
    topic?: string;
    confidence?: number;
    sources?: string[];
    relatedTopics?: string[];
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  topic?: string;
}

export interface AIResponse {
  text: string;
  confidence: number;
  sources: string[];
  relatedTopics: string[];
  followUpQuestions: string[];
}