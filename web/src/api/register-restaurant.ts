import { api } from '@/lib/axios'

export type RegisterRestaurantPayload = {
  email: string
  restaurantName: string
  managerName: string
  phone: string
}

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterRestaurantPayload) {
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
