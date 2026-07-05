"use client";

import { use, useEffect, useState } from "react";
import { getArticleById, updateArticle, } from "../../../../lib/articles";
import type { Article } from "../../../../types/article";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
   async function handleSave() {
  if (!article) return;

  try {
    await updateArticle(article.id, article);

    alert("Article updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update article.");
  }
}
    loadArticle();
  }, [id]);

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl p-10">
        <h1 className="text-3xl font-bold">
          Loading article...
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-extrabold">
        Edit Article
      </h1>

      <input
        value={article.headline}
        onChange={(e) =>
          setArticle({
            ...article,
            headline: e.target.value,
          })
        }
        className="mb-4 w-full rounded border p-3"
      />

      <textarea
        value={article.content}
        onChange={(e) =>
          setArticle({
            ...article,
            content: e.target.value,
          })
        }
        rows={12}
        className="w-full rounded border p-3"
      />

    <button
  onClick={handleSave}
  className="mt-6 rounded bg-yellow-400 px-6 py-3 font-bold hover:bg-yellow-500"
>
  💾 Save Changes
</button>

    </main>
  );
}