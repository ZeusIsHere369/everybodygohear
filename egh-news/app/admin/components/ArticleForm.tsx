"use client";

export default function ArticleForm() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Article Details
      </h2>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-semibold">
            Headline
          </label>

          <input
            type="text"
            placeholder="Enter headline..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Summary
          </label>

          <textarea
            rows={5}
            placeholder="Write article summary..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select className="w-full rounded-lg border p-3">

            <option>Breaking</option>
            <option>Politics</option>
            <option>Business</option>
            <option>Sports</option>
            <option>Entertainment</option>
            <option>Markets</option>
            <option>Technology</option>
            <option>World</option>

          </select>

        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Author
          </label>

          <input
            type="text"
            placeholder="Reporter name..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Slug
          </label>

          <input
            type="text"
            placeholder="Generated automatically later..."
            className="w-full rounded-lg border bg-gray-100 p-3"
            disabled
          />
        </div>

      </div>

    </div>
  );
}