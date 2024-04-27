import { api } from "@/lib/axios";

export type SignInPayload = {
  email: string;
};

export async function signIn({ email }: SignInPayload) {
  await api.post("/authenticate", { email });
}
