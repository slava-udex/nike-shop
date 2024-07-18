import { LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getPaginatedSneakers } from "~/lib/getPaginatedSneakers";
import { useToast } from "~/lib/use-toast";
import { PaginatedSneakerGrid } from "~/modules/Sneaker";
import { ISneakersResponse } from "~/shared/interfaces";
import { ISneaker } from "~/shared/interfaces/sneaker";

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
  }, [isSuccess, toast]);

  return (
    <PaginatedSneakerGrid
      initialSneakers={initialSneakers}
      sneakers={sneakers}
      setSneakers={setSneakers}
      fetcher={fetcher}
    />
  );
}
