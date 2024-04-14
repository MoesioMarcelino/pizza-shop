import { api } from '@/lib/axios'

export type UpdateProfilePayload = {
  name: string
  description: string | null
}

export async function updateProfile({
  name,
  description,
}: UpdateProfilePayload) {
  await api.put('/profile', { name, description })
}
