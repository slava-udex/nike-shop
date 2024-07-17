import React from "react";
import { Carousel } from "../Global";
import { ISneaker } from "~/shared/interfaces";
import { CarouselItem } from "~/shared/ui";
import { SneakerCard } from "../Sneaker";

interface Props {
  sneakers: ISneaker[];
}

export const SneakersCarousel: React.FC<Props> = ({ sneakers }) => {
  return (
    <Carousel>
      {sneakers.map((sneaker) => (
        <CarouselItem key={sneaker.id}>
          <SneakerCard isSmall={true} sneaker={sneaker} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};
