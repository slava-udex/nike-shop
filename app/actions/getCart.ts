import { pb } from "~/lib/pb";
import { ICart, ICollection, ISneaker, IUser } from "~/shared/interfaces";

export const getCart = async (user: IUser): Promise<ICollection[]> => {
  const carts: ICart[] = await pb.collection("cart").getFullList({
    filter: `userId="${user.id}"`,
  });

  if (!carts) return [];

  const cart = await Promise.all(
    carts.map(async (cart) => {
      const sneaker: ISneaker = await pb
        .collection("sneakers")
        .getOne(cart.sneakerId);
      return { id: cart.id, sneaker, size: cart.size };
    })
  );

  return cart;
};
