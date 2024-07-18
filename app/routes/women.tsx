import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPaginatedSneakers } from "~/lib/getPaginatedSneakers";
import { PaginatedSneakerGrid } from "~/modules/Sneaker/";
import { ISneaker, ISneakersResponse } from "~/shared/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  return getPaginatedSneakers(request.url, `category="Women's Shoes"`);
};

export default function WomenSneakers() {
  const { paginatedSneakers: initialSneakers } =
    useLoaderData<ISneakersResponse>();
  const [sneakers, setSneakers] = useState<ISneaker[]>(initialSneakers.items);
  const fetcher = useFetcher<ISneakersResponse>();

  return (
    <PaginatedSneakerGrid
      initialSneakers={initialSneakers}
      sneakers={sneakers}
      setSneakers={setSneakers}
      fetcher={fetcher}
      route="women"
    />
  );
}
