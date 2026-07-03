type NewsCardProps = {
  title: string;
  category: string;
};

export default function NewsCard({
  title,
  category,
}: NewsCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">

      <div className="flex h-48 items-center justify-center bg-gray-300">
        Image
      </div>

      <div className="p-5">

        <span className="text-sm font-bold uppercase text-red-600">
          {category}
        </span>

        <h3 className="mt-2 text-xl font-bold">
          {title}
        </h3>

        <p className="mt-3 text-gray-600">
          This is where the article summary will appear.
        </p>

      </div>

    </div>
  );
}
