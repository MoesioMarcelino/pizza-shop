import { api } from '@/lib/axios'

export type LogInPayload = {
  email: string
}

export async function login({ email }: LogInPayload) {
  await api.post('/authenticate', { email })
}
