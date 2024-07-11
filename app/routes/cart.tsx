import { json, redirect, useLoaderData } from "@remix-run/react";
import React from "react";
import { pb } from "~/lib/pb";
import { CartCard } from "~/modules/Cart";
import { ICart, ISneaker } from "~/shared/interfaces";
import { Button } from "~/shared/ui";

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

  const totalPrice = sneakers.reduce((acc, cur) => acc + cur.sneaker.price, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Cart */}
      <div className="flex flex-col lg:flex-row max-w-[1200px] mx-auto gap-16 items-center px-4">
        {/* Cart items */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Bag</h3>
          <div className="space-y-4">
            {sneakers.map((sneaker) => (
              <CartCard
                key={sneaker.sneaker.id}
                sneaker={sneaker.sneaker}
                size={sneaker.size}
              />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="w-64 xs:w-[350px] space-y-4 p-4 text-sm">
          <h4 className="font-medium text-xl">Summary</h4>
          <div className="flex justify-between w-full">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between w-full">
            <p>Estimated delivery & Handling</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between w-full border-t border-b py-4 px-2">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
          <Button className="w-full rounded-full py-6">Checkout</Button>
        </div>
      </div>

      {/* Favourites */}
      {/* <div className="flex flex-col max-w-[1200px] mx-auto px-4 ">
        <h4 className="font-medium text-xl">Favourites</h4>
        <p>There are no items saved to your favourites.</p>
      </div> */}

      {/* You might also like */}
      <div></div>
    </div>
  );
}
