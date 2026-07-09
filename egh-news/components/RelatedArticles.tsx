"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRelatedArticles } from "../lib/articles";

type Article = {
  id: number;
  headline: string;
  summary: string;
  slug: string;
  image_url: string;
  category: string;
  author: string;
  created_at: string;
};

type RelatedArticlesProps = {
  currentSlug: string;
};

export default function RelatedArticles({
  currentSlug,
}: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getRelatedArticles(currentSlug);
        if (data) setArticles(data);
      } catch (err) {
        // ignore
      }
    }
    loadArticles();
  }, [currentSlug]);

  if (!articles || articles.length === 0) return null;

  return (
    <section>
      <h3>📰 You May Also Like</h3>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
           <Link
  href={`/news/${article.slug}`}
  className="block"
>

  {article.image_url && (
    <img
      src={article.image_url}
      alt={article.headline}
    />
 )}

  <div>{article.category}</div>

  <h4>{article.headline}</h4>

  <p>{article.summary}</p>

  <small>{article.author}</small>

</Link>
          </li>
        ))}
      </ul>
    </section>
      );
    }