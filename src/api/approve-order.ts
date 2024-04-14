import { api } from '@/lib/axios'

export type ApproverOrderPayload = { orderId: string }

export async function approveOrder({ orderId }: ApproverOrderPayload) {
  await api.patch(`/orders/${orderId}/approve`)
}
