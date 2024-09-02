export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'A caminho',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className='flex items-center gap-2'>
      {status === 'pending' && (
        <span className='size-2 rounded-full dark:bg-slate-400 bg-slate-500' />
      )}
      {status === 'canceled' && (
        <span className='size-2 rounded-full dark:bg-rose-400 bg-rose-500' />
      )}
      {status === 'delivered' && (
        <span className='size-2 rounded-full dark:bg-emerald-400 bg-emerald-500' />
      )}
      {['delivering', 'processing'].includes(status) && (
        <span className='size-2 rounded-full dark:bg-amber-400 bg-amber-500' />
      )}
      <span className='font-medium text-muted-foreground'>
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
