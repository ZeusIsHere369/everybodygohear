"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticles, deleteArticle } from "../../lib/articles";
import type { Article } from "../../types/article";

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      const data = await getArticles();

      if (data) {
        setArticles(data);
      }
    }

    loadArticles();
  }, []);
  async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this article?"
  );

  if (!confirmed) return;

  try {
    await deleteArticle(id);

    const updated = await getArticles();
    setArticles(updated);
  } catch (error) {
    console.error(error);
    alert("Failed to delete article.");
  }
}

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-extrabold">
        EGH NEWS Dashboard
      </h1>

      <div className="mb-8">
        <Link
          href="/newsroom"
          className="rounded-lg bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-500"
        >
          + Publish New Article
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-black text-white">

            <tr>
              <th className="px-4 py-3 text-left">Headline</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Published</th>
              <th className="px-4 py-3 text-left">Featured</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {articles.map((article) => (
              <tr
                key={article.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {article.headline}
                </td>

                <td className="px-4 py-3">
                  {article.category}
                </td>

                <td className="px-4 py-3">
                  {article.published ? "✅" : "❌"}
                </td>

                <td className="px-4 py-3">
                  {article.featured ? "⭐" : "-"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}