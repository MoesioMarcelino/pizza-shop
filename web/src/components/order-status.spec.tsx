import { render } from "@testing-library/react";
import { OrderStatus, OrderStatusProps, orderStatusMap } from "./order-status";

describe("Order Status", () => {
  Object.entries(orderStatusMap).map(
    ([key, { color: orderStatusClassName, label: orderStatusLabel }]) => {
      const orderStatus = key as OrderStatusProps["status"];

      it(`should display the right render based on ${orderStatus} order status`, () => {
        const { getByText, getByTestId } = render(
          <OrderStatus status={orderStatus} />,
        );

        const statusTextExpected = getByText(orderStatusLabel);
        const badgeElement = getByTestId("badge");

        expect(statusTextExpected).toBeInTheDocument();
        expect(badgeElement).toHaveClass(orderStatusClassName);
      });
    },
  );
});
