"use client";

import { useCMS } from "../context/CMSContext";

export default function ImagePanel() {
  const {
    imageUrl,
    setImageUrl,
  } = useCMS();

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Featured Image
      </h2>

      <input
        type="text"
        placeholder="Paste Image URL..."
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

    </div>
  );
}