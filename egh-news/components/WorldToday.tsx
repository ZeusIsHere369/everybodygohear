"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticlesByCategory } from "../lib/articles";
import type { Article } from "../types/article";

export default function WorldToday() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadNews() {
      const world = await getArticlesByCategory("World");
      setArticles((world ?? []).slice(0, 5));
    }

    loadNews();
  }, []);

  return (
    <section className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        🌍 World Today
      </h2>

      <ul className="space-y-4">

        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/news/${article.slug}`}
                className="font-semibold hover:text-red-600"
              >
                {article.headline}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500">
            No world news available.
          </li>
        )}

      </ul>

    </section>
  );
}