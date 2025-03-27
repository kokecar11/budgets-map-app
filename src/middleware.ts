import { auth } from "~/server/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  console.log('middleware session', session);
  if (!session || session.error === "RefreshTokenExpired") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Rutas protegidas
export const config = {
  matcher: ['/dashboard', '/profile/:path*', '/settings/:path*', '/budgets/:path*', '/transactions/:path*'],
};
