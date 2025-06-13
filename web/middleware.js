import { NextResponse } from 'next/server'

export function middleware(request) {
	// Get the token from localStorage (stored by your AuthProvider)
	const token = request.cookies.get('token')?.value || 
						request.headers.get('authorization')?.split(' ')[1]
	const userAuthenticated = !!token

	// If user not authenticated and trying to access protected route, redirect to login
	if (request.nextUrl.pathname.startsWith('/settings')) {
		if (!userAuthenticated) {
			const msg = 'Please login to access this page'
      const url = new URL('/auth/login', request.nextUrl.origin)
      url.searchParams.set('alert', msg)
			return NextResponse.redirect(url)
		}
	}

	// If user already authenticated
	if (request.nextUrl.pathname.startsWith('/auth/')) {
		if (userAuthenticated) {
			const msg = 'You are already logged in'
      const url = new URL('/', request.nextUrl.origin)
      url.searchParams.set('notice', msg)
			return NextResponse.redirect(url)
		}
	}

  return NextResponse.next()
}

export const config = {
  // This will only run the middleware on routes within (protected) folders
  matcher: [
    '/settings/:path*',
    '/auth/:path*'
  ]
} 