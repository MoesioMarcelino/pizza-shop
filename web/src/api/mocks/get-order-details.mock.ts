import { HttpResponse, http } from "msw";
import {
  GetOrderDetailsPayload,
  GetOrderDetailsResponse,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  GetOrderDetailsPayload,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", async ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "00912345678",
    },
    createdAt: new Date().toISOString(),
    status: "pending",
    totalInCents: 4400,
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 2400,
        product: { name: "Pizza Pepperoni" },
        quantity: 1,
      },
      {
        id: "order-item-2",
        priceInCents: 1000,
        product: { name: "Pizza Marguerita" },
        quantity: 2,
      },
    ],
  });
});
