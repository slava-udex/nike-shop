import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { pb } from "~/lib/pb";
import { SneakerCard } from "~/modules";
import { ISneaker } from "~/shared/interfaces/sneaker";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const sneakers = await pb.collection("sneakers").getFullList<ISneaker>();

  return json({ sneakers });
};

export default function Index() {
  const { sneakers } = useLoaderData<{ sneakers: ISneaker[] }>();

  return (
    <div className="h-screen p-4 flex gap-8">
      {sneakers.map((sneaker) => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}
