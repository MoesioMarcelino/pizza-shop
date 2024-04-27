import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period.mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount.mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount.mock";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount.mock";
import { getMonthRevenueMock } from "./get-month-revenue.mock";
import { getPopularProductsMock } from "./get-popular-products.mock";
import { getProfileMock } from "./get-profile.mock";
import { registerRestaurantMock } from "./register-restaurant.mock";
import { sigInMock } from "./sign-in.mock";
import { updateProfileMock } from "./update-profile.mock";

export const worker = setupWorker(
  sigInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getDailyRevenueInPeriodMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") return;

  await worker.start();
}
