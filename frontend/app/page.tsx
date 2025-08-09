import Link from "next/link";

export default function Home() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
          Collaborate on notes, in real-time
        </h1>
        <p className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70">
          CoNotes helps teams capture ideas, organize knowledge, and edit together
          without friction. Share, comment, and co-edit notes live.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm sm:text-base hover:opacity-90"
          >
            Get started free
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 text-sm sm:text-base"
          >
            Go to dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2">
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
          <h3 className="text-lg font-medium">Real-time editing</h3>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            See changes appear instantly as your teammates type. Powered by
            WebSockets and CRDT-friendly design.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
          <h3 className="text-lg font-medium">Group workspaces</h3>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Create groups for classes or teams, and keep notes neatly organized
            with roles and permissions.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
          <h3 className="text-lg font-medium">Comments & mentions</h3>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Discuss ideas inline and bring teammates in with @mentions.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
          <h3 className="text-lg font-medium">Fast search</h3>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Find notes, groups, and people instantly with intelligent search.
          </p>
        </div>
      </div>
    </section>
  );
}
