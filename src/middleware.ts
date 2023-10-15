import { authMiddleware } from '@clerk/nextjs'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/shop',
    '/shop/:bar',
    '/shop/:foo:bar',

    '/checkout',
    'cart',

    'carpentry',
    'about',
    'contact',
    'privacy',
    'orders-and-returns',
    'frequency-asked-questions',
    // API routes are always public
    '/api/trpc/products.multipleProducts',
    '/api/trpc/products.singleProduct',
  ],

  // afterAuth(auth, req, evt) {
  //   // handle users who aren't authenticated
  //   // if (!auth.userId && !auth.isPublicRoute) {
  //   //   return redirectToSignIn({ returnBackUrl: req.url })
  //   // }
  //   // // redirect them to organization selection page
  //   // if (
  //   //   auth.userId &&
  //   //   !auth.orgId &&
  //   //   req.nextUrl.pathname !== '/org-selection'
  //   // ) {
  //   // const orgSelection = new URL('/org-selection', req.url)
  //   // return NextResponse.redirect(orgSelection)
  //   // }
  //   // Just allow the request to continue
  //   // return NextResponse.next()
  // },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
