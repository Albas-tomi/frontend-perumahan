import Modal from "@/components/Modal/Modal";
import { penghuniServices } from "@/services/penghuni";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { toast } from "sonner";
import { mutate } from "swr";

const ModalEditPenghuni = ({
  setShowModalEdit,
  showModalEdit,
  dataUpdate,
  setdataUpdate,
}: {
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  showModalEdit: boolean;
  dataUpdate: any;
  setdataUpdate: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [formPenghuni, setFormPenghuni] = useState({
    nama_lengkap: dataUpdate.nama_lengkap || "",
    foto_ktp: dataUpdate.foto_ktp || "",
    status_penghuni: dataUpdate.status_penghuni || "",
    nomor_telepon: dataUpdate.nomor_telepon || "",
    status_menikah: dataUpdate.status_menikah || "",
  });
  const handleEditPenghuni = async (e: any) => {
    e.preventDefault();
    try {
      const res = await penghuniServices.updatePenghuni(
        dataUpdate.id,
        formPenghuni,
      );
      if (res.status === 200) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/penghuni`);
        setShowModalEdit(false);
        setdataUpdate([]);
        toast.success("Penghuni  berhasil di edit");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
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
      <h1 className="w-full text-center text-2xl font-bold">Edit Penghuni</h1>
      <div className="mx-auto grid grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!--  Form Penghuni --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Data Penghuni
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nama Lengkap
                    </label>
                    <input
                      value={formPenghuni.nama_lengkap}
                      onChange={(e) =>
                        setFormPenghuni({
                          ...formPenghuni,
                          nama_lengkap: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Nama Lengkap"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* FOTO KTP */}
                <div className="mb-2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tambahkan KTP
                  </label>
                  <input
                    type="file"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>
                {/* FOTO KTP */}

                {/* SELECT OPTION STATUS Penghuni */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Status Penghuni
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formPenghuni.status_penghuni}
                      onChange={(e) =>
                        setFormPenghuni({
                          ...formPenghuni,
                          status_penghuni: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option
                        value="tetap"
                        className="text-body dark:text-bodydark"
                      >
                        Tetap
                      </option>
                      <option
                        value="kontrak"
                        className="text-body dark:text-bodydark"
                      >
                        Kontrak
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* SELECT OPTION NOMOR Penghuni */}

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nomor Telepon
                    </label>
                    <input
                      value={formPenghuni.nomor_telepon}
                      onChange={(e) =>
                        setFormPenghuni({
                          ...formPenghuni,
                          nomor_telepon: e.target.value,
                        })
                      }
                      type="tel"
                      placeholder="Nomor Telepon"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* STATUS Pernikahan */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Status Pernikahan
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formPenghuni.status_menikah}
                      onChange={(e) =>
                        setFormPenghuni({
                          ...formPenghuni,
                          status_menikah: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option
                        value="menikah"
                        className="text-body dark:text-bodydark"
                      >
                        Menikah
                      </option>
                      <option
                        value="belum menikah"
                        className="text-body dark:text-bodydark"
                      >
                        Belum Menikah
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* STATUS Penghuni */}

                <button
                  onClick={(e) => {
                    handleEditPenghuni(e);
                  }}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditPenghuni;
