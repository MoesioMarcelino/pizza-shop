import { HttpResponse, http } from "msw";
import { GetMonthRevenueResponse } from "../get-mounth-revenue";

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>("/metrics/month-receipt", async () => {
  return HttpResponse.json({
    receipt: 40000,
    diffFromLastMonth: 7,
  });
});
