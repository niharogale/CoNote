'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Upload, 
  Plus, 
  X,
  Search
} from 'lucide-react';

interface Doc {
  id: string;
  name: string;
  subject: string;
  type: string;
  uploadedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function CreateGroupPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [invitedMembers, setInvitedMembers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [saveGroup, setSaveGroup] = useState(true);

  const [availableDocs] = useState<Doc[]>([
    {
      id: '1',
      name: 'Calculus Final Practice Doc',
      subject: 'Mathematics',
      type: 'Final',
      uploadedAt: '2 days ago'
    },
    {
      id: '2',
      name: 'Physics Midterm Review',
      subject: 'Physics',
      type: 'Midterm',
      uploadedAt: '1 week ago'
    },
    {
      id: '3',
      name: 'Chemistry Lab Doc',
      subject: 'Chemistry',
      type: 'Lab',
      uploadedAt: '3 days ago'
    }
  ]);

  const [suggestedUsers] = useState<User[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@docple.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@docple.com' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@docple.com' },
    { id: '4', name: 'Diana Prince', email: 'diana@docple.com' },
    { id: '5', name: 'Eve Wilson', email: 'eve@docple.com' }
  ]);

  const filteredUsers = suggestedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMember = (user: User) => {
    if (!invitedMembers.find(member => member.id === user.id)) {
      setInvitedMembers([...invitedMembers, user]);
    }
    setSearchTerm('');
  };

  const removeMember = (userId: string) => {
    setInvitedMembers(invitedMembers.filter(member => member.id !== userId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      groupName,
      selectedDoc,
      invitedMembers,
      isPublic,
      saveGroup
    });
    
    // Navigate to the new group session
    router.push('/groups/1/session');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/groups"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Study Group
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Set up a new study session with your peers
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Group Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Public group (anyone can join)
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={saveGroup}
                  onChange={(e) => setSaveGroup(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Save group for future use
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Doc Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Select Doc
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDoc?.id === doc.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {doc.subject} • {doc.type}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Uploaded {doc.uploadedAt}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link
              href="/doc/upload"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Upload className="w-4 h-4 mr-1" />
              Upload new doc
            </Link>
          </div>
        </div>

        {/* Invite Members */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Invite Members
          </h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Search Results */}
          {searchTerm && filteredUsers.length > 0 && (
            <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Suggested Users
              </h3>
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => addMember(user)}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invited Members */}
          {invitedMembers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Invited Members ({invitedMembers.length})
              </h3>
              <div className="space-y-2">
                {invitedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {member.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href="/groups"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!groupName || !selectedDoc}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Group & Start Session
          </button>
        </div>
      </form>
    </div>
  );
}
