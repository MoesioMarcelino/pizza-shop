import { HttpResponse, http } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", async () => {
  return HttpResponse.json({
    name: "Manager Name",
    createdAt: new Date(),
    description: "Manager description",
    id: "2iu34-gh23iu-4423hg",
    managerId: "k23jh-g2j31hb-v223",
    updatedAt: new Date(),
  });
});
