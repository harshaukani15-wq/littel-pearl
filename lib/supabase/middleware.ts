import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define protected routes
  const isAccountRoute = request.nextUrl.pathname.startsWith('/account')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/harshafeni')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')
  const isAdminLoginRoute = request.nextUrl.pathname === '/harshafeni/login'

  // Custom Admin Password Check
  if (isAdminRoute && !isAdminLoginRoute) {
    const adminCookie = request.cookies.get('admin_auth_cookie')?.value
    const adminCookieValue = process.env.ADMIN_AUTH_COOKIE || 'harshafeni_secure'
    if (adminCookie !== adminCookieValue) {
      const url = request.nextUrl.clone()
      url.pathname = '/harshafeni/login'
      return NextResponse.redirect(url)
    }
  }

  if (
    !user &&
    isAccountRoute
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }
  
  if (user && isAuthRoute && !request.nextUrl.pathname.includes('/auth/callback')) {
    // user is logged in but trying to access auth pages, redirect to account
    const url = request.nextUrl.clone()
    url.pathname = '/account'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}
