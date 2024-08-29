import { Metadata } from "next";
import HomePage from "./home/page";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
