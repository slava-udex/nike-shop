import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPaginatedSneakers } from "~/lib/getPaginatedSneakers";
import { PaginatedSneakerGrid } from "~/modules";
import { MobileSearchInput } from "~/modules/Search";
import { ISneaker, ISneakersResponse } from "~/shared/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  return getPaginatedSneakers(request.url);
};

export default function SearchPage() {
  const { paginatedSneakers: initialSneakers } =
    useLoaderData<ISneakersResponse>();
  const [sneakers, setSneakers] = useState<ISneaker[]>(initialSneakers.items);
  const fetcher = useFetcher<ISneakersResponse>();

  return (
    <div className="min-h-screen flex flex-col p-4 gap-4">
      <h1 className="text-3xl font-bold">Search for...</h1>
      <MobileSearchInput />
      <PaginatedSneakerGrid
        initialSneakers={initialSneakers}
        sneakers={sneakers}
        setSneakers={setSneakers}
        fetcher={fetcher}
        route="search"
      />
    </div>
  );
}
