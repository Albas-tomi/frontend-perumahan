"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdAddHomeWork, MdDeleteOutline } from "react-icons/md";
import ModalTambahPenghuni from "./ModalTambahPenghuni";
import ModalEditPenghuni from "./ModalEditPenghuni";
import { penghuniServices } from "@/services/penghuni";
import { toast } from "sonner";
import { fetcher } from "@/lib/swr/fethcer";
import useSWR, { mutate } from "swr";
import { set } from "date-fns";

const Penghuni = () => {
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const { data: penghuni } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/penghuni`,
    fetcher,
  );

  useEffect(() => {
    if (penghuni) {
      setDataPenghuni(penghuni);
    }
  }, [penghuni]);

  const handleDeletePenghuni = async (id: any) => {
    try {
      const res = await penghuniServices.deletePenghuni(id);
      if (res.status === 200) {
        toast.success(res.data.message);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/penghuni`);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
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
                Tambah Penghuni
              </button>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Nama Lengkap
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      KTP
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Status Hunian
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Nomor Telepon
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Status Menikah
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPenghuni?.map((penghuni: any, key: number) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {penghuni.nama_lengkap}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="text-start font-medium text-black dark:text-white">
                          {penghuni.foto_ktp}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-start text-black dark:text-white">
                          {penghuni.status_penghuni}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="text-start font-medium text-black dark:text-white">
                          {penghuni.nomor_telepon}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <h5 className="text-start font-medium text-black dark:text-white">
                          {penghuni.status_menikah}
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => {
                              setShowModalEdit(!showModalEdit),
                                setDataUpdate(penghuni);
                            }}
                            className="hover:text-primary"
                          >
                            <CiEdit className="text-2xl" />
                          </button>
                          <button
                            onClick={() => handleDeletePenghuni(penghuni.id)}
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
        <ModalTambahPenghuni
          setShowModalTambah={setShowModalTambah}
          showModalTambah={showModalTambah}
        />
      )}
      {showModalEdit && (
        <ModalEditPenghuni
          setShowModalEdit={setShowModalEdit}
          showModalEdit={showModalEdit}
          dataUpdate={dataUpdate}
          setdataUpdate={setDataUpdate}
        />
      )}
    </DefaultLayout>
  );
};

export default Penghuni;
