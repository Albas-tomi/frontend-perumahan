"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdAddHomeWork, MdDeleteOutline } from "react-icons/md";

import { fetcher } from "@/lib/swr/fethcer";
import useSWR, { mutate } from "swr";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { formatCurrencyIDR } from "@/utils/formatCurrency";
import { pengeluaranServices } from "@/services/pengeluaran";
import ModalTambahPengeluaran from "./ModalTambahPengeluaran";
import ModalEditPengeluaran from "./ModalEditPengeluaran";

const Pembayaran = () => {
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);

  //  PENGELUARAN
  const { data: pengeluaran } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/pengeluaran`,
    fetcher,
  );
  useEffect(() => {
    if (pengeluaran) {
      setDataPengeluaran(pengeluaran);
    }
  }, [pengeluaran]);

  const handleDeletePengeluaran = async (id: any) => {
    try {
      const res = await pengeluaranServices.deletePengeluaran(id);
      if (res.status === 200) {
        toast.success("Data pengeluaran di hapus");
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/pengeluaran`);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
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
                Tambah Pengeluaran
              </button>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Deskripsi
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Jumlah
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Tanggal
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPengeluaran.map((pengeluaran: any, key: number) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {pengeluaran.deskripsi}
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">
                          {formatCurrencyIDR(pengeluaran.jumlah_pengeluaran)}
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {format(
                            parseISO(pengeluaran?.tanggal_pengeluaran),
                            "yyyy-MM-dd",
                          )}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => setShowModalEdit(!showModalEdit)}
                            className="hover:text-primary"
                          >
                            <CiEdit
                              onClick={() => setDataUpdate(pengeluaran)}
                              className="text-2xl"
                            />
                          </button>
                          <button
                            onClick={() =>
                              handleDeletePengeluaran(pengeluaran?.id)
                            }
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
      </div>
      {showModalTambah && (
        <ModalTambahPengeluaran
          setShowModalTambah={setShowModalTambah}
          showModalTambah={showModalTambah}
        />
      )}
      {showModalEdit && (
        <ModalEditPengeluaran
          setShowModalEdit={setShowModalEdit}
          showModalEdit={showModalEdit}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
        />
      )}
    </DefaultLayout>
  );
};

export default Pembayaran;
