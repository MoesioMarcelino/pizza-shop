import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Loader2, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { DateRangePicker } from "@/components/data-range-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function RevenueChart() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFrom =
    searchParams.get("from") ?? dayjs(new Date()).subtract(7, "days");
  const dateTo = searchParams.get("to") ?? new Date();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs(dateFrom).toDate(),
    to: dayjs(dateTo).toDate(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({ from: dateRange?.from, to: dateRange?.to }),
  });

  function handleChangeDate(date?: DateRange) {
    setDateRange(date);
    setSearchParams((prev) => {
      prev.set("from", dayjs(date?.from).toDate().toString());
      prev.set("to", dayjs(date?.to).toDate().toString());

      return prev;
    });
  }

  const charData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => ({
      ...chartItem,
      receipt: chartItem.receipt / 100,
    }));
  }, [dailyRevenueInPeriod]);

  function resetDateRange() {
    setDateRange(undefined);
  }

  return (
    <Card className="col-span-2">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker
            id="period"
            date={dateRange}
            onDateChange={handleChangeDate}
          />
          <Button variant="secondary" onClick={resetDateRange}>
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {charData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart style={{ fontSize: 12 }} data={charData}>
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet[400]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
