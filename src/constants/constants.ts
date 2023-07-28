const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : 'http://localhost:3000'

const apiUrl = `${baseUrl}/api/trpc`

const maxItemsFetchLimit =
  Number(process.env.NEXT_PUBLIC_MAX_ITEMS_FETCH_LIMIT) ?? 100

const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) ?? 12
const deliveryStartTime = 9
const deliveryEndTime = 21

export {
  apiUrl,
  baseUrl,
  deliveryEndTime,
  deliveryStartTime,
  maxItemsFetchLimit,
  pageSize,
}
