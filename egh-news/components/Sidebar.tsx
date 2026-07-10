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
            className="block border-b border-gray-200 pb-5"
          >

            <div className="mb-2 flex items-center gap-2">

  <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
    #{index + 1}
  </span>

  <span className="text-xs font-bold uppercase text-gray-500">
    {article.category}
  </span>

</div>

            <h3 className="text-lg font-bold leading-6 transition hover:text-red-600">
              {article.headline}
            </h3>

          </Link>

        ))}

      </div>

    </aside>
  );
}