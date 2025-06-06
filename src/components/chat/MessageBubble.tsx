import React from 'react';
import { Bot, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 0.8) return 'text-green-500';
    if (confidence >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceIcon = (confidence?: number) => {
    if (!confidence) return null;
    if (confidence >= 0.8) return <CheckCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.isUser ? 'bg-indigo-600' : 'bg-gray-600'
      }`}>
        {message.isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      <div className={`flex-1 max-w-[80%] ${message.isUser ? 'text-right' : 'text-right'}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          message.isUser
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <div className="whitespace-pre-wrap leading-relaxed">
            {message.text}
          </div>
        </div>

        <div className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${
          message.isUser ? 'justify-end' : 'justify-start'
        }`}>
          <Clock className="w-3 h-3" />
          <span>{formatTime(message.timestamp)}</span>
          
          {message.metadata?.confidence && (
            <>
              <span className="mx-1">•</span>
              <div className={`flex items-center gap-1 ${getConfidenceColor(message.metadata.confidence)}`}>
                {getConfidenceIcon(message.metadata.confidence)}
                <span>دقة {Math.round(message.metadata.confidence * 100)}%</span>
              </div>
            </>
          )}
        </div>

        {message.metadata?.sources && message.metadata.sources.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-medium">المصادر: </span>
            {message.metadata.sources.join(', ')}
          </div>
        )}

        {message.metadata?.relatedTopics && message.metadata.relatedTopics.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {message.metadata.relatedTopics.map((topic, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}