import React from "react";
import { ISneaker } from "~/shared/interfaces";
import { SneakerCard } from "../Sneaker";

interface Props {
  recommendations: ISneaker[];
}

export const Recommendations: React.FC<Props> = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto px-4">
      <h4 className="font-medium text-xl">You might also like</h4>
      <div className="grid grid-cols-3">
        {recommendations.map((product) => (
          <SneakerCard sneaker={product} />
        ))}
      </div>
    </div>
  );
};
