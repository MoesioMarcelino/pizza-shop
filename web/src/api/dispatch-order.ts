import { api } from '@/lib/axios'

export type DispatchOrderPayload = { orderId: string }

export async function dispatchOrder({ orderId }: DispatchOrderPayload) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
