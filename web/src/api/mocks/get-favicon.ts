import { HttpResponse, http } from "msw";

export const getFavicon = http.get("/vite.svg", () => {
  return new HttpResponse(null, { status: 200 });
});
