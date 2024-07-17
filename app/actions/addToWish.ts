import { json, redirect } from "@remix-run/react";
import { pb } from "~/lib/pb";
import { IUser } from "~/shared/interfaces";
import { IWish } from "~/shared/interfaces/wish";

export const addToWish = async (
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
    // Search for an existing wishlist
    const existingWish: IWish[] = await pb
      .collection("favourites")
      .getFullList({
        filter: query,
      });
    // If item is already in wishlist, do nothing
    if (existingWish.length > 0) {
      if (existingWish[0].size !== Number(size)) {
        await pb.collection("favourites").update(existingWish[0].id, {
          size,
        });
        return json({
          title: "OK!",
          description: "This sneaker is already in wishlist. Size updated.",
        });
      }
      return json({
        title: "OK!",
        description: "This sneaker is already in wishlist.",
      });
    }
    await pb.collection("favourites").create({
      sneakerId,
      userId: user.id,
      size,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return json({ title: "Oops!", description: "Something went wrong" });
  }

  return json({ title: "Success!", description: "Sneaker added to wishlist" });
};
