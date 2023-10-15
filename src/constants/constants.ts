const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : 'http://localhost:3000'

const apiUrl = `${baseUrl}/api/trpc`

const maxItemsFetchLimit =
  Number(process.env.NEXT_PUBLIC_MAX_ITEMS_FETCH_LIMIT) ?? 100

const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_SIZE) ?? 12
const deliveryStartTime = 9
const deliveryEndTime = 21

const deliveryTimes = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
]

const paymentMethods: {
  id: PaymentMethodsIds
  name: string
  description: string
  logo: string
  supportedMethodsLogos: string
}[] = [
  {
    id: 'pod' as const,
    name: 'Pay on Delivery',
    description: 'Pay when you receive your order',
    logo: '/images/cash-on-delivery.png',
    supportedMethodsLogos: '/images/cash-on-delivery-methods.png',
  },
  {
    id: 'peach' as const,
    name: 'Peach Payments',
    description: 'Pay with your credit card',
    logo: '/images/peach-payments-logo.png',
    supportedMethodsLogos: '/images/peach-payments-methods.png',
  },
]

export type PaymentMethodsIds = 'pod' | 'peach'
export const paymentMethodsIds = paymentMethods.map(
  (method) => method.id as PaymentMethodsIds
)
export {
  apiUrl,
  baseUrl,
  deliveryEndTime,
  deliveryStartTime,
  deliveryTimes,
  maxItemsFetchLimit,
  pageSize,
  paymentMethods,
}

export const contactInfo = {
  openingHours: 'Open 6am/10pm Monday - Friday & 8am - 6pm Saturday- Sunday',
  phoneNumber: '+27 65 000 0000',
  email: 'info@ej-wood.co.za',
  whatsAppLink: 'https://wa.me/0000000000',
  location: '0000 Street Name, City, Province, Country',
}

export const errorPageGif =
  'https://media2.giphy.com/media/3ktLJJs5fYT6NP005b/giphy.gif?cid=ecf05e47dy411abkf25ynnzzpb5hz4245m8dnxojwyfbu6ih&ep=v1_gifs_search&rid=giphy.gif&ct=g'
