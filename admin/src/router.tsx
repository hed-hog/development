import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error.tsx'
import MaintenanceError from './pages/errors/maintenance-error.tsx'
import NotFoundError from './pages/errors/not-found-error.tsx'
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
      Component: (await import('./components/custom/color-theme.tsx')).default,
    }),
  },

  // Main route
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
            path: 'user',
            lazy: async () => ({
              Component: (await import('./pages/management/user/index.tsx'))
                .default,
            }),
          },
          {
            path: 'role',
            lazy: async () => ({
              Component: (await import('./pages/management/role/index.tsx'))
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
            path: 'menu',
            lazy: async () => ({
              Component: (await import('./pages/management/menu/index.tsx'))
                .default,
            }),
          },
          {
            path: 'person',
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
                      './pages/management/person/address-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'contact-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/contact-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'custom-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/custom-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'document-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/document-types/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'person-types',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/person-types/index.tsx'
                    )
                  ).default,
                }),
              },
            ],
          },
          {
            path: 'route',
            lazy: async () => ({
              Component: (await import('./pages/management/route/index.tsx'))
                .default,
            }),
          },
          {
            path: 'setting',
            lazy: async () => ({
              Component: (await import('./pages/management/setting/index.tsx'))
                .default,
            }),
            children: [
              {
                index: true,
                path: ':slug',
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/setting/forms.tsx')
                  ).default,
                }),
              },
            ],
          },
          {
            path: 'setting-options',
            lazy: async () => ({
              Component: (
                await import('./pages/management/setting-options/index.tsx')
              ).default,
            }),
            errorElement: <GeneralError />,
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/setting-options/profile/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'account',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/setting-options/account/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'appearance',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/setting-options/appearance/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'notifications',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/setting-options/notifications/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'display',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/setting-options/display/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'error-example',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/setting-options/error-example/index.tsx'
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

  // Error route
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
