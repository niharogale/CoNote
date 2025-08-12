'use client';

import { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  PenTool, 
  Bot, 
  Mic, 
  MicOff,
  Video,
  VideoOff,
  Settings,
  Share,
  Download,
  BookOpen,
  Lightbulb,
  Send,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isSpeaking: boolean;
  currentPage: number;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'annotation' | 'ai';
}

interface StudySessionClientProps {
  groupId: string;
}

export default function StudySessionClient({ groupId }: StudySessionClientProps) {
  const [activeTab, setActiveTab] = useState<'pdf' | 'whiteboard' | 'chat'>('pdf');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [currentPage] = useState(1);
  const [totalPages] = useState(12);
  const [chatMessage, setChatMessage] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const [members] = useState<Member[]>([
    { id: '1', name: 'Alice Johnson', avatar: 'AJ', isOnline: true, isSpeaking: false, currentPage: 1 },
    { id: '2', name: 'Bob Smith', avatar: 'BS', isOnline: true, isSpeaking: true, currentPage: 2 },
    { id: '3', name: 'Charlie Brown', avatar: 'CB', isOnline: true, isSpeaking: false, currentPage: 1 },
    { id: '4', name: 'You', avatar: 'ME', isOnline: true, isSpeaking: false, currentPage: 1 }
  ]);

  const [messages] = useState<Message[]>([
    { id: '1', userId: '1', userName: 'Alice Johnson', content: 'Can someone explain problem 3?', timestamp: new Date(Date.now() - 300000), type: 'text' },
    { id: '2', userId: '2', userName: 'Bob Smith', content: 'I think it uses integration by parts', timestamp: new Date(Date.now() - 240000), type: 'text' },
    { id: '3', userId: 'ai', userName: 'AI Assistant', content: 'Let me help with problem 3. It involves using the formula ∫udv = uv - ∫vdu. Would you like me to walk through the steps?', timestamp: new Date(Date.now() - 180000), type: 'ai' },
    { id: '4', userId: '3', userName: 'Charlie Brown', content: 'Thanks! That makes sense now', timestamp: new Date(Date.now() - 120000), type: 'text' }
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add message logic here
      setChatMessage('');
    }
  };

  const handleAISubmit = () => {
    if (aiPrompt.trim()) {
      // AI interaction logic here
      setAiPrompt('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Calculus Study Group
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculus Final Practice Doc
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member) => (
                  <div
                    key={member.id}
                    className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium ${
                      member.isOnline ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {members.length} members
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-lg transition-colors ${
                isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-2 rounded-lg transition-colors ${
                isVideoOff ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'pdf'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Doc PDF
                </button>
                <button
                  onClick={() => setActiveTab('whiteboard')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'whiteboard'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <PenTool className="w-4 h-4 inline mr-2" />
                  Whiteboard
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Page {currentPage} of {totalPages}</span>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 relative">
            {activeTab === 'pdf' && (
              <div className="h-full bg-white dark:bg-gray-800 p-4">
                <div className="h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Calculus Final Practice Doc
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Page {currentPage} - Integration Problems
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Previous
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whiteboard' && (
              <div className="h-full bg-white dark:bg-gray-800 p-4">
                <div className="h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PenTool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Collaborative Whiteboard
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Draw, write, and solve problems together
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setShowAI(!showAI)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                showAI
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4 inline mr-2" />
              AI Help
            </button>
          </div>

          {/* Chat Messages */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.userId === 'ME' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.type === 'ai'
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
                          : message.userId === 'ME'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {message.type === 'ai' && (
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="w-3 h-3" />
                          <span className="text-xs font-medium">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'ai' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Assistant */}
          {showAI && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    I can help you with problem-solving, explanations, and study strategies. What would you like to know?
                  </p>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Explain current problem
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Get step-by-step explanation
                    </p>
                  </button>

                  <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Show similar problems
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Find practice problems
                    </p>
                  </button>

                  <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Summarize session
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Get session overview
                    </p>
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAISubmit()}
                    placeholder="Ask AI for help..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleAISubmit}
                    disabled={!aiPrompt.trim()}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
