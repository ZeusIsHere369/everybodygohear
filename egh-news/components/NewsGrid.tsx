import NewsCard from "./NewsCard";

export default function NewsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">

      <h2 className="mb-6 text-3xl font-bold">
        Latest News
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        <NewsCard
          category="Politics"
          title="Political headlines will appear here."
        />

        <NewsCard
          category="Sports"
          title="Sports headlines will appear here."
        />

        <NewsCard
          category="Business"
          title="Business headlines will appear here."
        />

      </div>

    </section>
  );
}