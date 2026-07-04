"use client";

import type { Article } from "../types/article";
import { useEffect, useState } from "react";
import { getArticles } from "../lib/articles";
import NewsCard from "./NewsCard";



export default function NewsGrid() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      const data = await getArticles();

      if (data) {
        const publishedArticles = data.filter(
          (article: Article) => article.published
        );

        setArticles(publishedArticles);
      }
    }

    loadArticles();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">

      <h2 className="mb-6 text-3xl font-bold">
        Latest News
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        {articles.length > 0 ? (
          articles.map((article) => (
           <NewsCard
              key={article.id}
              category={article.category}
              title={article.headline}
              summary={article.summary}
              author={article.author}
              image={article.image_url}
              date={new Date(article.created_at).toLocaleDateString()} slug={""}/>
          ))
        ) : (
          <p className="text-gray-600">
            No published articles yet.
          </p>
        )}

      </div>

    </section>
  );
}
