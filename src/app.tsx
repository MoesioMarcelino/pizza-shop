import 'dayjs/locale/pt-br'
import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { queryClient } from '@/lib/react-query'
import { router } from '@/routes'

dayjs.extend(relativeTime)
dayjs.extend(isLeapYear)
dayjs.locale('pt-br')

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza.Shop" />
      <ThemeProvider defaultTheme="dark" storageKey="pizza-shop-theme">
        <Toaster richColors position="top-right" closeButton />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
