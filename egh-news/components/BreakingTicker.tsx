"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticles } from "../lib/articles";

type Article = {
  id: number;
  headline: string;
  slug: string;
  published: boolean;
};

export default function BreakingTicker() {
  const [headlines, setHeadlines] = useState<Article[]>([]);

  useEffect(() => {
    async function loadBreakingNews() {
      try {
        const data = await getArticles();

        if (data) {
          const latest = data
            .filter((article: Article) => article.published)
            .slice(0, 10);

          setHeadlines(latest);
        }
      } catch (error) {
        console.error("Failed to load breaking news:", error);
      }
    }

    loadBreakingNews();
  }, []);

  return (
    <section className="overflow-hidden bg-red-700 text-white">

      <div className="mx-auto flex max-w-7xl items-center">

        <div className="bg-black px-5 py-3 font-extrabold whitespace-nowrap">
          🔴 BREAKING
        </div>

        <div className="overflow-hidden flex-1">

          <div
            className="flex whitespace-nowrap"
            style={{
              animation: "ticker 40s linear infinite",
            }}
          >
            {headlines.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="mx-8 hover:text-yellow-300"
              >
                {article.headline}
              </Link>
            ))}

            {headlines.map((article) => (
              <Link
                key={`repeat-${article.id}`}
                 href={`/news/${article.slug}`}
                className="mx-8 hover:text-yellow-300"
              >
                {article.headline}
              </Link>
            ))}
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes ticker {
          from {
            transform: translateX(0%);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </section>
  );
}