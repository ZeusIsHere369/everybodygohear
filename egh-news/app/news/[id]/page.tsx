"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { getArticleById } from "../../../lib/articles";

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

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function loadArticle() {
      const data = await getArticleById(Number(id));
      setArticle(data);
    }

    loadArticle();
  }, [id]);

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl p-10">
        <h1 className="text-3xl font-bold">Loading article...</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <span className="rounded bg-red-600 px-3 py-1 text-sm font-bold text-white">
        {article.category}
      </span>

      <h1 className="mt-4 text-5xl font-extrabold">
        {article.headline}
      </h1>

      <p className="mt-3 text-gray-500">
        By {article.author} •{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.headline}
          className="mt-8 h-[450px] w-full rounded-xl object-cover"
        />
      )}

      <div className="mt-8 text-lg leading-8 text-gray-700">
        <p>{article.summary}</p>
      </div>
    </main>
  );
}