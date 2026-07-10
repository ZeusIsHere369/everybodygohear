import Link from "next/link";
export default function Navbar() {
 const links = [
  { name: "Home", href: "/" },
  { name: "Breaking", href: "/category/Breaking" },
  { name: "Politics", href: "/category/Politics" },
  { name: "Sports", href: "/category/Sports" },
  { name: "Business", href: "/category/Business" },
  { name: "Markets", href: "/category/Markets" },
  { name: "Entertainment", href: "/category/Entertainment" },
  { name: "World", href: "/category/World" },
  { name: "Technology", href: "/category/Technology" },
  { name: "Contact", href: "/contact" },
];
  return (
    <nav className="bg-yellow-400 shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 py-4">
        {links.map((link) => (
         <Link
  key={link.name}
  href={link.href}
  className="font-semibold text-black transition hover:text-red-700"
>
  {link.name}
</Link>
        ))}
      </div>
    </nav>
  );
}