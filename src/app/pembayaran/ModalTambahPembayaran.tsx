import Modal from "@/components/Modal/Modal";
import { pembayaranServices } from "@/services/pembayaran";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { toast } from "sonner";
import { mutate } from "swr";

const ModalTambahPembayaran = ({
  setShowModalTambah,
  showModalTambah,
  dataRumah,
  dataPenghuni,
}: {
  setShowModalTambah: React.Dispatch<React.SetStateAction<boolean>>;
  showModalTambah: boolean;
  dataRumah: any;
  dataPenghuni: any;
}) => {
  const [formPembayaran, setFormPembayaran] = useState({
    id_rumah: "",
    id_penghuni: "",
    jumlah_pembayaran: 0 as any,
    jenis_iuran: "",
    status_pembayaran: "",
    tanggal_pembayaran: "",
    bulan_bayar: "",
  });

  const handlePembayaran = async (e: any) => {
    e.preventDefault();
    try {
      const res = await pembayaranServices.addPembayaran(formPembayaran);
      if (res.status === 201) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/pembayaran`);
        setShowModalTambah(false);
        toast.success("Pembayaran  berhasil di tambahkan");
      }
      setShowModalTambah(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  console.log(dataRumah);
  return (
    <Modal width="w-[60%]" height="h-[90%]">
      <div>
        <button
          onClick={() => setShowModalTambah(!showModalTambah)}
          className="absolute  right-6 top-6"
        >
          <IoMdClose className="text-xl" />
        </button>
      </div>
      <h1 className="w-full text-center text-2xl font-bold">Tambah Penghuni</h1>
      <div className="mx-auto grid grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!--  Form Pembayaran --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Data Pembayaran
              </h3>
            </div>
            <form>
              <div className="p-6.5">
                {/* SELECT OPTION RUMAH */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nomor Rumah
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formPembayaran.id_rumah}
                      onChange={(e) =>
                        setFormPembayaran({
                          ...formPembayaran,
                          id_rumah: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Pilih Nomor Rumah
                      </option>
                      {dataRumah?.map((rumah: any) => (
                        <option
                          value={rumah.id}
                          className="text-body dark:text-bodydark"
                        >
                          {rumah.nomor_rumah} -{" "}
                          {rumah?.penghuni_sekarang?.nama_lengkap}
                        </option>
                      ))}
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* SELECT OPTION RUMAH */}

                {/* SELECT OPTION PENGHUNI */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Penghuni
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formPembayaran.id_penghuni}
                      onChange={(e) =>
                        setFormPembayaran({
                          ...formPembayaran,
                          id_penghuni: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Pilih Penghuni
                      </option>
                      {dataPenghuni?.map((penghuni: any) => (
                        <option
                          value={penghuni.id}
                          className="text-body dark:text-bodydark"
                        >
                          {penghuni?.nama_lengkap}
                        </option>
                      ))}
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* SELECT OPTION PENGHUNI */}

                {/* SELECT OPTION IURAN */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Iuran
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formPembayaran.jenis_iuran}
                      onChange={(e) =>
                        setFormPembayaran({
                          ...formPembayaran,
                          jenis_iuran: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Pilih Iuran
                      </option>
                      <option
                        value="satpam"
                        className="text-body dark:text-bodydark"
                      >
                        Satpam
                      </option>
                      <option
                        value="kebersihan"
                        className="text-body dark:text-bodydark"
                      >
                        Kebersihan
                      </option>
                      <option
                        value="lain-lain"
                        className="text-body dark:text-bodydark"
                      >
                        Lain-lain
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* SELECT OPTION IURAN */}

                {/* SELECT OPTION IURAN */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Bulan Pembayaran
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formPembayaran.bulan_bayar}
                      onChange={(e) =>
                        setFormPembayaran({
                          ...formPembayaran,
                          bulan_bayar: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Pilih Bulan
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

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* SELECT OPTION IURAN */}

                {/* SELECT OPTION STATUS BAYAR */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Status Pembayaran
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formPembayaran.status_pembayaran}
                      onChange={(e) =>
                        setFormPembayaran({
                          ...formPembayaran,
                          status_pembayaran: e.target.value,
                        })
                      }
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Pilih Status
                      </option>
                      <option
                        value="lunas"
                        className="text-body dark:text-bodydark"
                      >
                        Lunas
                      </option>
                      <option
                        value="cicil"
                        className="text-body dark:text-bodydark"
                      >
                        di cicil
                      </option>
                      <option
                        value="dibatalkan"
                        className="text-body dark:text-bodydark"
                      >
                        Di batalkan
                      </option>
                      <option
                        value="1tahun"
                        className="text-body dark:text-bodydark"
                      >
                        1 Tahun Bayar
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <MdArrowDropDown className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* SELECT OPTION STATUS BAYAR */}

                {/* TANGGAL BAYAR */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Tanggal Bayar
                    </label>
                    <input
                      value={formPembayaran.tanggal_pembayaran}
                      onChange={(e) =>
                        setFormPembayaran({
                          ...formPembayaran,
                          tanggal_pembayaran: e.target.value,
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
                      value={formPembayaran.jumlah_pembayaran}
                      onChange={(e) =>
                        setFormPembayaran({
                          ...formPembayaran,
                          jumlah_pembayaran: e.target.value,
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
                  onClick={(e) => handlePembayaran(e)}
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

export default ModalTambahPembayaran;
