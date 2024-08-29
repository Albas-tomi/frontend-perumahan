"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import dynamic from "next/dynamic";
import React from "react";

interface ChartThreeProps {
  dataPembayaran: any; // Define the type of dataPembayaran here
}
const ChartThree = dynamic<ChartThreeProps>(
  () => import("@/components/Charts/ChartThree"),
  {
    ssr: false,
  },
);

const Chart: React.FC<ChartThreeProps> = ({ dataPembayaran }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree dataPembayaran={dataPembayaran} />
      </div>
    </>
  );
};

export default Chart;
