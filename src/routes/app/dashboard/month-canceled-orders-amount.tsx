import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Ban } from 'lucide-react'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ['metrics', 'month-canceled-orders-amount'],
  })

  return (
    <Card className='space-y-2'>
      <CardHeader className='flex-row space-y-0 items-center justify-between pb-0'>
        <CardTitle className='text-base font-semibold'>
          Cancelamentos (mês)
        </CardTitle>
        <Ban className='size-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='space-y-1'>
        {monthCanceledOrdersAmount ? (
          <>
            <span className='text-2xl font-bold tracking-tight'>
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className='text-xs text-muted-foreground'>
              {monthCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
                <span className='text-rose-500 dark:text-rose-400'>
                  +{monthCanceledOrdersAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className='text-emerald-500 dark:text-emerald-400'>
                  {monthCanceledOrdersAmount.diffFromLastMonth}%
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
