import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersInputs = z.infer<typeof orderFiltersSchema>

export function OrderFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const {
    register,
    handleSubmit,
    // formState: { isSubmitting },
    control,
    reset,
  } = useForm<OrderFiltersInputs>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter({ orderId, customerName, status }: OrderFiltersInputs) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }
      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }
      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')
      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')

      return state
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form
      className='flex items-center gap-2'
      onSubmit={handleSubmit(handleFilter)}>
      <span className='text-sm font-semibold'>Filtros:</span>
      <Input
        placeholder='ID do pedido'
        className='h-8 w-auto'
        {...register('orderId')}
      />
      <Input
        placeholder='Nome do cliente'
        className='h-8 w-[320px]'
        {...register('customerName')}
      />
      <Controller
        name='status'
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue='all'
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}>
              <SelectTrigger className='h-8 w-[180px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Sem filtro</SelectItem>
                <SelectItem value='pending'>Pendente</SelectItem>
                <SelectItem value='canceled'>Cancelado</SelectItem>
                <SelectItem value='processing'>Em preparo</SelectItem>
                <SelectItem value='delivering'>A caminho</SelectItem>
                <SelectItem value='delivered'>Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />
      <Button type='submit' variant={'secondary'} size={'xs'}>
        <Search className='size-4 mr-2' /> Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        type='button'
        variant={'outline'}
        size={'xs'}>
        <X className='size-4 mr-2' /> Remover filtros
      </Button>
    </form>
  )
}
