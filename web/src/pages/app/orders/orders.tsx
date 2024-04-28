import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { getOrders } from "@/api/get-orders";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/models/order";

import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table-row";
import { OrderTableSkeleton } from "./order-table-skeleton";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId")?.trim();
  const customerName = searchParams.get("customerName")?.trim();
  const status = searchParams.get("status")?.trim() as Order["status"] & "all";

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? 1);

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === "all" ? null : status,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set("page", (pageIndex + 1).toString());
      return prev;
    });
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead className="w-">Client</TableHead>
                  <TableHead className="w-[140px]">Total</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingOrders && <OrderTableSkeleton />}
                {result && result.orders.length >= 1 ? (
                  result.orders.map((order) => (
                    <OrderTableRow key={order.orderId} {...order} />
                  ))
                ) : (
                  <TableCell colSpan={7} className="text-center">
                    Nenhum resultado encontrado
                  </TableCell>
                )}
              </TableBody>
            </Table>
          </div>
          {result && result.orders.length >= 1 && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              perPage={result.meta.perPage}
              totalCount={result.meta.totalCount}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  );
}
