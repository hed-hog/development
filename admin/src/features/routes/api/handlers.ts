import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateRoute() {
  const { createRoute } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-route'],
    mutationFn: createRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success(`${moduleT('route')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('route')}` + error.message)
    },
  })
}

export function useEditRoute() {
  const { editRoute } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-route'],
    mutationFn: editRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success(`${moduleT('route')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('route')}` + error.message)
    },
  })
}

export function useDeleteRoute<T>() {
  const { deleteRoutes } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-route'],
    mutationFn: deleteRoutes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success(`${moduleT('route')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('route')}` + error.message)
    },
  })
}

export function useEditRouteScreens() {
  const { editRouteScreens } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-route-screens'],
    mutationFn: editRouteScreens,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success(`${moduleT('routeScreen')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('routeScreen')}` + error.message)
    },
  })
}

export function useEditRouteRoles() {
  const { editRouteRoles } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-route-roles'],
    mutationFn: editRouteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success(`${moduleT('routeRole')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('routeRole')}` + error.message)
    },
  })
}
