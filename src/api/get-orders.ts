import { api } from '@/lib/axios'

export type Order = {
  orderId: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customerName: string
  total: number
}

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
