import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/login')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },
  {
    path: '/examples',
    lazy: async () => ({
      Component: (await import('./pages/test')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'management',
        children: [
          {
            path: 'users',
            lazy: async () => ({
              Component: (await import('./pages/management/users')).default,
            }),
          },
          {
            path: 'roles',
            lazy: async () => ({
              Component: (await import('./pages/management/roles')).default,
            }),
          },
          {
            path: 'screens',
            lazy: async () => ({
              Component: (await import('./pages/management/screens')).default,
            }),
          },
          {
            path: 'settings',
            lazy: async () => ({
              Component: (await import('./pages/management/settings')).default,
            }),
            errorElement: <GeneralError />,
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/settings/profile')
                  ).default,
                }),
              },
              {
                path: 'account',
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/settings/account')
                  ).default,
                }),
              },
              {
                path: 'appearance',
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/settings/appearance')
                  ).default,
                }),
              },
              {
                path: 'notifications',
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/settings/notifications')
                  ).default,
                }),
              },
              {
                path: 'display',
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/settings/display')
                  ).default,
                }),
              },
              {
                path: 'error-example',
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/settings/error-example')
                  ).default,
                }),
                errorElement: <GeneralError className='h-[50svh]' minimal />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
