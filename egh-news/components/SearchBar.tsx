"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-lg"
    >
      <input
        type="text"
        placeholder="Search EGH NEWS..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-l-lg border border-gray-300 px-4 py-2 text-black outline-none focus:border-yellow-500"
      />

      <button
        type="submit"
        className="rounded-r-lg bg-yellow-400 px-5 font-bold text-black hover:bg-yellow-500"
      >
        🔍
      </button>
    </form>
  );
}