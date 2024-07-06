import { Link } from "@remix-run/react";
import jordan from "~/assets/images/jordan.png";

const links = [
  {
    label: "Find a store",
    href: "/stores",
  },
  {
    label: "Join Us",
    href: "/sign-up",
  },
  {
    label: "Sign In",
    href: "/sign-in",
  },
];

export function NavHeader() {
  return (
    <div className="w-full h-full flex items-center justify-between bg-[#f5f5f5] px-8 py-2">
      <img className="w-5 h-5" src={jordan} alt="Jordan" />
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
