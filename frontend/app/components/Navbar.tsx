'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/60 backdrop-blur border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              CoNotes
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/my-groups" className="hover:underline">My Groups</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="px-3 py-1.5 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 text-sm">
              Log in
            </Link>
            <Link href="/register" className="px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm hover:opacity-90">
              Sign up
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2 text-sm">
            <Link href="/dashboard" className="px-2 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">Dashboard</Link>
            <Link href="/my-groups" className="px-2 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">My Groups</Link>
            <div className="h-px bg-black/10 dark:bg-white/10 my-2" />
            <Link href="/login" className="px-2 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">Log in</Link>
            <Link href="/register" className="px-2 py-2 rounded bg-black text-white dark:bg-white dark:text-black">Sign up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}


