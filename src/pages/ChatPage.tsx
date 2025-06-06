import React, { useEffect, useRef } from 'react';
import { MessageCircle, Brain, Zap } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import ChatSidebar from '../components/chat/ChatSidebar';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';

export default function ChatPage() {
  const {
    sessions,
    currentSession,
    isLoading,
    createNewSession,
    sendMessage,
    deleteSession,
    selectSession
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    }
  }, [sessions.length, createNewSession]);

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        sessions={sessions}
        currentSession={currentSession}
        onNewSession={() => createNewSession()}
        onSelectSession={selectSession}
        onDeleteSession={deleteSession}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                المساعد الذكي المتقدم
              </h1>
              <p className="text-sm text-gray-600">
                خبير في جميع المجالات العلمية والتقنية
              </p>
            </div>
            <div className="mr-auto flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                <Zap className="w-4 h-4" />
                <span>متصل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {currentSession ? (
            <div className="max-w-4xl mx-auto p-6">
              {currentSession.messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    مرحباً! كيف يمكنني مساعدتك؟
                  </h3>
                  <p className="text-gray-600 mb-6">
                    أنا مساعد ذكي متخصص في تقديم إجابات دقيقة ومفصلة في جميع المجالات
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h4 className="font-medium text-gray-900 mb-2">العلوم والتكنولوجيا</h4>
                      <p className="text-sm text-gray-600">
                        الفيزياء، الكيمياء، البرمجة، الذكاء الاصطناعي
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h4 className="font-medium text-gray-900 mb-2">الرياضيات والإحصاء</h4>
                      <p className="text-sm text-gray-600">
                        الجبر، التفاضل والتكامل، الإحصاء التطبيقي
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h4 className="font-medium text-gray-900 mb-2">التاريخ والأدب</h4>
                      <p className="text-sm text-gray-600">
                        التاريخ العربي والعالمي، الأدب والشعر
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h4 className="font-medium text-gray-900 mb-2">الفلسفة والاقتصاد</h4>
                      <p className="text-sm text-gray-600">
                        الفلسفة الحديثة، الاقتصاد الكلي والجزئي
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentSession.messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">اختر محادثة أو ابدأ محادثة جديدة</p>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        {currentSession && (
          <ChatInput
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}