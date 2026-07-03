type NewsCardProps = {
  title: string;
  category: string;
  summary?: string;
  author?: string;
  image?: string;
  date?: string;
};

export default function NewsCard({
  title,
  category,
  summary,
  author,
  image,
  date,
}: NewsCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">

      {/* Article Image */}
      <div className="h-48 w-full overflow-hidden bg-gray-300">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-bold text-gray-600">
            No Image
          </div>
        )}
      </div>

      <div className="p-5">

        <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold uppercase text-white">
          {category}
        </span>

        <h3 className="mt-3 text-xl font-bold text-black">
          {title}
        </h3>

        <p className="mt-3 text-gray-600">
          {summary ?? "No summary available."}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{author ?? "EGH NEWS"}</span>
          <span>{date ?? ""}</span>
        </div>

        <button className="mt-5 rounded-lg bg-yellow-400 px-4 py-2 font-bold text-black transition hover:bg-yellow-500">
          Read More
        </button>

      </div>

    </div>
  );
}