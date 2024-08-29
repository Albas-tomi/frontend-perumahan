import instance from "@/lib/axios/instance";

// MENGGUNAKAN  ENDPOINT DENGAN METHOD GET, POST DAN PUT  === LANGKAH KE 3 ===

export const pengeluaranServices = {
  getAllPengeluaran: () => instance.get("/pengeluaran"),

  addPengeluaran: (data: any) => instance.post("/pengeluaran", data),

  updatePengeluaran: (id: string, data: any) =>
    instance.patch(`/pengeluaran/${id}`, data),

  deletePengeluaran: (id: string) => instance.delete(`/pengeluaran/${id}`),
};
