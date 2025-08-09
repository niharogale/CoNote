export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1" htmlFor="name">Name</label>
          <input id="name" type="text" className="w-full rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input id="email" type="email" className="w-full rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="password">Password</label>
          <input id="password" type="password" className="w-full rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2" />
        </div>
        <button type="submit" className="w-full rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2">Sign up</button>
      </form>
    </div>
  );
}

