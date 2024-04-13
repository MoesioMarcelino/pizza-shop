import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from '@/pages/app/dashboard'

import { SignIn } from './pages/auth/signIn'

export const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/sign-in', element: <SignIn /> },
])
