import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(
  request: NextRequest
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    return NextResponse.redirect(new URL("/login?error=auth_not_configured", request.url));
  }

  let response = NextResponse.next({
    request,
  });


  const supabase = createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) =>
              request.cookies.set(
                name,
                value
              )
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) =>
              response.cookies.set(
                name,
                value,
                options
              )
          );
        },
      },
    }
  );


  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();


  const pathname = request.nextUrl.pathname;
  const protectedPaths = ["/dashboard", "/create", "/documents", "/settings"];

  if (
    protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`)) &&
    !user
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }


  return response;
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create/:path*",
    "/documents/:path*",
    "/settings/:path*",
  ],
};