import { HttpResponse, http } from "msw";
import { DeleteOrderPayload } from "../cancel-order";

export const cancelOrderMock = http.patch<DeleteOrderPayload, never, never>(
  "/orders/:orderId/cancel",
  async ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);
