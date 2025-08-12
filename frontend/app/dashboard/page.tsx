'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Users, 
  BookOpen, 
  Bot, 
  Clock, 
  Star,
  Upload,
  Play,
  History
} from 'lucide-react';

interface SavedGroup {
  id: string;
  name: string;
  members: string[];
  lastActive: string;
  docType: string;
}

interface RecentSession {
  id: string;
  groupName: string;
  docName: string;
  duration: string;
  participants: number;
  date: string;
}

export default function DashboardPage() {
  const [savedGroups] = useState<SavedGroup[]>([
    {
      id: '1',
      name: 'Calculus Study Group',
      members: ['Alice', 'Bob', 'Charlie'],
      lastActive: '2 hours ago',
      docType: 'Calculus Final'
    },
    {
      id: '2',
      name: 'Physics Lab Team',
      members: ['David', 'Eve', 'Frank'],
      lastActive: '1 day ago',
      docType: 'Physics Midterm'
    }
  ]);

  const [recentSessions] = useState<RecentSession[]>([
    {
      id: '1',
      groupName: 'Calculus Study Group',
      docName: 'Calculus Final Practice',
      duration: '2h 15m',
      participants: 3,
      date: 'Today'
    },
    {
      id: '2',
      groupName: 'Physics Lab Team',
      docName: 'Physics Midterm Review',
      duration: '1h 45m',
      participants: 4,
      date: 'Yesterday'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Study Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Start a new session or continue where you left off
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/groups/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Study Session
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/groups/create"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Start New Session
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create a new study group
              </p>
            </div>
            <Play className="w-8 h-8 text-blue-600" />
          </div>
        </Link>

        <Link
          href="/doc/upload"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Upload Doc
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Add new practice material
              </p>
            </div>
            <Upload className="w-8 h-8 text-green-600" />
          </div>
        </Link>

        <Link
          href="/ai-assistant"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                AI Assistant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Get help and insights
              </p>
            </div>
            <Bot className="w-8 h-8 text-purple-600" />
          </div>
        </Link>

        <Link
          href="/groups"
          className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                My Groups
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage study groups
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </Link>
      </div>

      {/* Saved Groups */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Saved Groups
          </h2>
          <Link
            href="/groups"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedGroups.map((group) => (
            <div
              key={group.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {group.docType}
                  </p>
                  <div className="flex items-center mt-2">
                    <Users className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {group.members.length} members
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {group.lastActive}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/groups/${group.id}/session`}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Join
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <History className="w-5 h-5 mr-2 text-gray-500" />
            Recent Sessions
          </h2>
          <Link
            href="/groups/history"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {session.groupName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.docName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {session.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {session.participants} participants
                </div>
                <div>{session.date}</div>
                <Link
                  href={`/groups/${session.id}/summary`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Summary
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Preview */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Bot className="w-5 h-5 mr-2 text-purple-600" />
            AI Insights
          </h2>
          <Link
            href="/ai-assistant"
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Explore more
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Study Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                             You&apos;ve improved 15% in calculus problems this week
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Group Dynamics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your group excels at collaborative problem-solving
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Recommended Topics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Focus on integration techniques next session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




