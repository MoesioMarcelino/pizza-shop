import { HttpResponse, http } from "msw";
import { GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", async () => {
  return HttpResponse.json([
    { date: "01/01/2024", receipt: 2000 },
    { date: "02/01/2024", receipt: 800 },
    { date: "03/01/2024", receipt: 1000 },
    { date: "04/01/2024", receipt: 500 },
    { date: "05/01/2024", receipt: 1500 },
    { date: "06/01/2024", receipt: 1700 },
    { date: "07/01/2024", receipt: 100 },
  ]);
});
