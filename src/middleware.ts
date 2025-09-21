// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // نحاول نجيب التوكن من الكوكيز
  const token = await getToken({ req: request })
  const pathname = request.nextUrl.pathname.toLowerCase()

  // الصفحات المفتوحة (مفيش داعي يكون معاك توكن)
  const authPages = ["/login", "/register", "/forgot-password","/verify-code","/reset-password"]

  // الصفحات اللي محتاجة توكن
  const protectedRoutes = [
    
    "/allorders",
    "/payment",
    "/brands",
    "/categories",
    "/cart",
    "/productdetails"
  ]

  // ✅ لو مفيش توكن وهو داخل على صفحة محمية → نرميه على /login
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // ✅ لو فيه توكن وهو داخل على login/register/forgot-password → نرميه على /
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// لازم الماتشر يكون عشان يطبق على كل الصفحات (مع استثناء ملفات السيستم)
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
}
