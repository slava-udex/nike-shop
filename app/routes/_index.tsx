import { type MetaFunction } from "@remix-run/node";
import { Button } from "~/shared/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen p-4">
      <Button>Click me!</Button>
    </div>
  );
}
