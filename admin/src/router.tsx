import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error.tsx'
import NotFoundError from './pages/errors/not-found-error.tsx'
import MaintenanceError from './pages/errors/maintenance-error.tsx'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
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
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp.tsx')).default,
    }),
  },
  {
    path: '/tests',
    lazy: async () => ({
      Component: (await import('./pages/tests/index.tsx')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell.tsx')
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
      {
        path: 'contacts',
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/contacts/index.tsx')).default,
            }),
          },
        ],
      },

      {
        path: 'management',
        children: [
          {
            path: '',
            lazy: async () => ({
              Component: (await import('./pages/management/index.tsx')).default,
            }),
          },
          {
            path: 'users',
            lazy: async () => ({
              Component: (await import('./pages/management/users/index.tsx'))
                .default,
            }),
          },
          {
            path: 'roles',
            lazy: async () => ({
              Component: (await import('./pages/management/roles/index.tsx'))
                .default,
            }),
          },
          {
            path: 'screens',
            lazy: async () => ({
              Component: (await import('./pages/management/screens/index.tsx'))
                .default,
            }),
          },
          {
            path: 'menus',
            lazy: async () => ({
              Component: (await import('./pages/management/menus/index.tsx'))
                .default,
            }),
          },
          {
            path: 'persons',
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import('./pages/contacts/index.tsx'))
                    .default,
                }),
              },
              {
                path: 'address-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/persons/address-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'contact-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/persons/contact-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'custom-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/persons/custom-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'document-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/persons/document-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'person-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/persons/person-types/index.tsx'
                    )
                  ).default,
                }),
              },
            ],
          },
          {
            path: 'routes',
            lazy: async () => ({
              Component: (await import('./pages/management/routes/index.tsx'))
                .default,
            }),
          },
          {
            path: 'settings',
            lazy: async () => ({
              Component: (await import('./pages/management/settings/index.tsx'))
                .default,
            }),
          },
          {
            path: 'settings-options',
            lazy: async () => ({
              Component: (
                await import('./pages/management/settings-options/index.tsx')
              ).default,
            }),
            errorElement: <GeneralError />,
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/settings-options/profile/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'account',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/settings-options/account/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'appearance',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/settings-options/appearance/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'notifications',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/settings-options/notifications/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'display',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/settings-options/display/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'error-example',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/settings-options/error-example/index.tsx'
                    )
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
