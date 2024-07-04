import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { pb } from "~/lib/pb";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const users = await pb.collection("users").getFullList();
  return json({ users });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data.users);
  return (
    <div className="font-sans p-4">
      <Button>Click me!</Button>
    </div>
  );
}
