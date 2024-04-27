import { HttpResponse, http } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", async () => {
  return HttpResponse.json({
    name: "Pizza Shop",
    createdAt: new Date(),
    description: "Pizza Shop custom description",
    id: "custom-restaurant-id",
    managerId: "custom-user-id",
    updatedAt: new Date(),
  });
});
