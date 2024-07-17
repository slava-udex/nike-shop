import React from "react";
import { ISneaker } from "../interfaces";
import { SneakerCard } from "~/modules";

interface Props {
  sneakers: ISneaker[];
}

export const SneakerGrid: React.FC<Props> = ({ sneakers }) => {
  return (
    <div className="p-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {sneakers.map((sneaker) => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
};
