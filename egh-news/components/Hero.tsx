export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-8 md:grid-cols-2">

        {/* Image Placeholder */}
        <div className="flex h-96 items-center justify-center rounded-xl bg-gray-300 text-gray-700 text-xl font-bold">
          Featured Image
        </div>

        {/* Story */}
        <div className="flex flex-col justify-center">

          <span className="mb-3 w-fit rounded bg-red-600 px-3 py-1 text-sm font-bold text-white">
            TOP STORY
          </span>

          <h2 className="mb-4 text-5xl font-extrabold text-black">
            Welcome to EverybodyGoHear (EGH NEWS)
          </h2>

          <p className="mb-6 text-lg text-gray-700">
            EGH NEWS is Ghana's next-generation digital news platform,
            bringing readers breaking news, politics, sports,
            entertainment, business, markets and world news —
            all in one place.
          </p>

          <button className="w-fit rounded-lg bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-500">
            Read Full Story
          </button>

        </div>

      </div>
    </section>
  );
}