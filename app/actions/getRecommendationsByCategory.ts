import { pb } from "~/lib/pb";
import { IPaginated, ISneaker } from "~/shared/interfaces";

export const getRecommendationsByCategory = async (category: string) => {
  try {
    const { items: sneakers }: IPaginated<ISneaker> = await pb
      .collection("sneakers")
      .getList(1, 8, {
        filter: `category="${category}"`,
      });

    return sneakers;
  } catch (error) {
    return [];
  }
};
