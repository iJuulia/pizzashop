import { api } from '@/lib/axios'

export interface GetMonthRevenueResponse {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthRevenue(): Promise<GetMonthRevenueResponse> {
  const response = await api.get('/metrics/month-receipt')

  return response.data
}
