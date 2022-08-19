const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

const apiUrl = `${baseUrl}/api/trpc`

const maxItemsFetchLimit =
  Number(process.env.NEXT_PUBLIC_MAX_ITEMS_FETCH_LIMIT) ?? 100

const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) ?? 12

export { apiUrl, baseUrl, maxItemsFetchLimit, pageSize }
