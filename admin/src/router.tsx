import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error.tsx'
import MaintenanceError from './pages/errors/maintenance-error.tsx'
import NotFoundError from './pages/errors/not-found-error.tsx'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import routesJSON from './routes.json'

type Route = {
  path: string
  children?: Route[]
  component?: string
}

type RoutesJSON = {
  routes: Route[]
}

function getRoute(route: any): any {
  if (route.children && Array.isArray(route.children)) {
    return {
      path: route.path,
      children: route.children.map(getRoute),
    }
  } else {
    return {
      path: route.path,
      lazy: async () => ({
        Component: (await import(`./pages/contact/person/index.tsx`)).default,
      }),
    }
  }
}

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
            path: 'screen',
            lazy: async () => ({
              Component: (await import('./pages/management/screen/index.tsx'))
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
                  Component: (await import('./pages/contact/index.tsx'))
                    .default,
                }),
              },
              {
                path: 'address-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/address-type/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'contact-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/contact-type/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'custom-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/custom-type/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'document-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/document-type/index.tsx'
                    )
                  ).default,
                }),
              },
              {
                path: 'person-type',
                lazy: async () => ({
                  Component: (
                    await import(
                      './pages/management/person/person-type/index.tsx'
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
        ],
      },
      ...((routesJSON as RoutesJSON).routes ?? []).map(getRoute),
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

const router = createBrowserRouter(routes)

export default router
