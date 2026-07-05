"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-extrabold">
        EGH NEWS Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <Link
          href="/newsroom"
          className="rounded-xl bg-yellow-400 p-6 text-center font-bold shadow hover:bg-yellow-500"
        >
          📰 Publish Article
        </Link>

        <div className="rounded-xl bg-white p-6 text-center shadow">
          ✏️ Manage Articles
          <p className="mt-2 text-sm text-gray-600">
            Coming Soon
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow">
          ⭐ Featured Story
          <p className="mt-2 text-sm text-gray-600">
            Coming Soon
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow">
          📊 Statistics
          <p className="mt-2 text-sm text-gray-600">
            Coming Soon
          </p>
        </div>

      </div>

    </main>
  );
}