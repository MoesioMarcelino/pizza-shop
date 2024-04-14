import { api } from '@/lib/axios'

export type GetOrdersPayload = {
  pageIndex?: number
}

export type Order = {
  orderId: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customerName: string
  total: number
}

export type GetOrdersResponse = {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({ pageIndex = 0 }: GetOrdersPayload) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
