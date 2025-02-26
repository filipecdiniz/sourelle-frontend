import { MiddlewareConfig, NextRequest } from "next/server"

export const publicRoutes = [
    { path: "/login", whenAuthenticated: 'redirect' },
    { path: "/register", whenAuthenticated: 'redirect' },
    { path: "/categoria", whenAuthenticated: 'next' },
] as const

export async function middlware(request: NextRequest) {
    const url = request.nextUrl.pathname;
    const authToken = request.cookies.get('authToken');
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}