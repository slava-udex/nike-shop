import React from "react";
import { ISneaker } from "~/shared/interfaces/sneaker";
import { Dialog } from "~/shared/ui/";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/shared/ui/dialog";
import { SneakerBenefitsList } from "./";

interface Props {
  sneaker: ISneaker;
}

export const SneakerDetailsDialog: React.FC<Props> = ({ sneaker }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="font-medium underline underline-offset-8">
          View product details
        </p>
      </DialogTrigger>
      <DialogContent className="max-w-[960px] overlow-y-scroll">
        <DialogHeader>
          <div className="flex items-center gap-4 ">
            <img
              src={`http://localhost:8090/api/files/${sneaker.collectionId}/${sneaker.id}/${sneaker.thumbnail}`}
              alt={`${sneaker.title}`}
              className="w-20 h-20 object-cover"
            />
            <div className="flex flex-col gap-2">
              <DialogTitle className="font-medium">{sneaker.title}</DialogTitle>
              <DialogDescription>${sneaker.price}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-8 px-2">
          <p>{sneaker.description}</p>
          <SneakerBenefitsList title="Benefits" details={sneaker.benefits} />
          <SneakerBenefitsList
            title="Product Details"
            details={sneaker.productDetails}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
