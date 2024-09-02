import { getRestaurant, GetRestaurantResponse } from '@/api/get-restaurant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { updateProfile } from '@/api/update-profile'
import { toast } from 'sonner'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileInputs = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managedRestaurant'],
    queryFn: getRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileInputs>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateRestaurantCache({ name, description }: StoreProfileInputs) {
    const cached = queryClient.getQueryData<GetRestaurantResponse>([
      'managedRestaurant',
    ])
    if (cached) {
      queryClient.setQueryData<GetRestaurantResponse>(['managedRestaurant'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateRestaurantCache({ name, description })
      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateRestaurantCache(context.previousProfile)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileInputs) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil. Por favor, tente novamente.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>Informações do estabelecimento</DialogDescription>
      </DialogHeader>

      <form
        action=''
        className='space-y-4 py-4'
        onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label className='text-right' htmlFor='name'>
            Nome
          </Label>
          <Input className='col-span-3' id='name' {...register('name')} />
          <Label className='text-right' htmlFor='description'>
            Descrição
          </Label>
          <Textarea
            className='col-span-3'
            id='name'
            {...register('description')}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} type='button'>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant={'success'} type='submit' disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
