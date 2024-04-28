import { HttpResponse, http } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  async () => {
    return HttpResponse.json({
      name: "Manager Name",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: "johndoe@example.com",
      id: "",
      role: "manager",
      phone: "00912345678",
    });
  },
);
