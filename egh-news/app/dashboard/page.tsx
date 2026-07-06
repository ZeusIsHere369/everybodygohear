"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { getArticles, deleteArticle } from "../../lib/articles";
import type { Article } from "../../types/article";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function initializeDashboard() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const data = await getArticles();

      if (data) {
        setArticles(data);
      }

      setLoading(false);
    }

    initializeDashboard();
  }, [router]);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) return;

    try {
      await deleteArticle(id);

      const updated = await getArticles();
      if (updated) {
        setArticles(updated);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete article.");
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl p-10">
        <h1 className="text-3xl font-bold">
          Checking editor access...
        </h1>
      </main>
    );
  }
  async function handleLogout() {
  await supabase.auth.signOut();
  router.push("/login");
}

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

  <div className="mb-8 flex items-center justify-between">

    <h1 className="text-4xl font-extrabold">
      EGH NEWS Dashboard
    </h1>

    <button
      onClick={handleLogout}
      className="rounded-lg bg-red-600 px-5 py-2 font-bold text-white hover:bg-red-700"
    >
      Logout
    </button>

  </div>

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
                <td className="px-4 py-3">{article.headline}</td>
                <td className="px-4 py-3">{article.category}</td>
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