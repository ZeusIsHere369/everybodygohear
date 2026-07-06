// Provide minimal ambient types if `next/server` types are unavailable to
// avoid "Cannot find module 'next/server'" TypeScript errors in environments
// where Next types are not installed.
// @ts-ignore: Module augmentation may fail in environments without Next types
declare module "next/server" {
  export type NextRequest = any;
  export const NextResponse: any;
}

// @ts-ignore: Allow environments without Next.js types to compile using the
// ambient module declared above.
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // For now, just allow all requests.
  // We'll add Supabase session checking next.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/newsroom/:path*"],
};