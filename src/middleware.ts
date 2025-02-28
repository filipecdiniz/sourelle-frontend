import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

export const publicRoutes = [
    { path: "/login", whenAuthenticated: 'redirect' },
    { path: "/register", whenAuthenticated: 'redirect' },
    { path: "/", whenAuthenticated: 'next' },
    { path: "/categoria/*", whenAuthenticated: 'next' },
    { path: "/produto/*", whenAuthenticated: 'next' },
    { path: "/checkout/profile", whenAuthenticated: 'next' },
    { path: "/checkout/cart", whenAuthenticated: 'next' },
] as const;


const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => {
        const regex = new RegExp(`^${route.path.replace('*', '.*')}$`);
        return regex.test(url);
    });
    const user = request.cookies.get('user');
    if (!user && publicRoute) {
        return NextResponse.next();
    }
    if (!user && !publicRoute) {

        const redirectUrl = request.nextUrl.clone()
        // console.log(redirectUrl.pathname)
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        return NextResponse.redirect(redirectUrl)
    }
    if (user && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/'
        return NextResponse.redirect(redirectUrl)
    }
    if (user && publicRoute && publicRoute.whenAuthenticated === 'next') {
        return NextResponse.next();
    }
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - .png (image files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)',
    ],
}