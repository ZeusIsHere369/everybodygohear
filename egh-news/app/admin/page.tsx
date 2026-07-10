export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      <header className="bg-black p-6">
        <h1 className="text-4xl font-bold text-yellow-400">
          EGH NEWS CMS
        </h1>

        <p className="text-gray-300">
          EverybodyGoHear Newsroom
        </p>
      </header>

      <section className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg mt-10">

        <h2 className="mb-6 text-3xl font-bold">
          Create New Article
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
              rows={6}
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
              Featured Image
            </label>

            <div>
              <label className="mb-2 block font-semibold">Featured Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="rounded-lg bg-yellow-400 px-6 py-3 font-bold text-black">Save Draft</button>
            <button className="rounded-lg bg-black px-6 py-3 font-bold text-white">Publish</button>
          </div>

        </div>

      </section>

    </main>
  );
}