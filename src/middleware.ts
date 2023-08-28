import { authMiddleware } from '@clerk/nextjs'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/shop',
    '/shop/[category]',
    '/shipping',
    '/checkout',
    'cart',
    'payment',
    'carpentry',
    'about',
    'contact',
    'privacy',
    'orders-and-returns',
    'frequency-asked-questions',
  ],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
