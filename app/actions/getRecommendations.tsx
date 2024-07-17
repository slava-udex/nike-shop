import { getMostPopularCategory } from "~/lib/getMostPopularCategory";
import { pb } from "~/lib/pb";
import { ISneaker } from "~/shared/interfaces";

export const getRecommendations = async (
  sneakers: ISneaker[]
): Promise<ISneaker[]> => {
  const mostPopularCategory = getMostPopularCategory(sneakers);

  if (!mostPopularCategory) {
    return [];
  }

  try {
    const idsToExclude = sneakers.map((sneaker) => sneaker.id);
    const products: ISneaker[] = await pb.collection("sneakers").getFullList({
      filter: `category="${mostPopularCategory}"`,
    });
    const filteredProducts = products.filter(
      (product) => !idsToExclude.includes(product.id)
    );

    return filteredProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
