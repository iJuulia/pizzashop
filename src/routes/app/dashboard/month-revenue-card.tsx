import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ['metrics', 'month-revenue'],
  })

  return (
    <Card className='space-y-2'>
      <CardHeader className='flex-row space-y-0 items-center justify-between pb-0'>
        <CardTitle className='text-base font-semibold'>
          Receita total (mês)
        </CardTitle>
        <DollarSign className='size-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='space-y-1'>
        {monthRevenue ? (
          <>
            <span className='text-2xl font-bold tracking-tight'>
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className='text-xs text-muted-foreground'>
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <span className='text-emerald-500 dark:text-emerald-400'>
                  +{monthRevenue.diffFromLastMonth}%
                </span>
              ) : (
                <span className='text-rose-500 dark:text-rose-400'>
                  {monthRevenue.diffFromLastMonth}%
                </span>
              )}{' '}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
