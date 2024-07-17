import { ISneaker } from "./sneaker";

export interface ICollection {
  id: string;
  sneaker: ISneaker;
  size: number;
}
