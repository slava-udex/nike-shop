import { FetcherWithComponents } from "@remix-run/react";
import { SetStateAction, useEffect } from "react";
import { IPaginated, ISneaker, ISneakersResponse } from "~/shared/interfaces";
import { SneakerGrid } from "~/shared/ui";
import { InfiniteScroller } from "~/shared/ui/infinite-scroller";

interface Props {
  initialSneakers: IPaginated<ISneaker>;
  sneakers: ISneaker[];
  setSneakers: React.Dispatch<SetStateAction<ISneaker[]>>;
  fetcher: FetcherWithComponents<ISneakersResponse>;
  route?: string;
}

export const PaginatedSneakerGrid: React.FC<Props> = ({
  initialSneakers,
  sneakers,
  setSneakers,
  fetcher,
  route = "index",
}) => {
  useEffect(() => {
    if (fetcher.state === "loading" || !fetcher.data) {
      return;
    }

    const newSneakers = fetcher.data.paginatedSneakers.items;

    setSneakers((prevSneakers) => [...prevSneakers, ...newSneakers]);
  }, [fetcher.data, fetcher.state, setSneakers]);

  const loadNext = () => {
    const page = fetcher.data
      ? fetcher.data.paginatedSneakers.page + 1
      : initialSneakers.page + 1;
    const query = `?${route}&page=${page}`;
    fetcher.load(query); // this call will trigger the loader with a new query
  };

  return (
    <InfiniteScroller loadNext={loadNext} loading={fetcher.state === "loading"}>
      <SneakerGrid sneakers={sneakers} />
    </InfiniteScroller>
  );
};
