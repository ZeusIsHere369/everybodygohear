"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticles } from "../lib/articles";

type Article = {
  id: number;
  headline: string;
  slug: string;
  category: string;
  published: boolean;
};

export default function Sidebar() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadTrending() {
      const data = await getArticles();

      if (data) {
        const published = data
          .filter((article: Article) => article.published)
          .slice(0, 5);

        setArticles(published);
      }
    }

    loadTrending();
  }, []);

  return (
    <aside className="rounded-xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-extrabold">
        🔥 Trending Stories
      </h2>

      <div className="space-y-5">

        {articles.map((article, index) => (

          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="block border-b pb-4 transition hover:text-red-600"
          >

            <div className="mb-2 text-xs font-bold uppercase text-red-600">
              #{index + 1} • {article.category}
            </div>

            <h3 className="font-bold leading-6">
              {article.headline}
            </h3>

          </Link>

        ))}

      </div>

    </aside>
  );
}