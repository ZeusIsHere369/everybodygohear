"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticles, deleteArticle } from "../../../lib/articles";
import { useCMS } from "../context/CMSContext";

type Article = {
  id: number;
  headline: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  slug: string;
  featured: boolean;
  published: boolean;
  created_at: string;
};

export default function ManageArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  const {
    setHeadline,
    setSummary,
    setAuthor,
    setCategory,
    setImageUrl,
    setContent,
    setFeatured,
    setPublished,
    setEditingId,
    setIsEditing,
  } = useCMS();

  async function loadArticles() {
    const data = await getArticles();

    if (data) {
      setArticles(data);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  function handleEdit(article: Article) {
    setHeadline(article.headline);
    setSummary(article.summary);
    setAuthor(article.author);
    setCategory(article.category);
    setImageUrl(article.image_url);
    setContent(article.content);
    setFeatured(article.featured);
    setPublished(article.published);

    setEditingId(article.id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Delete this article permanently?"
    );

    if (!confirmDelete) return;

    try {
      await deleteArticle(id);
      await loadArticles();

      alert("Article deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete article.");
    }
  }

  return (
    <div className="mt-10 rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        📰 Manage Articles
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          <thead>

            <tr className="border-b bg-gray-100">

              <th className="p-3 text-left">Headline</th>

              <th className="p-3 text-left">Category</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Author</th>

              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {articles.map((article) => (

              <tr
                key={article.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3 font-semibold">
                  {article.headline}
                </td>

                <td className="p-3">
                  {article.category}
                </td>

                <td className="p-3">

                  {article.published ? (

                    <span className="rounded bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      Published
                    </span>

                  ) : (

                    <span className="rounded bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
                      Draft
                    </span>

                  )}

                </td>

                <td className="p-3">
                  {article.author}
                </td>

                <td className="p-3">
                  {new Date(article.created_at).toLocaleDateString()}
                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/news/${article.slug}`}
                      className="rounded bg-blue-600 px-3 py-2 text-sm font-bold text-white hover:bg-blue-700"
                    >
                      👁
                    </Link>

                    <button
                      onClick={() => handleEdit(article)}
                      className="rounded bg-yellow-400 px-3 py-2 text-sm font-bold text-black hover:bg-yellow-500"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(article.id)}
                      className="rounded bg-red-600 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
                    >
                      🗑
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}