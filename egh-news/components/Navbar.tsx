export default function Navbar() {
  const links = [
    "Home",
    "Breaking",
    "Politics",
    "Sports",
    "Business",
    "Markets",
    "Entertainment",
    "World",
    "Technology",
    "Contact",
  ];

  return (
    <nav className="bg-yellow-400 shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 py-4">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="font-semibold text-black transition hover:text-red-700"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}