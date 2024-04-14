import { api } from '@/lib/axios'
import { Customer } from '@/models/customer'
import { Order } from '@/models/order'

export type GetOrderDetailsPayload = { orderId: string }

export type GetOrderDetailsResponse = {
  id: string
  createdAt: string
  status: Order['status']
  totalInCents: number
  customer: Customer
  orderItems: Array<{
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }>
}

export async function getOrderDetails({ orderId }: GetOrderDetailsPayload) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
