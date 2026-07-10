"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchArticles } from "../../lib/articles";

type Article = {
  id: number;
  headline: string;
  summary: string;
  slug: string;
  image_url: string;
  category: string;
  author: string;
  created_at: string;
};

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";

  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      setLoading(true);

      const data = await searchArticles(query);

      if (data) {
        setResults(data);
      }

      setLoading(false);
    }

    if (query) {
      loadResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">

      <h1 className="text-4xl font-extrabold">
        Search Results
      </h1>

      <p className="mt-2 mb-8 text-gray-600">
        Searching for:
        <span className="font-bold"> "{query}"</span>
      </p>

      {loading && (
        <p className="text-lg">Searching...</p>
      )}

      {!loading && results.length === 0 && (
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            No articles found.
          </h2>

          <p className="mt-3 text-gray-600">
            Try a different keyword.
          </p>
        </div>
      )}

      <div className="space-y-8">

        {results.map((article) => (

          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="block rounded-xl bg-white p-6 shadow transition hover:shadow-xl"
          >

            <div className="flex gap-6">

              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.headline}
                  className="h-40 w-56 rounded-lg object-cover"
                />
              )}

              <div>

                <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {article.category}
                </span>

                <h2 className="mt-3 text-2xl font-bold">
                  {article.headline}
                </h2>

                <p className="mt-3 text-gray-600">
                  {article.summary}
                </p>

                <div className="mt-4 text-sm text-gray-500">
                  {article.author} •{" "}
                  {new Date(
                    article.created_at
                  ).toLocaleDateString()}
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}