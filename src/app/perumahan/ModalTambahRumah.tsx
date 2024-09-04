import Modal from "@/components/Modal/Modal";
import { penghuniServices } from "@/services/penghuni";
import { rumahServices } from "@/services/rumah";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { toast } from "sonner";
import { mutate } from "swr";

const ModalTambahRumah = ({
  setShowModalTambah,
  showModalTambah,
  dataPenghuni,
}: {
  setShowModalTambah: React.Dispatch<React.SetStateAction<boolean>>;
  showModalTambah: boolean;
  dataPenghuni: any;
}) => {
  const [formRumah, setFormRumah] = useState({
    nomor_rumah: "",
    status_rumah: "kosong",
    id_penghuni_sekarang: null as any,
    histori_penghuni: "",
  });

  const handleAddRumah = async (e: any) => {
    e.preventDefault();
    try {
      const res = await rumahServices.addRumah(formRumah);
      if (res.status === 201) {
        setShowModalTambah(false);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/rumah`);
        toast.success("Rumah baru ditambahkan");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <Modal width="w-[95%] md:w-[60%]" height=" h-[95%] md:h-[90%]">
      <div>
        <button
          onClick={() => setShowModalTambah(!showModalTambah)}
          className="absolute  right-6 top-6"
        >
          <IoMdClose className="text-xl" />
        </button>
      </div>
      <h1 className="w-full text-center text-2xl font-bold">Tambah Rumah</h1>
      <div className="mx-auto grid grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!--  Form Rumah --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Data Rumah
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nomor Rumah
                    </label>
                    <input
                      onChange={(e) =>
                        setFormRumah({
                          ...formRumah,
                          nomor_rumah: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Nomor Rumah"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* STATUS RUMAH */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Status Rumah
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formRumah.status_rumah}
                      onChange={(e) =>
                        setFormRumah({
                          ...formRumah,
                          status_rumah: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option
                        value="kosong"
                        className="text-body dark:text-bodydark"
                      >
                        Kosong
                      </option>
                      <option
                        value="dihuni"
                        className="text-body dark:text-bodydark"
                      >
                        Dihuni
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* STATUS RUMAH */}
                {/* PENGHUNI RUMAH */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Penghuni Rumah
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formRumah.id_penghuni_sekarang}
                      onChange={(e) =>
                        setFormRumah({
                          ...formRumah,
                          id_penghuni_sekarang: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option
                        value="kosong"
                        className="text-body dark:text-bodydark"
                      >
                        Kosong
                      </option>
                      {dataPenghuni &&
                        dataPenghuni.map((penghuni: any) => (
                          <option
                            value={penghuni.id}
                            className="text-body dark:text-bodydark"
                          >
                            {penghuni.nama_lengkap}
                          </option>
                        ))}
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* PENGHUNI RUMAH */}

                {/* PENGHUNI RUMAH */}
                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Histori Penghuni Rumah
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      // value={selectedOption}
                      // onChange={(e) => setSelectedOption(e.target.value)}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option
                        value="kosong"
                        className="text-body dark:text-bodydark"
                      >
                        Kosong
                      </option>
                      <option
                        value="Tomi"
                        className="text-body dark:text-bodydark"
                      >
                        Tomi
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div> */}
                {/* PENGHUNI RUMAH */}

                <button
                  type="submit"
                  onClick={(e) => handleAddRumah(e)}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Tambahkan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTambahRumah;
