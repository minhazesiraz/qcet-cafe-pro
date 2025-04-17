import { NextResponse } from "next/server";
import {
   ADMIN_ROUTES,
   AWAITING_CONFIRMATION_ROUTES,
   CLIENT_ROUTES,
   MODERATOR_ROUTES,
   PROVING_ROUTES,
   PUBLIC_ROUTES
} from "./lib/routes";

const { default: NextAuth } = require("next-auth");
const { auth_config } = require("./auth.config");

const { auth } = NextAuth(auth_config);

export default auth((req) => {
   const { nextUrl, auth } = req;
   const pathname = nextUrl.pathname;

   const user = auth?.user;
   const role = user?.role;
   const isProve = user?.isProve;

   console.log("\n user in middleware:", user);

   const isPublicPage = PUBLIC_ROUTES.some((street) => {
      if (street.endsWith("/[slug]")) {
         const base = street.replace("/[slug]", "");

         return pathname.startsWith(base + "/");
      }
      return street === pathname;
   });

   const isAdminPage = ADMIN_ROUTES.some((street) =>
      pathname.startsWith(street)
   );

   const isModeratorPage = MODERATOR_ROUTES.some((street) =>
      pathname.startsWith(street)
   );

   const isClientPage = CLIENT_ROUTES.some((street) =>
      pathname.startsWith(street)
   );

   const isProvingPage = PROVING_ROUTES.some((street) =>
      pathname.startsWith(street)
   );

   const isAwaitingConfirmationPage = AWAITING_CONFIRMATION_ROUTES.some(
      (street) => pathname.startsWith(street)
   );

   if (user && isProve !== true && !isProvingPage) {
      return NextResponse.redirect(
         new URL(`/accounts/awaiting-confirmation?email=${user.email}`, nextUrl)
      );
   }

   if (user && isProve === true && isAwaitingConfirmationPage) {
      return NextResponse.redirect(new URL("/", nextUrl));
   }

   //  if (user && isProve !== true && !isProvingPage) {
   //     const res = NextResponse.redirect(
   //        new URL(`/accounts/awaiting-confirmation?email=${user.email}`, nextUrl)
   //     );

   //     // 🍪 Clear the session cookie (adjust name if needed)
   //     res.cookies.set("next-auth.session-token", "", {
   //        path: "/",
   //        expires: new Date(0)
   //     });

   //     res.cookies.set("__Secure-next-auth.session-token", "", {
   //        path: "/",
   //        expires: new Date(0)
   //     });

   //     return res;
   //  }

   if (isPublicPage) {
      return null;
   }

   if (!user && (isAdminPage || isModeratorPage || isClientPage)) {
      return NextResponse.redirect(new URL("/accounts/logon", nextUrl));
   }

   if (isAdminPage && role !== "admin") {
      return NextResponse.redirect(new URL("/", nextUrl));
   }

   if (isModeratorPage && !["admin", "moderator"].includes(role)) {
      return NextResponse.redirect(new URL("/", nextUrl));
   }

   if (isClientPage && !["admin", "client"].includes(role)) {
      return NextResponse.redirect(new URL("/", nextUrl));
   }

   return NextResponse.next();
});

export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
