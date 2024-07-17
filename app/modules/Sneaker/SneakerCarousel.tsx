import React from "react";
import { ISneaker } from "~/shared/interfaces/sneaker";
import { Carousel } from "../Global";
import { CarouselItem } from "~/shared/ui";

interface Props {
  sneaker: ISneaker;
}

export const SneakerCarousel: React.FC<Props> = ({ sneaker }) => {
  return (
    <Carousel>
      {sneaker.images.map((image) => (
        <CarouselItem className="basis-[100%]" key={sneaker.id}>
          <img
            src={`http://ivs-nikestore-pb.apps.aiweb.cloud/api/files/${sneaker.collectionId}/${sneaker.id}/${image}`}
            className="w-full"
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
};
