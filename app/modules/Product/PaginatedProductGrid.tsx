import { FetcherWithComponents } from "@remix-run/react";
import { SetStateAction, useEffect } from "react";
import { cn } from "~/lib/utils";
import { IProduct, TProductsResponse } from "~/shared/interfaces";
import { InfiniteScroller, ProductsGrid } from "~/shared/ui";
import { Filtering } from "../Filtering";

interface Props {
  initialProducts: TProductsResponse;
  products: IProduct[];
  allProducts: IProduct[];
  setProducts: React.Dispatch<SetStateAction<IProduct[]>>;
  fetcher: FetcherWithComponents<{ paginatedProducts: TProductsResponse }>;
  route?: string;
  isPadding?: boolean;
}

export const PaginatedProductGrid: React.FC<Props> = ({
  initialProducts,
  products,
  allProducts,
  setProducts,
  fetcher,
  route = "index",
  isPadding = true,
}) => {
  useEffect(() => {
    if (fetcher.state === "loading" || !fetcher.data) {
      return;
    }

    const newProducts = fetcher.data.paginatedProducts.items;

    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
  }, [fetcher.data, fetcher.state, setProducts]);

  const loadNext = () => {
    const page = fetcher.data
      ? fetcher.data.paginatedProducts.page + 1
      : initialProducts.page + 1;
    const query = `?${route}&page=${page}`;
    fetcher.load(query); // this call will trigger the loader with a new query
  };

  return (
    <InfiniteScroller loadNext={loadNext} loading={fetcher.state === "loading"}>
      <div className={cn("flex", isPadding && "p-8")}>
        <Filtering allProducts={allProducts} />
        <ProductsGrid products={products} />
      </div>
    </InfiniteScroller>
  );
};
