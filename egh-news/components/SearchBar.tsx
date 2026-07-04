"use client";

import { useState } from "react";
import { searchArticles } from "../lib/articles";
import Link from "next/link";
import type { Article } from "../types/article";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);

  async function handleSearch(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const data = await searchArticles(value);
    setResults(data);
  }

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search EGH NEWS..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500"
      />

      {results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border bg-white shadow-lg">
          {results.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="block border-b p-4 hover:bg-gray-100"
            >
              <p className="font-bold">{article.headline}</p>
              <p className="text-sm text-gray-600">
                {article.category}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}