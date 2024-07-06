import { Link } from "@remix-run/react";
import { Menu, Package, ShoppingBag, Store } from "lucide-react";
import { Button, Sheet } from "~/components/ui/";
import { SheetContent, SheetFooter, SheetTrigger } from "~/components/ui/sheet";

const links = [
  {
    label: "New & Featured",
    href: "/new",
  },
  {
    label: "Men",
    href: "/men",
  },
  {
    label: "Women",
    href: "/women",
  },
  {
    label: "Kids",
    href: "/kids",
  },
  {
    label: "Sale",
    href: "/sale",
  },
  {
    label: "SNKRS",
    href: "/snkrs",
  },
];

const footerLinks = [
  {
    label: "Bag",
    href: "/cart",
    icon: <ShoppingBag />,
  },
  {
    label: "Orders",
    href: "/manage-orders",
    icon: <Package />,
  },
  {
    label: "Find a store",
    href: "/stores",
    icon: <Store />,
  },
];

export function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col py-8 gap-16 h-full relative">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-xl text-slate-950 ">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <p className="text-[#8D8D8D] text-center">
              Become a Nike Member for the best products, inspiration and
              stories in sport.
            </p>
            <div className="flex justify-center gap-6 py-4">
              <Link to="/sign-up">
                <Button className="rounded-full hover:bg-slate-900 hover:text-slate-100">
                  Join Us
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button className="rounded-full bg-white text-black border border-black hover:underline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <SheetFooter>
            <ul className="flex flex-col w-full gap-4 justify-center absolute bottom-10">
              {footerLinks.map((link) => (
                <li className="flex gap-2" key={link.href}>
                  {link.icon}
                  <Link className="font-medium" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}