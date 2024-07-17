import React from "react";
import { ISneaker } from "~/shared/interfaces";
import { SneakerCard } from "../Sneaker";
import { SneakersCarousel } from "./SneakersCarousel";

interface Props {
  recommendations: ISneaker[];
}

export const Recommendations: React.FC<Props> = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col max-w-[1200px] px-4">
      <h4 className="font-medium text-xl">You might also like</h4>
      <SneakersCarousel sneakers={recommendations} />
    </div>
  );
};
