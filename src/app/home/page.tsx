"use client";
import CardDataStats from "@/components/CardDataStats";
import Chart from "@/components/Charts/page";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/swr/fethcer";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { FaArrowsDownToPeople, FaPeopleRobbery } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import useSWR from "swr";
const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const HomePage = () => {
  const [dataRumah, setDataRumah] = useState([]);
  const [dataPenghuni, setDataPenghuni] = useState([]);

  // GET DATA RUMAH
  const { data: rumah } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/rumah`,
    fetcher,
  );

  // SET DATA RUMAH
  useEffect(() => {
    if (rumah) {
      setDataRumah(rumah);
    }
  }, [rumah]);

  // GET DATA PENGHUNI
  const { data: penghuni } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/penghuni`,
    fetcher,
  );
  // SET DATA PENGHUNI
  useEffect(() => {
    if (penghuni) {
      setDataPenghuni(penghuni);
    }
  }, [penghuni]);

  // GET DATA STATUS KONTRAK
  const penghuniKontrak = dataPenghuni?.filter(
    (penghuni: any) => penghuni?.status_penghuni === "kontrak",
  );

  // GET DATA STATUS TETAP
  const penghuniTetap = dataPenghuni?.filter(
    (penghuni: any) => penghuni?.status_penghuni === "tetap",
  );

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardDataStats
            title="Total Rumah"
            total={`${dataRumah?.length}`}
            levelUp
          >
            <GiHomeGarage className="text-2xl text-blue-600" />
          </CardDataStats>
          <CardDataStats
            title="Total Penghuni Kontrak"
            total={`${penghuniKontrak?.length}`}
            levelUp
          >
            <FaPeopleRobbery className="text-2xl text-blue-600" />
          </CardDataStats>

          <CardDataStats
            title="Total Penghuni Tetap "
            total={`${penghuniTetap?.length}`}
          >
            <FaArrowsDownToPeople className="text-2xl text-blue-600" />
          </CardDataStats>
        </div>
        <div className="my-4 w-full">
          <Chart />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
