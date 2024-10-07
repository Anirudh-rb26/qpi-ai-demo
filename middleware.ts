import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// admin only access routes
const isAdminRoute = createRouteMatcher(["/upload-files(.*)"]);

export default clerkMiddleware((auth, req) => {
  const user = auth();
  // Protect all routes starting with `/admin`
  if (isAdminRoute(req)) {
    if (!user) {
      const url = new URL("/sign-in", req.url);
      return NextResponse.redirect(url);
    }

    if (auth().sessionClaims?.metadata?.role !== "admin") {
      const url = new URL("/fallback/no-access", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
