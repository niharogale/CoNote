'use client';

import { useState } from 'react';
import { 
  Send, 
  Bot, 
  TrendingUp, 
  Users, 
  Lightbulb,
  MessageSquare,
  FileText,
  BarChart3,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Insight {
  id: string;
  type: 'progress' | 'group' | 'recommendation';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI study assistant. I can help you with:\n\n• Understanding difficult concepts\n• Explaining problem-solving approaches\n• Summarizing study sessions\n• Identifying knowledge gaps\n• Suggesting study strategies\n\nWhat would you like help with today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const insights: Insight[] = [
    {
      id: '1',
      type: 'progress',
      title: 'Study Progress',
      description: 'You\'ve improved 15% in calculus problems this week',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'group',
      title: 'Group Dynamics',
      description: 'Your group excels at collaborative problem-solving',
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Recommended Topics',
      description: 'Focus on integration techniques next session',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'text-purple-600'
    }
  ];

  const quickPrompts = [
    "Explain the chain rule in calculus",
    "Help me understand integration by parts",
    "Summarize our last study session",
    "What are my weak areas in physics?",
    "Suggest study strategies for finals"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I understand you're asking about that topic. Let me provide a comprehensive explanation that builds on what you've been studying in your group sessions. This connects to the integration techniques we discussed in your last calculus session...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bot className="w-8 h-8 mr-3 text-purple-600" />
            AI Study Assistant
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Get personalized help, insights, and study recommendations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat with AI
            </h2>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && (
                      <Bot className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Prompts
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your studies..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              AI Insights
            </h2>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start gap-3">
                    <div className={`${insight.color} mt-1`}>
                      {insight.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {insight.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Summaries */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Recent Summaries
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                  Calculus Study Session
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Covered integration techniques, group solved 8 problems
                </p>
                <div className="flex items-center mt-2 text-xs text-blue-600 dark:text-blue-400">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  2 hours ago
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-medium text-green-900 dark:text-green-100 text-sm">
                  Physics Lab Review
                </h3>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  Discussed wave mechanics, identified common misconceptions
                </p>
                <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  1 day ago
                </div>
              </div>
            </div>
          </div>

          {/* Study Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
              Study Recommendations
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Review differential equations before next session
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Practice more word problems in physics
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Schedule group session for chemistry lab prep
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
