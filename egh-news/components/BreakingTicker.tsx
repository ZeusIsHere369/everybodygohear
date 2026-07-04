"use client";

import { useEffect, useState } from "react";
import { getArticles } from "../lib/articles";

type Article = {
  id: number;
  headline: string;
  published: boolean;
};

export default function BreakingTicker() {
  const [headlines, setHeadlines] = useState<Article[]>([]);

  useEffect(() => {
    async function loadBreakingNews() {
      const data = await getArticles();

      if (data) {
        const latest = data
          .filter((article: Article) => article.published)
          .slice(0, 5);

        setHeadlines(latest);
      }
    }

    loadBreakingNews();
  }, []);

  return (
    <section className="bg-red-700 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">

        <span className="rounded bg-white px-2 py-1 text-sm font-bold text-red-700">
          BREAKING
        </span>

        <div className="text-sm md:text-base">
          {headlines.length > 0
            ? headlines.map((article) => article.headline).join("   •   ")
            : "Loading breaking news..."}
        </div>

      </div>
    </section>
  );
}