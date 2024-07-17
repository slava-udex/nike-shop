import { useLoaderData } from "@remix-run/react";
import { pb } from "~/lib/pb";
import { ISneaker } from "~/shared/interfaces";
import { SneakerGrid } from "~/shared/ui";

export const loader = async (): Promise<{ sneakers: ISneaker[] }> => {
  const sneakers = await pb.collection("sneakers").getFullList<ISneaker>({
    filter: `category~"Kids'"`,
  });

  return { sneakers };
};

export default function MenSneakers() {
  const { sneakers } = useLoaderData<typeof loader>();
  return <SneakerGrid sneakers={sneakers} />;
}
