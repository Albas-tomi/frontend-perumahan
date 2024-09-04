import instance from "@/lib/axios/instance";

// MENGGUNAKAN  ENDPOINT DENGAN METHOD GET, POST DAN PUT  === LANGKAH KE 3 ===

export const userServices = {
  getProfile: () =>
    instance.get("/profile", {
      withCredentials: true,
    }),
  signOut: () =>
    instance.get("/signout", {
      withCredentials: true,
    }),

  signInWithGoogle: () =>
    instance.get("/auth/google", {
      withCredentials: true,
    }),

  //   getProductById: (id: string) => instance.get(`/api/product/${id}`),

  //   addRumah: (data: any) => instance.post("/rumah", data),

  //   updateRumah: (id: string, data: any) => instance.patch(`/rumah/${id}`, data),

  //   deleteRumah: (id: string) => instance.delete(`/rumah/${id}`),
};
