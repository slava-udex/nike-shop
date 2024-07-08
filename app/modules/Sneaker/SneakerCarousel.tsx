import React from "react";
import { ISneaker } from "~/shared/interfaces/sneaker";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/shared/ui/carousel";

interface Props {
  sneaker: ISneaker;
}

export const SneakerCarousel: React.FC<Props> = ({ sneaker }) => {
  return (
    <Carousel className="w-full h-full ">
      <CarouselContent>
        {sneaker.images.map((image) => (
          <CarouselItem key={image} className="basis-[100%]">
            <img
              src={`http://localhost:8090/api/files/${sneaker.collectionId}/${sneaker.id}/${image}`}
              className="w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
