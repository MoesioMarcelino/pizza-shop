import { api } from "@/lib/axios";

export type GetDailyRevenueInPeriodPayload = {
  from?: Date;
  to?: Date;
};

export type GetDailyRevenueInPeriodResponse = Array<{
  date: string;
  receipt: number;
}>;

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodPayload) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from,
        to,
      },
    },
  );
  return response.data;
}
