"use client";

export default function PublishPanel() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Publish
      </h2>

      <label className="mb-4 flex items-center gap-2">
        <input type="checkbox" />
        Featured Story
      </label>

      <label className="mb-6 flex items-center gap-2">
        <input type="checkbox" />
        Published
      </label>

      <button className="mb-3 w-full rounded-lg bg-yellow-400 py-3 font-bold">
        Save Draft
      </button>

      <button className="w-full rounded-lg bg-black py-3 font-bold text-white">
        Publish
      </button>

    </div>
  );
}