import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { MetricCardSkeleton } from "@/components/metric-cart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DayOrdersAmount() {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"],
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%
                  </span>{" "}
                  em relação à ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}%
                  </span>{" "}
                  em relação à ontem
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
