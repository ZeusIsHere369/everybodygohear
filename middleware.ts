// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // For now, just allow all requests.
  // We'll add Supabase session checking next.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/newsroom/:path*"],
};