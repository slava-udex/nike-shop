import React from "react";
import { IProduct } from "../interfaces";
import { ProductCard } from "~/modules";

interface Props {
  products: IProduct[];
}

export const ProductsGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="p-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
