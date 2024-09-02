import { BarChart, Loader2 } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getPopularProducts } from '@/api/get-popular-products'
import colors from 'tailwindcss/colors'

export const description = 'A donut chart'

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryFn: getPopularProducts,
    queryKey: ['metrics', 'popular-products'],
  })

  return (
    <Card className='col-span-3 flex flex-col space-y-8'>
      <CardHeader className='flex-row justify-between items-center pb-0'>
        <CardTitle className='text-base font-medium'>
          Produtos populares
        </CardTitle>
        <BarChart className='size-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        {popularProducts ? (
          <ResponsiveContainer width={'100%'} height={240}>
            <PieChart style={{ fontSize: 12 }}>
              {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            /> */}
              <Pie
                data={popularProducts}
                dataKey='amount'
                nameKey='product'
                cx='50%'
                cy='50%'
                innerRadius={60}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className='fill-muted-foreground text-xs'
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline='central'>
                      {popularProducts[index].product.length > 12
                        ? popularProducts[index].product
                            .substring(0, 12)
                            .concat('...')
                        : popularProducts[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}>
                {popularProducts.map((_, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      className='stroke-background'
                    />
                  )
                })}
              </Pie>
            </PieChart>
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
