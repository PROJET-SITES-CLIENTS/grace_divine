import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Si on est sur une route API et que ce n'est pas un GET, il faut être authentifié
    if (req.nextUrl.pathname.startsWith("/api/") && !req.nextUrl.pathname.startsWith("/api/auth/")) {
      if (req.method !== "GET" && !req.nextauth.token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      // Return true if the user is authorized. If false, the middleware redirects to the signIn page.
      authorized: ({ req, token }) => {
        // La protection stricte par token est requise pour /admin
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token
        }
        // Pour les autres routes (comme API en POST), on gère dans la fonction middleware au-dessus
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
}
