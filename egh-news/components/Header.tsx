export default function Header() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-black border-b-4 border-yellow-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-extrabold text-yellow-400">
            EGH NEWS
          </h1>

          <p className="mt-1 text-lg text-white">
            EverybodyGoHear
          </p>

          <p className="text-sm italic text-gray-400">
            Hear It First. Know It First.
          </p>
        </div>

        {/* Right Side */}
        <div className="text-right">
          <p className="font-bold text-red-500">
            🔴 LIVE
          </p>

          <p className="mt-2 text-sm text-white">
            {today}
          </p>

          <p className="mt-2 text-sm text-yellow-400">
            Ghana • Africa • World
          </p>
        </div>
      </div>
    </header>
  );
}
