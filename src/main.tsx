import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from './routes/auth/sign-in'
import { App } from './routes/_layouts/app'
import { Dashboard } from './routes/app/dashboard/dashboard'
import { Auth } from './routes/_layouts/auth'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from './components/ui/sonner'
import { SignUp } from './routes/auth/sign-up'
import { ThemeProvider } from './components/theme/theme-provider'
import { Orders } from './routes/app/orders/orders'
import { NotFound } from './routes/not-found'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Error } from './routes/error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },
  {
    path: '/',
    element: <Auth />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider storageKey='pizza-shop-theme' defaultTheme='dark'>
      <HelmetProvider>
        <Helmet titleTemplate='%s | pizza.shop' />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster richColors />
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
)
