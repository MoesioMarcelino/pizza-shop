import { api } from '@/lib/axios'
import { Profile } from '@/models/profile'

export type GetProfileResponse = Profile

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')
  return response.data
}
