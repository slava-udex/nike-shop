import { pb } from "~/lib/pb";
import { ICollection, ISneaker, IUser, IWish } from "~/shared/interfaces";

export const getWish = async (user: IUser): Promise<ICollection[]> => {
  const favourites: IWish[] = await pb.collection("favourites").getFullList({
    filter: `userId="${user.id}"`,
  });

  if (!favourites) return [];

  const wish = await Promise.all(
    favourites.map(async (favourite) => {
      const sneaker: ISneaker = await pb
        .collection("sneakers")
        .getOne(favourite.sneakerId);
      return { id: favourite.id, sneaker, size: favourite.size };
    })
  );

  return wish;
};
