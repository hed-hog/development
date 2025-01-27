import { createBrowserRouter, RouteObject } from 'react-router-dom'
import GeneralError from './pages/errors/general-error.tsx'
import MaintenanceError from './pages/errors/maintenance-error.tsx'
import NotFoundError from './pages/errors/not-found-error.tsx'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const routes = [
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/login.tsx')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password.tsx')).default,
    }),
  },
  {
    path: '/email-sent',
    lazy: async () => ({
      Component: (await import('./pages/auth/email-sent.tsx')).default,
    }),
  },
  {
    path: '/password-recovery/:code',
    lazy: async () => ({
      Component: (await import('./pages/auth/password-recovery.tsx')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp.tsx')).default,
    }),
  },
  {
    path: '/tests',
    lazy: async () => ({
      Component: (await import('./components/custom/color-theme.tsx')).default,
    }),
  },

  // Main route
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app/app-shell.tsx')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard/index.tsx')).default,
        }),
      },
      
    ],
  },

  // Error route
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]

const router = createBrowserRouter(routes as RouteObject[])

export default router
