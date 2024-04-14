import { api } from '@/lib/axios'
import { Order } from '@/models/order'

export type GetOrdersPayload = {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: Order['status'] | null
}

export type GetOrdersResponse = {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex = 0,
  customerName,
  orderId,
  status,
}: GetOrdersPayload) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  })

  return response.data
}
