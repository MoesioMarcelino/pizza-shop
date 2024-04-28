import { HttpResponse, http } from "msw";
import type { GetOrdersPayload, GetOrdersResponse } from "../get-orders";

type Orders = GetOrdersResponse["orders"];
type Status = GetOrdersResponse["orders"][number]["status"];

const statusList: Status[] = [
  "canceled",
  "delivered",
  "delivering",
  "pending",
  "processing",
];

const orders: Orders = Array.from({ length: 60 }).map((_, index) => ({
  orderId: `order-${index + 1}`,
  customerName: `Customer ${index + 1}`,
  createdAt: new Date().toISOString(),
  total: 2400,
  status: statusList[index % statusList.length],
}));

export const getOrdersMock = http.get<
  never,
  GetOrdersPayload,
  GetOrdersResponse
>("/orders", async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const pageIndex = searchParams.get("pageIndex")
    ? Number(searchParams.get("pageIndex"))
    : 0;
  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  let filteredOrders = orders;

  console.table({ orderId, customerName, status });

  if (customerName) {
    filteredOrders = filteredOrders.filter((order) =>
      order.customerName.includes(customerName),
    );
  }

  if (orderId) {
    filteredOrders = filteredOrders.filter((order) =>
      order.orderId.includes(orderId),
    );
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  const paginatedOrders = filteredOrders.slice(
    pageIndex * 10,
    (pageIndex + 1) * 10,
  );

  return HttpResponse.json({
    orders: paginatedOrders,
    meta: {
      pageIndex,
      perPage: 10,
      totalCount: filteredOrders.length,
    },
  });
});
