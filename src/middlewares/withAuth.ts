import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const isLoginURL = ["/auth/signin", "/auth/signup"];

export const withAUth = (
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) => {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = req.cookies.get("token");
      if (token === undefined && !isLoginURL.includes(pathname)) {
        const url = new URL(`/auth/signin`, req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token !== undefined) {
        if (isLoginURL.includes(pathname))
          return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, next);
  };
};
