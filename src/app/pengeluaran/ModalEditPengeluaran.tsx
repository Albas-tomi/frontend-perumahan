import Modal from "@/components/Modal/Modal";
import { pengeluaranServices } from "@/services/pengeluaran";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { mutate } from "swr";

const ModalEditPengeluaran = ({
  setShowModalEdit,
  showModalEdit,
  dataUpdate,
  setDataUpdate,
}: {
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  showModalEdit: boolean;
  dataUpdate: any;
  setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [formPengeluaran, setFormPengeluaran] = useState({
    deskripsi: dataUpdate.deskripsi || "",
    jumlah_pengeluaran: dataUpdate.jumlah_pengeluaran || (0 as any),
    tanggal_pengeluaran: dataUpdate.tanggal_pengeluaran || (0 as any),
  });

  const handleEditPengeluaran = async (e: any) => {
    e.preventDefault();
    try {
      const res = await pengeluaranServices.updatePengeluaran(
        dataUpdate.id,
        formPengeluaran,
      );
      if (res.status === 200) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/pengeluaran`);
        setShowModalEdit(false);
        setDataUpdate([]);
        toast.success("Pengeluaran  berhasil di edit");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Modal width="w-[60%]" height="h-[90%]">
      <div>
        <button
          onClick={() => setShowModalEdit(!showModalEdit)}
          className="absolute  right-6 top-6"
        >
          <IoMdClose className="text-xl" />
        </button>
      </div>
      <h1 className="w-full text-center text-2xl font-bold">
        Edit Pengeluaran
      </h1>
      <div className="mx-auto grid grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!--  Form Pengeluaran --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Data Pengeluaran
              </h3>
            </div>
            <form>
              <div className="p-6.5">
                {/* TANGGAL BAYAR */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Deskripsi Pengeluaran
                    </label>
                    <input
                      value={formPengeluaran.deskripsi}
                      onChange={(e) =>
                        setFormPengeluaran({
                          ...formPengeluaran,
                          deskripsi: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="deskripsi"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                {/* TANGGAL BAYAR */}

                {/* TANGGAL BAYAR */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Tanggal Bayar
                    </label>
                    <input
                      value={formPengeluaran.tanggal_pengeluaran}
                      onChange={(e) =>
                        setFormPengeluaran({
                          ...formPengeluaran,
                          tanggal_pengeluaran: e.target.value,
                        })
                      }
                      type="date"
                      placeholder="Jumlah"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                {/* TANGGAL BAYAR */}

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Jumlah Bayar
                    </label>
                    <input
                      value={formPengeluaran.jumlah_pengeluaran}
                      onChange={(e) =>
                        setFormPengeluaran({
                          ...formPengeluaran,
                          jumlah_pengeluaran: e.target.value,
                        })
                      }
                      type="number"
                      placeholder="Jumlah"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={(e) => handleEditPengeluaran(e)}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditPengeluaran;
