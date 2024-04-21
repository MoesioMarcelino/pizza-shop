import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getOrderDetails } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailsSkeleton } from "./order-details-skeleton";

export type OrderDetailsProps = {
  orderId: string;
  open: boolean;
};

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  });

  // if (!order) {
  //   return null;
  // }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      {order ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <OrderStatus status={order.status} />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.phone ?? "Não informado"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {dayjs(order.createdAt).fromNow()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {order.orderItems && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map(
                  ({ id, priceInCents, product, quantity }) => (
                    <TableRow key={id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">{quantity}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {(priceInCents / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {((priceInCents * quantity) / 100).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          },
                        )}
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total do pedido</TableCell>
                  <TableCell className="text-right font-medium">
                    {(order.totalInCents / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  );
}
