import { IPaginated, IProduct } from "~/shared/interfaces";
import { pb } from "./pb";

export const getPaginatedProducts = async (
  requestUrl: string,
  filter?: string
) => {
  const url = new URL(requestUrl);
  const page = url.searchParams.get("page") || 0;

  const paginatedProducts: IPaginated<IProduct> = await pb
    .collection("products")
    .getList(+page, 20, {
      filter: filter || "",
    });

  return { paginatedProducts };
};
