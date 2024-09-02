import { api } from '@/lib/axios'

export interface GetDailyRevenueQuery {
  from?: Date
  to?: Date
}

export type GetDailyRevenueResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenue({
  from,
  to,
}: GetDailyRevenueQuery): Promise<GetDailyRevenueResponse> {
  const response = await api.get('/metrics/daily-receipt-in-period', {
    params: {
      from,
      to,
    },
  })

  return response.data
}
