import { NextRequest, NextResponse } from "next/server";
import { withAUth } from "./middlewares/withAuth";

export const mainMiddleware = (req: NextRequest) => {
  const res = NextResponse.next();
  return res;
};

export default withAUth(mainMiddleware, [
  "/",
  "/penghuni",
  "/perumahan",
  "/pembayaran",
  "/pengeluaran",
]);
