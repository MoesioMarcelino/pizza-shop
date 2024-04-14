import { api } from '@/lib/axios'

export type DeliveryOrderPayload = { orderId: string }

export async function deliveryOrder({ orderId }: DeliveryOrderPayload) {
  await api.patch(`/orders/${orderId}/deliver`)
}
