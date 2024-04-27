import { HttpResponse, http } from "msw";
import { GetPopularProductsResponse } from "../get-popular-produts";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", async () => {
  return HttpResponse.json([
    { product: "Calabresa", amount: 100 },
    { product: "Portuguesa", amount: 50 },
    { product: "Marguerita", amount: 70 },
    { product: "Baiana", amount: 30 },
    { product: "Frango com catupiry", amount: 150 },
  ]);
});
