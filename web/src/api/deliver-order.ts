import { api } from "@/lib/axios";

export type DeliverOrderPayload = { orderId: string };

export async function deliverOrder({ orderId }: DeliverOrderPayload) {
  await api.patch(`/orders/${orderId}/deliver`);
}
