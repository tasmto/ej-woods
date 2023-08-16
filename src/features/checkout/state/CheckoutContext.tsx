import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { paymentMethods, PaymentMethodsIds } from '@/constants/constants'

export interface CustomerDetails {
  name: string
  phone_number: string
  email_address: string
}
export interface OrderDetails {
  delivery_address: string
  delivery_phone_number: string
  preferred_time_end: string
  preferred_time_start: string
  payment_method?: string
}

export interface PaymentDetails {
  payment_method: PaymentMethodsIds
}

interface CheckoutState {
  customer_details: CustomerDetails
  order: OrderDetails
  payment_details: PaymentDetails

  updateCustomerDetails: (details: CustomerDetails) => void
  updateOrderDetails: (details: OrderDetails) => void
  updatePaymentDetails: (details: PaymentDetails) => void
}

const useCheckoutStore = create<CheckoutState>()(
  devtools(
    persist(
      (set, get) => ({
        customer_details: {
          name: '',
          phone_number: '',
          email_address: '',
        },
        order: {
          delivery_address: '',
          delivery_phone_number: '',
          preferred_time_end: '',
          preferred_time_start: '',
        },
        payment_details: {
          payment_method: paymentMethods[0]?.id as PaymentMethodsIds,
        },

        updateCustomerDetails: ({ name, phone_number, email_address }) => {
          set(({ customer_details }) => {
            return {
              customer_details: {
                ...customer_details,
                name,
                phone_number,
                email_address,
              },
            }
          })
        },
        updateOrderDetails: ({
          delivery_address,
          delivery_phone_number,
          preferred_time_end,
          preferred_time_start,
          payment_method,
        }) => {
          set(({ order }) => {
            return {
              order: {
                ...order,
                delivery_address,
                delivery_phone_number,
                preferred_time_end,
                preferred_time_start,
                payment_method,
              },
            }
          })
        },
        updatePaymentDetails: ({ payment_method }) => {
          set(({ payment_details }) => {
            console.log(payment_details)
            return {
              payment_details: {
                ...payment_details,
                payment_method,
              },
            }
          })
        },

        getOrderDetails: () => get().order,
        getCustomerDetails: () => get().customer_details,
        getPaymentDetails: () => get().payment_details,
        getCheckoutDetails: () => ({
          order: get().order,
          customer_details: get().customer_details,
          payment_details: get().payment_details,
        }),
      }),
      {
        name: 'checkout-storage',
      }
    )
  )
)

export { useCheckoutStore }
