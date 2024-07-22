import React from "react";
import { CategoryFiltering } from "./CategoryFiltering";
import { PriceFiltering } from "./PriceFiltering";
import { IProduct } from "~/shared/interfaces";

interface Props {
  allProducts: IProduct[];
}

export const Filtering: React.FC<Props> = ({ allProducts }) => {
  return (
    <div className="pl-4 pr-12 py-4 space-y-4">
      <CategoryFiltering products={allProducts} />
      <PriceFiltering products={allProducts} />
    </div>
  );
};
