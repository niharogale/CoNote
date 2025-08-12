'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Users, 
  Clock, 
  Star,
  MoreVertical,
  Search,
  BookOpen,
  Play,
  Edit
} from 'lucide-react';

interface Group {
  id: string;
  name: string;
  members: string[];
  docType: string;
  lastActive: string;
  isActive: boolean;
  isSaved: boolean;
  memberCount: number;
}

export default function GroupsPage() {
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Calculus Study Group',
      members: ['Alice', 'Bob', 'Charlie'],
      docType: 'Calculus Final',
      lastActive: '2 hours ago',
      isActive: true,
      isSaved: true,
      memberCount: 3
    },
    {
      id: '2',
      name: 'Physics Lab Team',
      members: ['David', 'Eve', 'Frank'],
      docType: 'Physics Midterm',
      lastActive: '1 day ago',
      isActive: false,
      isSaved: true,
      memberCount: 4
    },
    {
      id: '3',
      name: 'Chemistry Review',
      members: ['Grace', 'Henry', 'Ivy'],
      docType: 'Chemistry Final',
      lastActive: '3 hours ago',
      isActive: true,
      isSaved: false,
      memberCount: 3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'saved'>('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.docType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && group.isActive) ||
                         (filter === 'saved' && group.isSaved);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Study Groups
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your study groups and sessions
          </p>
        </div>
        <Link
          href="/groups/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Group
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'saved')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Groups</option>
            <option value="active">Active Sessions</option>
            <option value="saved">Saved Groups</option>
          </select>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {group.name}
                  </h3>
                  {group.isSaved && (
                    <Star className="w-4 h-4 text-yellow-500" />
                  )}
                  {group.isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {group.docType}
                </p>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                {group.memberCount} members
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                {group.lastActive}
              </div>
            </div>

            <div className="flex gap-2">
              {group.isActive ? (
                <Link
                  href={`/groups/${group.id}/session`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Join Session
                </Link>
              ) : (
                <Link
                  href={`/groups/${group.id}/session`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start Session
                </Link>
              )}
              
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No groups found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first study group to get started'
            }
          </p>
          {!searchTerm && filter === 'all' && (
            <Link
              href="/groups/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Group
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
