import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { ISneaker } from "~/shared/interfaces/sneaker";

interface Props {
  sneaker: ISneaker;
  isSmall?: boolean;
}

export const SneakerCard: React.FC<Props> = ({ sneaker, isSmall = false }) => {
  const link = `/sneakers/${sneaker.id}`;
  return (
    <Link
      to={link}
      className={cn(
        "flex flex-col",
        isSmall ? "max-w-48 sm:max-w-96" : "max-w-96"
      )}
    >
      <img
        src={`http://ivs-nikestore-pb.apps.aiweb.cloud/api/files/${sneaker.collectionId}/${sneaker.id}/${sneaker.thumbnail}`}
        alt={sneaker.title}
        className="object-cover max-w-96 max-h-96 py-4"
      />
      <div className="flex justify-between">
        <h4 className="font-medium max-w-48">{sneaker.title}</h4>
        <p className="font-medium">${sneaker.price.toLocaleString()}</p>
      </div>
      <p>{sneaker.category}</p>
      <p>{sneaker.sizes.length} Colors</p>
    </Link>
  );
};
