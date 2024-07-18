import { IPaginated, ISneaker } from "./";

export interface ISneakersResponse {
  paginatedSneakers: IPaginated<ISneaker>;
}
