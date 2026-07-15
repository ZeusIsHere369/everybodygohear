"use client";

import {
  createArticle,
  updateArticle,
  saveGalleryImages,
} from "../../../lib/articles";
import { useCMS } from "../context/CMSContext";

export default function PublishPanel() {
  const {
    articleId,
    headline,
    summary,
    author,
    category,
    imageUrl,
    videoUrl,
    content,
    featured,
    setFeatured,
    published,
    setPublished,
    galleryImages,
    resetCMS,
  } = useCMS() as any;

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
      const articleData = {
        headline,
        summary,
        category,
        image_url: imageUrl,
        video_url: videoUrl,
        author: author || "EGH NEWS",
        featured,
        published,
        content,
        slug,
      };

      // If we already have an articleId, we're editing an existing
      // article — update that row instead of inserting a new one.
      const article = articleId
        ? await updateArticle(articleId, articleData)
        : await createArticle(articleData);

      if (galleryImages.length > 0) {
        await saveGalleryImages(
          article.id,
          galleryImages
            .filter((url: string) => url.trim() !== "")
            .map((url: string) => ({
              image_url: url,
            }))
        );
      }

      const wasEditing = Boolean(articleId);

      alert(
        wasEditing
          ? "✅ Article updated successfully!"
          : "🎉 Article published successfully!"
      );

      // Clear the form and articleId so the next save starts fresh
      // instead of accidentally overwriting this article again.
      resetCMS();

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
        {articleId ? "Update" : "Publish"}
      </button>

    </div>
  );
}