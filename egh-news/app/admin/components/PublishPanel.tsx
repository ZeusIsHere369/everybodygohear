"use client";

import { createArticle } from "../../../lib/articles";
import { useCMS } from "../context/CMSContext";

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
      alert("Please write the article.");
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
        <input type="checkbox" checked={featured} readOnly />
        Featured Story
      </label>

      <label className="mb-8 flex items-center gap-3">
        <input type="checkbox" checked={published} readOnly />
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