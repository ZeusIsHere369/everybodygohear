"use client";

import { useCMS } from "../context/CMSContext";

export default function PublishPanel() {

  const {
    featured,
    setFeatured,

    published,
    setPublished,
  } = useCMS();

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Publish
      </h2>

      <label className="mb-5 flex items-center gap-3">

        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />

        Featured Story

      </label>

      <label className="mb-8 flex items-center gap-3">

        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />

        Publish Immediately

      </label>

      <button
        className="mb-3 w-full rounded-lg bg-yellow-400 py-3 font-bold"
      >
        Save Draft
      </button>

      <button
        className="w-full rounded-lg bg-black py-3 font-bold text-white"
      >
        Publish
      </button>

    </div>
  );
}