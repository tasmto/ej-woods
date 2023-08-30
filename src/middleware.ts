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
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
