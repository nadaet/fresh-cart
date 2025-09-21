// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const pathname = request.nextUrl.pathname.toLowerCase() // 👈 خليها lowercase

  // الصفحات المفتوحة
  const authPage = ["/login", "/register"]

  // الصفحات المحمية
  const protectedRoutes = ["/", "/allorders", "/payment", "/brands", "/categories", "/cart", "/productdetails"]

  // لو مفيش توكن وهو داخل على صفحة محمية
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // لو فيه توكن وهو داخل على login أو register
  if (token && authPage.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
}
