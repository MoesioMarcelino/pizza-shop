import { api } from '@/lib/axios'

export type DeleteOrderPayload = { orderId: string }

export async function cancelOrder({ orderId }: DeleteOrderPayload) {
  await api.patch(`/orders/${orderId}/cancel`)
}
