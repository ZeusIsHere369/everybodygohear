"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import {
  getArticleBySlug,
  getGalleryImages,
} from "../../../lib/articles";
import RelatedArticles from "../../../components/RelatedArticles";
import ImageGallery from "../../../components/ImageGallery";

type Article = {
  id: number;
  slug: string;
  headline: string;
  summary: string;
  category: string;
  image_url: string;
  author: string;
  published: boolean;
  content: string;
  created_at: string;
};

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [article, setArticle] = useState<Article | null>(null);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    async function loadArticle() {
      const data = await getArticleBySlug(slug);

  if (data) {
    setArticle(data);

    const images = await getGalleryImages(data.id);

    setGallery(images);
  }
}
    loadArticle();
  }, [slug]);

  if (!article) {
    return (
      <main className="mx-auto max-w-5xl p-10">
        <h1 className="text-3xl font-bold">Loading article...</h1>
      </main>
    );
  }

  const articleUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      {/* Category */}
      <span className="inline-block rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white">
        {article.category}
      </span>

      {/* Headline */}
      <h1 className="mt-5 text-5xl font-extrabold leading-tight text-black md:text-6xl">
        {article.headline}
      </h1>

      {/* Summary */}
      <p className="mt-5 text-2xl text-gray-600">
        {article.summary}
      </p>

      {/* Author */}
      <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-gray-300 pb-6 text-gray-500">

        <span className="font-semibold">
          ✍️ {article.author}
        </span>

        <span>
          📅 {new Date(article.created_at).toLocaleDateString()}
        </span>

        <span>
          ⏱️ 5 min read
        </span>

      </div>

      {/* Hero Image */}
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.headline}
          className="mt-8 h-[500px] w-full rounded-2xl object-cover shadow-xl"
        />
      )}

      {/* Share Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white"
        >
          Facebook
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-green-600 px-5 py-2 font-bold text-white"
        >
          WhatsApp
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-black px-5 py-2 font-bold text-white"
        >
          X
        </a>

        <button
          onClick={() => {
            navigator.clipboard.writeText(articleUrl);
            alert("Article link copied!");
          }}
          className="rounded-lg bg-yellow-400 px-5 py-2 font-bold text-black hover:bg-yellow-500"
        >
          Copy Link
        </button>

      </div>

      {/* Article Body */}
      <article
        className="prose prose-lg mt-10 max-w-none"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
      {gallery.length > 0 && (
        <>
          <ImageGallery images={gallery} />
          
          <h2 className="mb-6 mt-10 text-3xl font-bold">
            📸 Photo Gallery
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl bg-white shadow-lg"
              >
                <img
                  src={image.image_url}
                  alt={image.caption}
                  className="h-80 w-full object-cover"
                />

                {image.caption && (
                  <p className="p-4 text-gray-600">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <RelatedArticles currentSlug={article.slug} />

    </main>
  );
}