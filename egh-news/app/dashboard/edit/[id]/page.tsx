"use client";

import { use, useEffect, useState } from "react";
import { getArticleById, updateArticle } from "../../../../lib/articles";
import type { Article } from "../../../../types/article";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      const data = await getArticleById(Number(id));
      setArticle(data);
    }
    loadArticle();
  }, [id]);

  async function handleSave() {
    if (!article) return;

    setSaving(true);
    try {
      // Update the existing row by id — keeps the original slug,
      // so it never collides with itself.
      await updateArticle(article.id, {
        headline: article.headline,
        summary: article.summary,
        content: article.content,
        category: article.category,
        image_url: article.image_url,
        video_url: article.video_url,
        author: article.author,
        featured: article.featured,
        published: article.published,
        slug: article.slug,
      });

      alert("Article updated successfully!");
    } catch (error: any) {
      console.error("Update error message:", error?.message);
      console.error("Update error details:", error?.details);
      console.error("Update error hint:", error?.hint);
      console.error("Update error code:", error?.code);
      alert(`Failed to update article: ${error?.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl p-10">
        <h1 className="text-3xl font-bold">Loading article...</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-extrabold">Edit Article</h1>

      <input
        value={article.headline}
        onChange={(e) => setArticle({ ...article, headline: e.target.value })}
        className="mb-4 w-full rounded border p-3"
      />

      <textarea
        value={article.content}
        onChange={(e) => setArticle({ ...article, content: e.target.value })}
        rows={12}
        className="w-full rounded border p-3"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 rounded bg-yellow-400 px-6 py-3 font-bold hover:bg-yellow-500 disabled:opacity-50"
      >
        {saving ? "Saving..." : "💾 Save Changes"}
      </button>
    </main>
  );
}