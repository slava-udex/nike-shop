import React from "react";
import { fromStringToArray } from "~/lib/utils";
import { ISneaker } from "~/shared/interfaces/sneaker";

interface Props {
  sneaker: ISneaker;
}

export const SneakerShowcase: React.FC<Props> = ({ sneaker }) => {
  const showcaseComments = fromStringToArray(sneaker.showcaseComments);
  return (
    <div className="flex flex-col gap-36 items-center">
      {sneaker.showcase.map((image, index) => (
        <div className="space-y-14" key={image}>
          <p className="text-center text-lg max-w-[582px] mx-auto">
            {showcaseComments[index]}
          </p>
          <img
            src={`http://ivs-nikestore-pb.apps.aiweb.cloud/api/files/${sneaker.collectionId}/${sneaker.id}/${image}`}
            className="w-full object-cover"
          />
        </div>
      ))}
      <p className="text-center text-lg max-w-[582px] mx-auto">
        {showcaseComments[showcaseComments.length - 2]}
      </p>
    </div>
  );
};
