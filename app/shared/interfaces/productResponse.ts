import { IPaginated, IProduct } from ".";

export interface IProductsResponse {
  paginatedProducts: IPaginated<IProduct>;
}
