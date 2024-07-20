import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { IProduct } from "~/shared/interfaces/product";

interface Props {
  product: IProduct;
  isSmall?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, isSmall = false }) => {
  const link = `/products/${product.id}`;
  return (
    <Link
      to={link}
      className={cn(
        "flex flex-col",
        isSmall ? "max-w-48 sm:max-w-96" : "max-w-96"
      )}
    >
      <img
        src={`http://ivs-nikestore-pb.apps.aiweb.cloud/api/files/${product.collectionId}/${product.id}/${product.thumbnail}`}
        alt={product.title}
        className="object-cover max-w-96 max-h-96 py-4"
      />
      <div className="flex justify-between">
        <h4 className="font-medium max-w-48">{product.title}</h4>
        <p className="font-medium">${product.price.toLocaleString()}</p>
      </div>
      <p>{product.category}</p>
      <p>{product.sizes.length} Colors</p>
    </Link>
  );
};
