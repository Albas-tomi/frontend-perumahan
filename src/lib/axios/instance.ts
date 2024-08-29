// Mengimpor modul axios untuk melakukan permintaan HTTP
import axios from "axios";

// Mendefinisikan header default untuk setiap permintaan HTTP
const headers = {
  "Content-Type": "application/json", // Menentukan tipe konten sebagai JSON
  Accept: "application/json", // Menerima respons dalam format JSON
  "Cache-Control": "no-cache", // Mencegah penyimpanan cache
  expire: 0, // Menetapkan waktu kedaluwarsa cache ke 0
};

// Membuat instance axios dengan konfigurasi default
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL dasar untuk permintaan API diambil dari environment variable
  headers, // Menggunakan header yang telah didefinisikan sebelumnya
  timeout: 60 * 1000, // Menetapkan batas waktu permintaan menjadi 60 detik
});

// Menambahkan interceptor untuk menangani respons
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

// Menambahkan interceptor untuk menangani permintaan
instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
