import { json, redirect, useLoaderData } from "@remix-run/react";
import React from "react";
import { pb } from "~/lib/pb";
import { CartCard } from "~/modules/Cart";
import { ICart, ISneaker } from "~/shared/interfaces";

export const loader = async () => {
  const user = pb.authStore.model;
  if (!user) return redirect("/sign-in");

  const carts: ICart[] = await pb.collection("cart").getFullList({
    filter: `userId="${user.id}"`,
  });

  if (!carts) return json({ sneakers: [] });

  const sneakers = await Promise.all(
    carts.map(async (cart) => {
      const sneaker = await pb.collection("sneakers").getOne(cart.sneakerId);
      return { sneaker, size: cart.size };
    })
  );

  return json({ sneakers });
};

export default function Cart() {
  const { sneakers } = useLoaderData<{
    sneakers: { sneaker: ISneaker; size: number }[];
  }>();

  return (
    <div className="flex flex-col">
      {/* Cart */}
      <div className="flex max-w-[1200px] mx-auto">
        {/* Cart items */}
        <div>
          <h3 className="font-medium text-lg">Bag</h3>
          <div className="space-y-4">
            {sneakers.map((sneaker) => (
              <CartCard sneaker={sneaker.sneaker} size={sneaker.size} />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div></div>
      </div>

      {/* Favourites */}
      <div className="flex flex-col max-w-[1200px] ">
        <h4 className="font-medium text-xl">Favourites</h4>
        <p>There are no items saved to your favourites.</p>
      </div>

      {/* You might also like */}
      <div></div>
    </div>
  );
}
