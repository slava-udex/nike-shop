import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPaginatedProducts } from "~/lib/getPaginatedProducts";
import { PaginatedProductGrid } from "~/modules/Product/";
import { IProduct, IProductsResponse } from "~/shared/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  return getPaginatedProducts(request.url, `category="Women's Shoes"`);
};

export default function WomenProducts() {
  const { paginatedProducts: initialProducts } =
    useLoaderData<IProductsResponse>();
  const [Products, setProducts] = useState<IProduct[]>(initialProducts.items);
  const fetcher = useFetcher<IProductsResponse>();

  return (
    <PaginatedProductGrid
      initialProducts={initialProducts}
      products={Products}
      setProducts={setProducts}
      fetcher={fetcher}
      route="women"
    />
  );
}
