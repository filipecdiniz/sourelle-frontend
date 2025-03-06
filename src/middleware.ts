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

export const adminRoutes = [
    { path: '/admin/*', whenAuthenticated: 'next' },
    { path: '/admin', whenAuthenticated: 'next' }
] as const;


const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => {
        const regex = new RegExp(`^${route.path.replace('*', '.*')}$`);
        return regex.test(url);
    });
    const adminRoute = adminRoutes.find(route => {
        const regex = new RegExp(`^${route.path.replace('*', '.*')}$`);
        return regex.test(url);
    });
    const authToken = request.cookies.get('authToken');
    const user = request.cookies.get('user');
    let authData = null;
    let typeUser = 0;
    if (authToken) {
        try {
            const base64Url = authToken.value.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            authData = JSON.parse(jsonPayload);
            typeUser = authData.typeUser;
        } catch (error) {
            console.error('Failed to parse authToken:', error);
        }
    }
    if (!user && publicRoute) {
        return NextResponse.next();
    }
    if (!user && !publicRoute) {
        if (adminRoute && typeUser !== 2) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
            return NextResponse.redirect(redirectUrl)
        }
        if (!adminRoute && typeUser !== 2) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
            return NextResponse.redirect(redirectUrl)
        }
        if (adminRoute && typeUser === 2) {
            return NextResponse.next();
        }

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
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$|.*\\.jpg$).*)',
    ],
}