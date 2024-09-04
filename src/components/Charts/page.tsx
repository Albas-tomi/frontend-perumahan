"use client";
import dynamic from "next/dynamic";
import React from "react";

interface ChartThreeProps {}
const ChartThree = dynamic<ChartThreeProps>(
  () => import("@/components/Charts/ChartThree"),
  {
    ssr: false,
  },
);

const Chart: React.FC<ChartThreeProps> = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
