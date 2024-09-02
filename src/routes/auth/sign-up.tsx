import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpInputs = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpInputs>()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpInputs) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <>
      <Helmet title='Cadastro' />
      <div className='p-8'>
        <Button variant={'ghost'} asChild className='absolute right-8 top-8'>
          <Link to={'/sign-in'} className=''>
            Já possuo conta
          </Link>
        </Button>
        <div className='w-[350px] space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Criar conta gratuita
            </h1>
            <p className='text-sm text-muted-foreground'>
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit(handleSignUp)}>
            <div className='space-y-2'>
              <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
              <Input
                id='restaurantName'
                type='text'
                {...register('restaurantName')}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='managerName'>Seu nome</Label>
              <Input
                id='managerName'
                type='text'
                {...register('managerName')}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input id='email' type='email' {...register('email')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Seu celular</Label>
              <Input id='phone' type='tel' {...register('phone')} />
            </div>
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              Finalizar cadastro
            </Button>
            <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
              Ao continuar, você concorda com nossos{' '}
              <a className='underline underline-offset-4' href=''>
                termos de serviço
              </a>{' '}
              e{' '}
              <a className='underline underline-offset-4' href=''>
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
