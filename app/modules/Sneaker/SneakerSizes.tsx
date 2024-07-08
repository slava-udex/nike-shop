import { Link } from "@remix-run/react";
import React from "react";
import { cn } from "~/lib/utils";
import { ISneaker } from "~/shared/interfaces";

interface Props {
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  sneaker: ISneaker;
}
export const SneakerSizes: React.FC<Props> = ({
  sneaker,
  selectedSize,
  setSelectedSize,
}) => {
  const onSizeClick = (size: string) => {
    if (!sneaker.sizesAvalaible.includes(size)) {
      return;
    }
    setSelectedSize(size);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-medium">Select Size</p>
        <Link to="/sneakers/size-guide" className="text-[#757575]">
          Size Guide
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-2">
        {sneaker.sizes.map((size) => (
          <div
            key={size}
            className={cn(
              "rounded-md p-3 text-md border border-[#E5E5E5]  transition-colors",
              sneaker.sizesAvalaible.includes(size)
                ? "cursor-pointer hover:border-black"
                : "text-[#dddddd] hover:cursor-not-allowed",
              selectedSize === size ? "border-black" : "border-[#E5E5E5]"
            )}
            onClick={() => onSizeClick(size)}
          >
            {size}
          </div>
        ))}
      </div>
    </>
  );
};
