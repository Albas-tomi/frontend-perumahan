"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import {
  MdAddHomeWork,
  MdArrowDropDown,
  MdDeleteOutline,
} from "react-icons/md";
import ModalTambahRumah from "./ModalTambahRumah";
import ModalEditRumah from "./ModalEditRumah";
import { penghuniServices } from "@/services/penghuni";
import { rumahServices } from "@/services/rumah";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/swr/fethcer";
import { toast } from "sonner";

const Perumahan = () => {
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataRumah, setDataRumah] = useState([]);
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/rumah`, fetcher);
  const { data: penghuni } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/penghuni`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setDataRumah(data);
    }
  }, [data]);
  useEffect(() => {
    if (penghuni) {
      setDataPenghuni(penghuni);
    }
  }, [penghuni]);

  const getDataPenghuni = (id: any) => {
    const data: any = dataPenghuni?.find((item: any) => item?.id === id);
    return data;
  };

  const handleDeleteRumah = async (id: any) => {
    try {
      const res = await rumahServices.deleteRumah(id);
      if (res.status === 200) {
        toast.success(res.data.message);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/rumah`);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex w-full justify-end ">
            <button
              onClick={() => setShowModalTambah(!showModalTambah)}
              className="my-2 inline-flex  items-center justify-center gap-2.5 bg-primary px-4 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
            >
              <span>
                <MdAddHomeWork className="text-xl" />
              </span>
              Tambah Rumah
            </button>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Nomor Rumah
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Penghuni
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Histori Penghuni
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataRumah.map((rumah: any, key: number) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {rumah.nomor_rumah}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {rumah.id_penghuni_sekarang === null
                          ? "-"
                          : getDataPenghuni(rumah?.id_penghuni_sekarang)
                              ?.nama_lengkap}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                          rumah.status_rumah === "dihuni"
                            ? "bg-success text-success"
                            : rumah.status_rumah === "kosong"
                              ? "bg-danger text-danger"
                              : "bg-warning text-warning"
                        }`}
                      >
                        {rumah.status_rumah}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {rumah.histori_penghuni === "" || [] ? "-" : "kosong"}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => setShowModalEdit(!showModalEdit)}
                          className="hover:text-primary"
                        >
                          <CiEdit
                            onClick={() => setDataUpdate(rumah)}
                            className="text-2xl"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteRumah(rumah.id)}
                          className="hover:text-primary"
                        >
                          <MdDeleteOutline className="text-2xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModalTambah && (
        <ModalTambahRumah
          setShowModalTambah={setShowModalTambah}
          showModalTambah={showModalTambah}
          dataPenghuni={dataPenghuni}
        />
      )}

      {showModalEdit && (
        <ModalEditRumah
          setShowModalEdit={setShowModalEdit}
          showModalEdit={showModalEdit}
          dataPenghuni={dataPenghuni}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
        />
      )}
    </DefaultLayout>
  );
};

export default Perumahan;
