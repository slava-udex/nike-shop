import React from "react";
import { ISizeChart } from "~/shared/interfaces";
import { SneakerSizeTable } from "./SneakerSizeTable";
import { SneakerSizeTips } from "./SneakerSizeTips";

interface Props {
  title: string;
  description: string;
  tableNames: string[];
  tableChart: ISizeChart;
  tipsTitle: string;
  tips: string[];
}

export const SneakerSizePageTemplate: React.FC<Props> = ({
  title,
  description,
  tableNames,
  tableChart,
  tipsTitle,
  tips,
}) => {
  return (
    <div className="h-auto py-24 container max-w-[1140px] flex flex-col gap-16">
      <div className="space-y-8">
        <h2 className="text-3xl font-medium ">{title}</h2>
        <p className="font-medium">{description}</p>
        <p className="font-bold">Scroll horizontally to see more sizes.</p>
      </div>
      <div className="space-y-2">
        <p className="text-3xl">Size Chart</p>
        <SneakerSizeTable names={tableNames} sizeChart={tableChart} />
      </div>
      <SneakerSizeTips title={tipsTitle} tips={tips} />
    </div>
  );
};