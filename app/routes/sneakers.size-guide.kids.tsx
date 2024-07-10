import {
  SneakerKidsMeasure,
  SneakerSizePageTemplate,
  SneakerSizeTable,
} from "~/modules";
import {
  babiesToddlersFootSizeChart,
  kidsFootSizeChart,
  littleKidsSizeChart,
} from "~/shared/data";

export default function KidsSizeGuide() {
  return (
    <SneakerSizePageTemplate
      title="Kids' Shoes"
      description="Find your correct size in the charts below."
      chartTitle="Big Kids (1Y - 7Y)"
      tableChart={kidsFootSizeChart}
      tipsTitle="Find the Right Size"
      tips={[
        "When fitting a child for a new pair of shoes, it’s best to have them wear the type of socks they plan to wear with the shoes to ensure they fit comfortably. The Nike Swoosh 1 is intended to be worn without socks.",
      ]}
      additionalInfo={<SneakerKidsMeasure />}
    >
      <div className="space-y-6">
        <p className="text-3xl">Little Kids (8C - 3Y)</p>
        <SneakerSizeTable sizeChart={littleKidsSizeChart} />
      </div>
      <div className="space-y-6">
        <p className="text-3xl">Babies & Toddlers (1C - 10C)</p>
        <SneakerSizeTable sizeChart={babiesToddlersFootSizeChart} />
      </div>
    </SneakerSizePageTemplate>
  );
}
