import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface CustomerDetails {
  name: string
  phone_number: string
  email_address: string
}
export interface OrderDetails {
  delivery_address: string
  delivery_phone_number?: string
  preferred_times?: string[]
  payment_method?: string
}

interface CheckoutState {
  customer_details: CustomerDetails
  order: OrderDetails

  updateCustomerDetails: (details: CustomerDetails) => void
  updateOrderDetails: (details: OrderDetails) => void
}

const useCheckoutStore = create<CheckoutState>()(
  devtools(
    persist((set, get) => ({
      customer_details: {
        name: '',
        phone_number: '',
        email_address: '',
      },
      order: {
        delivery_address: '',
        delivery_phone_number: '',
        preferred_times: ['', ''],
        payment_method: '',
      },

      updateCustomerDetails: (details) => {
        set(({ customer_details }) => {
          return { customer_details: { ...customer_details, details } }
        })
      },
      updateOrderDetails: (details) => {
        set(({ order }) => {
          return { order: { ...order, details } }
        })
      },
      getOrderDetails: () => get().order,
      getCustomerDetails: () => get().customer_details,
      getCheckoutDetails: () => ({
        order: get().order,
        customer_details: get().customer_details,
      }),
    }))
  )
)

export { useCheckoutStore }
