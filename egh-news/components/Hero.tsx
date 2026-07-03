"use client";

import { useEffect, useState } from "react";
import { getArticles } from "../lib/articles";

type Article = {
  id: number;
  headline: string;
  summary: string;
  category: string;
  image_url: string;
  author: string;
  published: boolean;
  created_at: string;
};

export default function Hero() {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function loadHero() {
      const articles = await getArticles();

      if (articles.length > 0) {
        setArticle(articles[0]);
      }
    }

    loadHero();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-8 md:grid-cols-2">

        {/* Image */}
        <div className="flex h-96 items-center justify-center overflow-hidden rounded-xl bg-gray-300">
          {article?.image_url ? (
            <img
              src={article.image_url}
              alt={article.headline}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-xl font-bold text-gray-700">
              Featured Image
            </div>
          )}
        </div>

        {/* Story */}
        <div className="flex flex-col justify-center">

          <span className="mb-3 w-fit rounded bg-red-600 px-3 py-1 text-sm font-bold text-white">
            {article?.category ?? "TOP STORY"}
          </span>

          <h2 className="mb-4 text-5xl font-extrabold text-black">
            {article?.headline ?? "Welcome to EverybodyGoHear (EGH NEWS)"}
          </h2>

          <p className="mb-6 text-lg text-gray-700">
            {article?.summary ??
              "EGH NEWS is Ghana's next-generation digital news platform, bringing readers breaking news, politics, sports, entertainment, business, markets and world news — all in one place."}
          </p>

          <button className="w-fit rounded-lg bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-500">
            Read Full Story
          </button>

        </div>

      </div>
    </section>
  );
}
