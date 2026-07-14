"use client";

import {
  createArticle,
  saveGalleryImages,
} from "../../../lib/articles";
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
    setFeatured,
    published,
    setPublished,
    galleryImages,
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
      const article = await createArticle({
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
      if (galleryImages.length > 0) {
  await saveGalleryImages(
    article.id,
    galleryImages
      .filter((url) => url.trim() !== "")
      .map((url) => ({
        image_url: url,
      }))
  );
}

      alert("🎉 Article published successfully!");

      window.location.href = `/news/${slug}`;

    } catch (error: any) {
  console.error("Publish error message:", error?.message);
  console.error("Publish error details:", error?.details);
  console.error("Publish error hint:", error?.hint);
  console.error("Publish error code:", error?.code);
  alert(`Failed to publish article: ${error?.message || "Unknown error"}`);
}
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Publish
      </h2>

      <label className="mb-5 flex items-center gap-3">
        <input type="checkbox" checked={featured} onChange={() => setFeatured(!featured)} />
        Featured Story
      </label>

      <label className="mb-8 flex items-center gap-3">
        <input type="checkbox" checked={published} onChange={() => setPublished(!published)} />
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