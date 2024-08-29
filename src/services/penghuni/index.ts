import instance from "@/lib/axios/instance";

// MENGGUNAKAN  ENDPOINT DENGAN METHOD GET, POST DAN PUT  === LANGKAH KE 3 ===

export const penghuniServices = {
  getAllPenghuni: () => instance.get("/penghuni"),

  getProductById: (id: string) => instance.get(`/api/product/${id}`),

  addPenghuni: (data: any) => instance.post("/penghuni", data),

  updatePenghuni: (id: string, data: any) =>
    instance.patch(`/penghuni/${id}`, data),

  deletePenghuni: (id: string) => instance.delete(`/penghuni/${id}`),
};
