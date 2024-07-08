import { Link } from "@remix-run/react";
import { ISneaker } from "~/shared/interfaces/sneaker";

interface Props {
  sneaker: ISneaker;
}

export const SneakerCard: React.FC<Props> = ({ sneaker }) => {
  const link = `/sneakers/${sneaker.id}`;
  return (
    <Link to={link} className="flex flex-col max-w-96">
      <img
        src={`http://localhost:8090/api/files/${sneaker.collectionId}/${sneaker.id}/${sneaker.thumbnail}`}
        alt={sneaker.title}
        className="object-cover max-w-96 max-h-96 py-4"
      />
      <div className="flex justify-between">
        <h4 className="font-medium">{sneaker.title}</h4>
        <p className="font-medium">${sneaker.price.toLocaleString()}</p>
      </div>
      <p>{sneaker.category}</p>
      <p>{sneaker.sizes.length} Colors</p>
    </Link>
  );
};
