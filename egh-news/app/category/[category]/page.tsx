"use client";

import { use, useEffect, useState } from "react";
import { getArticlesByCategory } from "../../../lib/articles";
import NewsCard from "../../../components/NewsCard";
import type { Article } from "../../../types/article";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadCategory() {
      const data = await getArticlesByCategory(category);

      if (data) {
        setArticles(data);
      }
    }

    loadCategory();
  }, [category]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-extrabold capitalize">
        {category} News
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {articles.length > 0 ? (
          articles.map((article) => (
            <NewsCard
              key={article.id}
              title={article.headline}
              category={article.category}
              slug={article.slug}
              summary={article.summary}
              author={article.author}
              image={article.image_url}
              date={article.created_at}
            />
          ))
        ) : (
          <p>No articles found in this category.</p>
        )}
      </div>

    </main>
  );
}