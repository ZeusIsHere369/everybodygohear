"use client";

import { useEffect, useState } from "react";
import { getArticles } from "../../../lib/articles";

type Stats = {
  total: number;
  published: number;
  drafts: number;
  featured: number;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    drafts: 0,
    featured: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const articles = await getArticles();

      if (!articles) return;

      setStats({
        total: articles.length,
        published: articles.filter((a) => a.published).length,
        drafts: articles.filter((a) => !a.published).length,
        featured: articles.filter((a) => a.featured).length,
      });
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Articles",
      value: stats.total,
      icon: "📰",
    },
    {
      title: "Published",
      value: stats.published,
      icon: "🌍",
    },
    {
      title: "Drafts",
      value: stats.drafts,
      icon: "📝",
    },
    {
      title: "Featured",
      value: stats.featured,
      icon: "⭐",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow"
        >
          <div className="text-4xl">
            {card.icon}
          </div>

          <h3 className="mt-4 text-lg font-bold">
            {card.title}
          </h3>

          <p className="mt-2 text-4xl font-extrabold text-yellow-500">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}