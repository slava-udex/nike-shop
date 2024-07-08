import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { pb } from "~/lib/pb";
import {
  SneakerDetailsAccordion,
  SneakerDetailsDialog,
  SneakerImages,
  SneakerShowcase,
  SneakerSizes,
} from "~/modules";
import { ISneaker } from "~/shared/interfaces/";
import { Button } from "~/shared/ui";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { sneakerId } = params;
  if (!sneakerId) return redirect("/");

  const sneaker = await pb.collection("sneakers").getOne(sneakerId);
  return json({ sneaker });
};

export default function SneakerDetailPage() {
  const { sneaker } = useLoaderData<{ sneaker: ISneaker }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen px-16 py-24 overflow-hidden gap-8  ">
      <div className="flex flex-col lg:flex-row  lg:gap-8 2xl:gap-36">
        <SneakerImages sneaker={sneaker} />
        <div className="flex w-full lg:w-1/4 flex-col gap-8">
          <div>
            <h1 className="text-xl sm:text-3xl">{sneaker.title}</h1>
            <p className="leading-6 font-medium">{sneaker.category}</p>
          </div>
          <div>
            <p className="leading-6 font-medium">
              USD : ${sneaker.price.toFixed(2).toLocaleString()}
            </p>
            <div className="flex flex-col text-[#757575] mt-2 gap-1">
              <p>incl. of taxes</p>
              <p>(Also includes all applicable duties)</p>
            </div>
          </div>
          <div>
            <SneakerSizes
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              sneaker={sneaker}
            />
            <Button className="rounded-full my-4 w-full py-8 text-lg hover:opacity-70">
              Add to Bag
            </Button>
            <Button className="w-full my-4 rounded-full py-8 text-lg bg-white text-black border hover:border-black ">
              Favourite
            </Button>
          </div>
          <div className="flex flex-col mt-8 leading-7 gap-8">
            {sneaker.description && <p>{sneaker.description}</p>}
            <SneakerDetailsDialog sneaker={sneaker} />
            <SneakerDetailsAccordion />
          </div>
        </div>
      </div>
      <SneakerShowcase sneaker={sneaker} />
    </div>
  );
}
