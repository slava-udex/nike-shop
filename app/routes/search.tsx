import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPaginatedProducts } from "~/lib/getPaginatedProducts";
import { PaginatedProductGrid } from "~/modules/Product";
import { MobileSearchInput } from "~/modules/Search";
import { IProduct, IProductsResponse } from "~/shared/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  return getPaginatedProducts(request.url);
};

export default function SearchPage() {
  const { paginatedProducts: initialProducts } =
    useLoaderData<IProductsResponse>();
  const [products, setProducts] = useState<IProduct[]>(initialProducts.items);
  const fetcher = useFetcher<IProductsResponse>();

  return (
    <div className="min-h-screen flex flex-col p-4 gap-4">
      <h1 className="text-3xl font-bold">Search for...</h1>
      <MobileSearchInput />
      <PaginatedProductGrid
        initialProducts={initialProducts}
        products={products}
        setProducts={setProducts}
        fetcher={fetcher}
        route="search"
      />
    </div>
  );
}
