import { Helmet } from 'react-helmet-async'
import { MonthRevenueCard } from './month-revenue-card'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './month-canceled-orders-amount'
import { RevenueChart } from './revenue-chart'
import { PopularProductsChart } from './popular-products-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title='Dashboard' />
      <div className='space-y-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <section className='grid grid-cols-4 gap-4'>
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </section>

        <section className='grid grid-cols-9 gap-4'>
          <RevenueChart />
          <PopularProductsChart />
        </section>
      </div>
    </>
  )
}
