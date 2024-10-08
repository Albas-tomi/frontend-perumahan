"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import {
  MdAddHomeWork,
  MdArrowDropDown,
  MdDeleteOutline,
} from "react-icons/md";
import ModalTambahPembayaran from "./ModalTambahPembayaran";
import ModalEditPembayaran from "./ModalEditPembayaran";
import { fetcher } from "@/lib/swr/fethcer";
import useSWR, { mutate } from "swr";
import { format, parseISO } from "date-fns";
import { pembayaranServices } from "@/services/pembayaran";
import { toast } from "sonner";
import { formatCurrencyIDR } from "@/utils/formatCurrency";

const Pembayaran = () => {
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataRumah, setDataRumah] = useState([]);
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [monthKeyword, setMonthKeyword] = useState("");
  const [dataDisplay, setDataDisplay] = useState([]);

  //#GET DATA RUMAH
  const { data: rumah } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/rumah`,
    fetcher,
  );
  useEffect(() => {
    if (rumah) {
      setDataRumah(rumah);
    }
  }, [rumah]);
  //#END GET DATA RUMAH

  //#GET DATA PENGHUNI
  const { data: penghuni } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/penghuni`,
    fetcher,
  );
  useEffect(() => {
    if (penghuni) {
      setDataPenghuni(penghuni);
    }
  }, [penghuni]);
  //#END GET DATA PENGHUNI

  //GET DATA PEMBAYARAN
  const { data: pembayaran } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/pembayaran`,
    fetcher,
  );
  useEffect(() => {
    if (pembayaran) {
      setDataPembayaran(pembayaran);
    }
  }, [pembayaran]);
  //END GET DATA PEMBAYARAN

  const getDataPenghuni = (id: any) => {
    const data: any = dataPenghuni?.find((item: any) => item?.id === id);
    return data;
  };
  const getDataRumah = (id: any) => {
    const data: any = dataRumah?.find((item: any) => item?.id === id);
    return data;
  };

  const handleDeletePembayaran = async (id: any) => {
    try {
      const res = await pembayaranServices.deletePembayaran(id);
      if (res.status === 200) {
        toast.success(res.data.message);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/pembayaran`);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  // HANDLE FILTER DATA
  const handleSearchPenghuni = () => {
    let result = dataPembayaran;
    if (keyword !== "") {
      result = dataPembayaran.filter((item: any) =>
        item.bulan_bayar.toLowerCase().includes(keyword),
      );
    }
    if (monthKeyword !== "") {
      result = dataPembayaran.filter((item: any) =>
        item.bulan_bayar.toLowerCase().includes(monthKeyword),
      );
    }
    setDataDisplay(result);
  };
  useEffect(() => {
    handleSearchPenghuni();
  }, [dataPembayaran, keyword, monthKeyword]);
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <div className="mx-auto max-w-242.5">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex w-full justify-between ">
              <div className="mb-4.5 flex flex-col gap-6 ">
                <div className="w-full">
                  <input
                    onChange={(e) => setKeyword(e.target.value)}
                    type="search"
                    placeholder="Cari pembayaran"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowModalTambah(!showModalTambah)}
                className="my-2 inline-flex  items-center justify-center gap-2.5 bg-primary px-4 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
              >
                <span>
                  <MdAddHomeWork className="text-xl" />
                </span>
                Tambah Pembayaran
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
                      Jenis Iuran
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Jumlah
                    </th>

                    <th className="min-w-[120px]  font-medium text-black dark:text-white">
                      <select
                        value={monthKeyword}
                        name="month"
                        id="month"
                        onChange={(e) => setMonthKeyword(e.target.value)}
                        className={` z-20 w-full   bg-transparent px-5 py-3  dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      >
                        <option
                          value=""
                          className="text-center text-body dark:text-bodydark"
                        >
                          Bulan
                        </option>
                        <option
                          value="januari"
                          className="text-body dark:text-bodydark"
                        >
                          Januari
                        </option>
                        <option
                          value="februari"
                          className="text-body dark:text-bodydark"
                        >
                          Februari
                        </option>
                        <option
                          value="maret"
                          className="text-body dark:text-bodydark"
                        >
                          Maret
                        </option>
                        <option
                          value="april"
                          className="text-body dark:text-bodydark"
                        >
                          April
                        </option>
                        <option
                          value="mei"
                          className="text-body dark:text-bodydark"
                        >
                          Mei
                        </option>
                        <option
                          value="juni"
                          className="text-body dark:text-bodydark"
                        >
                          Juni
                        </option>
                        <option
                          value="juli"
                          className="text-body dark:text-bodydark"
                        >
                          Juli
                        </option>
                        <option
                          value="agustus"
                          className="text-body dark:text-bodydark"
                        >
                          Agustus
                        </option>
                        <option
                          value="september"
                          className="text-body dark:text-bodydark"
                        >
                          September
                        </option>
                        <option
                          value="oktober"
                          className="text-body dark:text-bodydark"
                        >
                          Oktober
                        </option>
                        <option
                          value="november"
                          className="text-body dark:text-bodydark"
                        >
                          November
                        </option>
                        <option
                          value="desember"
                          className="text-body dark:text-bodydark"
                        >
                          Desember
                        </option>
                      </select>
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
                  {dataDisplay?.length <= 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    dataDisplay.map((pembayaran: any, key: number) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {getDataRumah(pembayaran?.id_rumah)?.nomor_rumah}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {
                              getDataPenghuni(pembayaran?.id_penghuni)
                                ?.nama_lengkap
                            }
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {pembayaran.jenis_iuran}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                              pembayaran.status_pembayaran === "lunas"
                                ? "bg-success text-success"
                                : pembayaran.status_pembayaran === "dibatalkan"
                                  ? "bg-danger text-danger"
                                  : "bg-warning text-warning"
                            }`}
                          >
                            {pembayaran.status_pembayaran}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {formatCurrencyIDR(pembayaran.jumlah_pembayaran)}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {pembayaran.bulan_bayar}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {format(
                              parseISO(pembayaran?.tanggal_pembayaran),
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
                                onClick={() => setDataUpdate(pembayaran)}
                                className="text-2xl"
                              />
                            </button>
                            <button
                              onClick={() =>
                                handleDeletePembayaran(pembayaran?.id)
                              }
                              className="hover:text-primary"
                            >
                              <MdDeleteOutline className="text-2xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModalTambah && (
        <ModalTambahPembayaran
          setShowModalTambah={setShowModalTambah}
          showModalTambah={showModalTambah}
          dataRumah={dataRumah}
          dataPenghuni={dataPenghuni}
        />
      )}
      {showModalEdit && (
        <ModalEditPembayaran
          setShowModalEdit={setShowModalEdit}
          showModalEdit={showModalEdit}
          dataPenghuni={dataPenghuni}
          setDataUpdate={setDataUpdate}
          dataRumah={dataRumah}
          dataUpdate={dataUpdate}
        />
      )}
    </DefaultLayout>
  );
};

export default Pembayaran;
