import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { sigInMock } from "./sign-in.mock";

export const worker = setupWorker(sigInMock);

export async function enableMSW() {
  if (env.MODE !== "test") return;

  await worker.start();
}
