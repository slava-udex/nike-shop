import { json, redirect } from "@remix-run/react";
import { pb } from "~/lib/pb";
import { ICart, IUser } from "~/shared/interfaces";

export const addToCart = async (
  sneakerId: string,
  size: number,
  user: IUser
) => {
  if (!size)
    return json({
      title: "Something went wrong!",
      description: "Please select a size",
    });

  try {
    const query = `userId="${user.id}" && sneakerId="${sneakerId}"`;
    // Search for an existing cart
    const existingCart: ICart[] = await pb.collection("cart").getFullList({
      filter: query,
    });
    // If item is already in cart, do nothing
    if (existingCart.length > 0) {
      if (existingCart[0].size !== Number(size)) {
        await pb.collection("cart").update(existingCart[0].id, {
          size,
        });
        return json({
          title: "OK!",
          description: "This sneaker is already in cart. Size updated.",
        });
      }
      return json({
        title: "OK!",
        description: "This sneaker is already in cart.",
      });
    }
    await pb.collection("cart").create({
      sneakerId,
      userId: user.id,
      size,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return json({ title: "Oops!", message: "Something went wrong" });
  }

  // Add cart drawer
  return json({ title: "Success!", message: "Sneaker added to cart" });
};
