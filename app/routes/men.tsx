import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPaginatedProducts } from "~/lib/getPaginatedProducts";
import { PaginatedProductGrid } from "~/modules/Product";
import { IProduct, IProductsResponse } from "~/shared/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  return getPaginatedProducts(request.url, `category="Men's Shoes"`);
};

export default function MenProducts() {
  const { paginatedProducts: initialProducts } =
    useLoaderData<IProductsResponse>();
  const [products, setProducts] = useState<IProduct[]>(initialProducts.items);
  const fetcher = useFetcher<IProductsResponse>();

  return (
    <PaginatedProductGrid
      initialProducts={initialProducts}
      products={products}
      setProducts={setProducts}
      fetcher={fetcher}
      route="men"
    />
  );
}
