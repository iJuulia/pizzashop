import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function Auth() {
  return (
    <div className='min-h-screen grid grid-cols-2'>
      <aside className='h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between'>
        <header className='flex items-center gap-3 text-lg text-foreground'>
          <Pizza className='size-5' />
          <span className='font-semibold'>pizza.shop</span>
        </header>
        <footer className='text-sm'>
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </aside>
      <main className='flex flex-col items-center justify-center relative'>
        <Outlet />
      </main>
    </div>
  )
}
