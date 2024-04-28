import { HttpResponse, http } from "msw";
import { UpdateProfilePayload } from "../update-profile";

export const updateProfileMock = http.put<never, UpdateProfilePayload>(
  "/profile",
  async ({ request }) => {
    const { name } = await request.json();

    if (name === "Pizzaria") {
      return new HttpResponse(null, { status: 204 });
    }

    return new HttpResponse(null, { status: 400 });
  },
);
