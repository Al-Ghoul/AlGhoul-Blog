import { type NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ar'];
const defaultLocale = 'ar';

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
    if (locales.includes(request.nextUrl.pathname.split('/')[1])) return request.nextUrl.pathname.split('/')[1];
    return defaultLocale;
}

export function middleware(request: NextRequest) {    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/(favicon.ico)?((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
        // Optional: only run on root (/) URL
        // '/'
    ],
}