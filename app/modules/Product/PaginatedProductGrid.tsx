import { FetcherWithComponents } from "@remix-run/react";
import { SetStateAction, useEffect } from "react";
import { IPaginated, IProduct, IProductsResponse } from "~/shared/interfaces";
import { ProductsGrid } from "~/shared/ui";
import { InfiniteScroller } from "~/shared/ui/infinite-scroller";

interface Props {
  initialProducts: IPaginated<IProduct>;
  products: IProduct[];
  setProducts: React.Dispatch<SetStateAction<IProduct[]>>;
  fetcher: FetcherWithComponents<IProductsResponse>;
  route?: string;
}

export const PaginatedProductGrid: React.FC<Props> = ({
  initialProducts,
  products,
  setProducts,
  fetcher,
  route = "index",
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
      <ProductsGrid products={products} />
    </InfiniteScroller>
  );
};
