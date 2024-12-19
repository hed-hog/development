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
      {
        path: 'cbc',
        children: [
          {
            path: 'banking',
            lazy: async () => ({
              Component: (await import('./pages/cbc/banking/index.tsx'))
                .default,
            }),
          },
          {
            path: 'coin',
            lazy: async () => ({
              Component: (await import('./pages/cbc/coin/index.tsx')).default,
            }),
          },
          {
            path: 'operation',
            lazy: async () => ({
              Component: (await import('./pages/cbc/operation/index.tsx'))
                .default,
            }),
          },
          {
            path: 'quotation',
            lazy: async () => ({
              Component: (await import('./pages/cbc/quotation/index.tsx'))
                .default,
            }),
          },
          {
            path: 'quotation-type',
            lazy: async () => ({
              Component: (await import('./pages/cbc/quotation-type/index.tsx'))
                .default,
            }),
          },
          {
            path: 'stock-exchange',
            lazy: async () => ({
              Component: (await import('./pages/cbc/stock-exchange/index.tsx'))
                .default,
            }),
          },
          {
            path: 'strategy',
            lazy: async () => ({
              Component: (await import('./pages/cbc/strategy/index.tsx'))
                .default,
            }),
          },
          {
            path: 'trade-signal-type',
            lazy: async () => ({
              Component: (
                await import('./pages/cbc/trade-signal-type/index.tsx')
              ).default,
            }),
          },
          {
            path: 'trend-type',
            lazy: async () => ({
              Component: (await import('./pages/cbc/trend-type/index.tsx'))
                .default,
            }),
          },
        ],
      },
      {
        path: 'contact',
        children: [
          {
            path: 'person',
            lazy: async () => ({
              Component: (await import('./pages/contact/person/index.tsx'))
                .default,
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
                path: 'person-address-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/contact/person-address-type/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'person-contact-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/contact/person-contact-type/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'person-custom-type',
                lazy: async () => ({
                  Component: (
                    await import('./pages/contact/person-custom-type/index.tsx')
                  ).default,
                }),
              },
              {
                path: 'person-document-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/contact/person-document-type/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'person-type',
                lazy: async () => ({
                  Component: (
                    await import('./pages/contact/person-type/index.tsx')
                  ).default,
                }),
              },
            ],
          },
          {
            path: 'role',
            lazy: async () => ({
              Component: (await import('./pages/management/role/index.tsx'))
                .default,
            }),
          },
          {
            path: 'route',
            lazy: async () => ({
              Component: (await import('./pages/management/route/index.tsx'))
                .default,
            }),
          },
          {
            path: 'screen',
            lazy: async () => ({
              Component: (await import('./pages/management/screen/index.tsx'))
                .default,
            }),
          },
          {
            path: 'setting',
            children: [
              {
                path: '',
                lazy: async () => ({
                  Component: (
                    await import('./pages/management/setting/index.tsx')
                  ).default,
                }),
              },
              {
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
            path: 'user',
            lazy: async () => ({
              Component: (await import('./pages/management/user/index.tsx'))
                .default,
            }),
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
]

const router = createBrowserRouter(routes as RouteObject[])

export default router
