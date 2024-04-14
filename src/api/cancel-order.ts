import { api } from '@/lib/axios'

export type GetOrderDetailsPayload = { orderId: string }

export async function cancelOrder({ orderId }: GetOrderDetailsPayload) {
  await api.patch(`/orders/${orderId}/cancel`)
}
