import instance from "@/lib/axios/instance";

// MENGGUNAKAN  ENDPOINT DENGAN METHOD GET, POST DAN PUT  === LANGKAH KE 3 ===

export const pembayaranServices = {
  getAllPembayaran: () => instance.get("/pembayaran"),

  addPembayaran: (data: any) => instance.post("/pembayaran", data),

  updatePembayaran: (id: string, data: any) =>
    instance.patch(`/pembayaran/${id}`, data),

  deletePembayaran: (id: string) => instance.delete(`/pembayaran/${id}`),
};
