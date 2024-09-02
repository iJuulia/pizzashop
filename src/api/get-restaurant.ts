import { api } from '@/lib/axios'

export interface GetRestaurantResponse {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getRestaurant(): Promise<GetRestaurantResponse> {
  const response = await api.get('/managed-restaurant')

  return response.data
}
