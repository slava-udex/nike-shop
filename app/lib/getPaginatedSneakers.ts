import { IPaginated, ISneaker } from "~/shared/interfaces";
import { pb } from "./pb";

export const getPaginatedSneakers = async (
  requestUrl: string,
  filter?: string
) => {
  const url = new URL(requestUrl);
  const page = url.searchParams.get("page") || 0;

  const paginatedSneakers: IPaginated<ISneaker> = await pb
    .collection("sneakers")
    .getList(+page, 20, {
      filter: filter || "",
    });

  return { paginatedSneakers };
};
