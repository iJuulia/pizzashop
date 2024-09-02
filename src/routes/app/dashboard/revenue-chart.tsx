import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getDailyRevenue } from '@/api/get-daily-revenue'
import { useQuery } from '@tanstack/react-query'
import colors from 'tailwindcss/colors'
import { Label } from '@/components/ui/label'
import { DateRange } from 'react-day-picker'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useState } from 'react'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenue } = useQuery({
    queryFn: () =>
      getDailyRevenue({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
  })

  return (
    <Card className='col-span-6 space-y-8'>
      <CardHeader className='flex-row items-start justify-between pb-0'>
        <div className='space-y-1'>
          <CardTitle className='text-base font-medium'>
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className='flex items-center gap-3'>
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenue ? (
          <ResponsiveContainer width={'100%'} height={240}>
            <LineChart data={dailyRevenue} style={{ fontSize: 12 }}>
              <CartesianGrid vertical={false} className='stroke-muted' />
              <XAxis dataKey='date' tickLine={false} axisLine={false} dy={16} />
              {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            /> */}
              <YAxis
                stroke='#888'
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  (value / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <Line
                dataKey='receipt'
                type='linear'
                strokeWidth={2}
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className='flex h-60 w-full items-center justify-center'>
            <Loader2 className='size-8 text-muted-foreground animate-spin' />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
