"use client";

import { useCMS } from "../context/CMSContext";

// Inline createArticle to avoid missing module import
async function createArticle(data: Record<string, any>) {
  const res = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to create article: ${res.status} ${text}`);
  }

  return res.json();
}

export default function PublishPanel() {
  const {
    headline,
    summary,
    author,
    category,
    imageUrl,
    content,
    featured,
    published,
  } = useCMS();

  async function handlePublish() {
    if (!headline.trim()) {
      alert("Please enter a headline.");
      return;
    }

    if (!summary.trim()) {
      alert("Please enter a summary.");
      return;
    }

    if (!content.trim()) {
      alert("Please write the article content.");
      return;
    }

    const slug = headline
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    try {
      await createArticle({
        headline,
        summary,
        category,
        image_url: imageUrl,
        author: author || "EGH NEWS",
        featured,
        published,
        content,
        slug,
      });

      alert("🎉 Article published successfully!");

      window.location.href = `/news/${slug}`;

    } catch (error) {
      console.error(error);
      alert("Failed to publish article.");
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Publish
      </h2>

      <label className="mb-5 flex items-center gap-3">
        <input
          type="checkbox"
          checked={featured}
          onChange={() => {}}
          readOnly
        />
        Featured Story
      </label>

      <label className="mb-8 flex items-center gap-3">
        <input
          type="checkbox"
          checked={published}
          onChange={() => {}}
          readOnly
        />
        Publish Immediately
      </label>

      <button
        className="mb-3 w-full rounded-lg bg-yellow-400 py-3 font-bold"
      >
        Save Draft
      </button>

      <button
        onClick={handlePublish}
        className="w-full rounded-lg bg-black py-3 font-bold text-white hover:bg-gray-800"
      >
        Publish
      </button>

    </div>
  );
}