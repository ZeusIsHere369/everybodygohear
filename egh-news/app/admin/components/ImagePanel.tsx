"use client";

export default function ImagePanel() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-bold">
        Featured Image
      </h2>

      <input
        type="text"
        placeholder="https://example.com/image.jpg"
        className="w-full rounded-lg border p-3"
      />

    </div>
  );
}