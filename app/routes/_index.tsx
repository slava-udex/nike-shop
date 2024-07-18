import { LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getPaginatedSneakers } from "~/lib/pagination";
import { useToast } from "~/lib/use-toast";
import { ISneakersResponse } from "~/shared/interfaces";
import { ISneaker } from "~/shared/interfaces/sneaker";
import { SneakerGrid } from "~/shared/ui";
import { InfiniteScroller } from "~/shared/ui/infinite-scroller";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  return getPaginatedSneakers(request.url);
};

export default function Index() {
  const { paginatedSneakers: initialSneakers } =
    useLoaderData<ISneakersResponse>();
  const [sneakers, setSneakers] = useState<ISneaker[]>(initialSneakers.items);
  const fetcher = useFetcher<ISneakersResponse>();

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

    if (fetcher.state === "loading" || !fetcher.data) {
      return;
    }

    const newSneakers = fetcher.data.paginatedSneakers.items;

    setSneakers((prevSneakers) => [...prevSneakers, ...newSneakers]);
  }, [fetcher.data, fetcher.state, isSuccess, toast, setSneakers]);

  const loadNext = () => {
    const page = fetcher.data
      ? fetcher.data.paginatedSneakers.page + 1
      : initialSneakers.page + 1;
    const query = `?index&page=${page}`;
    fetcher.load(query); // this call will trigger the loader with a new query
  };

  return (
    <InfiniteScroller loadNext={loadNext} loading={fetcher.state === "loading"}>
      <SneakerGrid sneakers={sneakers} />;
    </InfiniteScroller>
  );
}
