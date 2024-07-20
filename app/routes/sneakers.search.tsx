import { LoaderFunction } from "@remix-run/node";
import {
  redirect,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { getRecommendationsByCategory } from "~/actions";
import { getRecommendations } from "~/actions/getRecommendations";
import { getPaginatedSneakers } from "~/lib/getPaginatedSneakers";
import { PaginatedSneakerGrid } from "~/modules";
import { Recommendations } from "~/modules/Cart";
import { ISneaker, ISneakersResponse } from "~/shared/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  console.log({ url: request.url });

  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");

  // if (!query) {
  //   return redirect("/");
  // }

  const filter = `title~"${query}" || category~"${query}"`;

  const { paginatedSneakers } = await getPaginatedSneakers(request.url, filter);

  // TODO: Get recommendations by the most popular
  const recommendations = await getRecommendationsByCategory("Men's Shoes");

  return { paginatedSneakers, recommendations };
};

export default function SneakersSearch() {
  const { paginatedSneakers: initialSneakers, recommendations } = useLoaderData<
    ISneakersResponse & { recommendations: ISneaker[] }
  >();
  const [sneakers, setSneakers] = useState<ISneaker[]>(initialSneakers.items);
  const fetcher = useFetcher<ISneakersResponse>();
  const searchParams = useSearchParams()[0];

  useEffect(() => {
    setSneakers(initialSneakers.items);
  }, [initialSneakers]);

  if (sneakers.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 gap-36">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl text-center font-medium">
            We could not find anything for "{searchParams.get("q")}"
          </h1>
          <p className="text-xl text-center">
            These popular items might interest you
          </p>
        </div>
        <Recommendations recommendations={recommendations} />
      </div>
    );
  }

  return (
    <PaginatedSneakerGrid
      initialSneakers={initialSneakers}
      sneakers={sneakers}
      setSneakers={setSneakers}
      fetcher={fetcher}
      route={`sneakers/search&q=${searchParams.get("q")}`}
    />
  );
}
