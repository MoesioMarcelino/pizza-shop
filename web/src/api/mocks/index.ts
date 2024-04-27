import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { registerRestaurantMock } from "./register-restaurant.mock";
import { sigInMock } from "./sign-in.mock";

export const worker = setupWorker(sigInMock, registerRestaurantMock);

export async function enableMSW() {
  if (env.MODE !== "test") return;

  await worker.start();
}
