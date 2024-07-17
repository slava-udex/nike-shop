import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { pb } from "~/lib/pb";
import { useToast } from "~/lib/use-toast";
import { SneakerCard } from "~/modules";
import { ISneaker } from "~/shared/interfaces/sneaker";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const sneakers = await pb.collection("sneakers").getFullList<ISneaker>();

  return json({ sneakers });
};

export default function Index() {
  const { sneakers } = useLoaderData<{ sneakers: ISneaker[] }>();
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
  }, [toast]);

  return (
    <div className="h-screen p-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {sneakers.map((sneaker) => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}
