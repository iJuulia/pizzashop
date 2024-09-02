import { api } from '@/lib/axios'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts(): Promise<GetPopularProductsResponse> {
  const response = await api.get('/metrics/popular-products')

  return response.data
}
