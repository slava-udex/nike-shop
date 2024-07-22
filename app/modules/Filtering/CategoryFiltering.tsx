import { useLocation, useSearchParams } from "@remix-run/react";
import React from "react";
import { getFilterUrl } from "~/lib/getFilterUrl";
import { cn } from "~/lib/utils";
import { IProduct } from "~/shared/interfaces";

interface Props {
  products: IProduct[];
}

export const CategoryFiltering: React.FC<Props> = ({ products }) => {
  // unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const [params, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const activeCategory = params.get("category") || "";

  const handleCategoryClick = (category: string) => {
    const filter = { key: "category", value: category };
    const url = getFilterUrl(params, pathname, [filter]);
    setSearchParams(new URLSearchParams(url.split("?")[1]));
  };

  return (
    <div className="flex flex-col items-start">
      <h2 className="text-lg font-medium">Category Filtering</h2>
      {categories.map((category) => (
        <button
          key={category}
          className={cn(
            "text-zinc-500 underline-offset-4 hover:text-black hover:underline text-nowrap ",
            activeCategory === category ? "text-black underline" : ""
          )}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
