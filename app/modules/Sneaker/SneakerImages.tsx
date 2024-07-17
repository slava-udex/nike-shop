import React from "react";
import { ISneaker } from "~/shared/interfaces/sneaker";
import { SneakerCarousel } from "../";

interface Props {
  sneaker: ISneaker;
}

export const SneakerImages: React.FC<Props> = ({ sneaker }) => {
  return (
    <>
      <div className="lg:hidden py-4">
        <SneakerCarousel sneaker={sneaker} />
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-4">
        {sneaker.images.map((image) => (
          <img
            key={image}
            src={`http://ivs-nikestore-pb.apps.aiweb.cloud/api/files/${sneaker.collectionId}/${sneaker.id}/${image}`}
            className="max-w-[524px] w-full object-cover"
          />
        ))}
      </div>
    </>
  );
};
