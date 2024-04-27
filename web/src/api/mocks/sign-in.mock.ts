import { http, HttpResponse } from "msw";
import { SignInPayload } from "../sign-in";

export const sigInMock = http.post<never, SignInPayload>(
  "/authenticate",
  async ({ request }) => {
    const { email } = await request.json();

    if (email === "johndoe@example.com") {
      return new HttpResponse(null, {
        status: 200,
        headers: { "Set-Cookie": "auth=sample-jwt" },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
