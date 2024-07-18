import { IPaginated, ISneaker } from "~/shared/interfaces";
import { pb } from "./pb";
import { json } from "@remix-run/react";

export const getPaginatedSneakers = async (
  requestUrl: string,
  filter?: string
) => {
  const url = new URL(requestUrl);
  const page = url.searchParams.get("page") || 0;

  const paginatedSneakers: IPaginated<ISneaker> = await pb
    .collection("sneakers")
    .getList(+page, 2, {
      filter: filter || "",
    });

  console.log(paginatedSneakers);

  return json({ paginatedSneakers });
};
