import { LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getPaginatedProducts } from "~/lib/getPaginatedProducts";
import { useToast } from "~/lib/use-toast";
import { PaginatedProductGrid } from "~/modules/Product";
import { IProductsResponse } from "~/shared/interfaces";
import { IProduct } from "~/shared/interfaces";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  return getPaginatedProducts(request.url);
};

export default function Index() {
  const { paginatedProducts: initialProducts } =
    useLoaderData<IProductsResponse>();
  const [products, setProducts] = useState<IProduct[]>(initialProducts.items);
  const fetcher = useFetcher<IProductsResponse>();

  const { toast } = useToast();
  const params = useSearchParams()[0];
  const isSuccess = params.get("success");

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Log In",
        description: "Successfully logged in.",
      });
    }
  }, [isSuccess, toast]);

  return (
    <PaginatedProductGrid
      initialProducts={initialProducts}
      products={products}
      setProducts={setProducts}
      fetcher={fetcher}
    />
  );
}
