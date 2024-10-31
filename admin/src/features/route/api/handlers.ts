import { queryClient } from '@/lib/query-provider'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useCreateRoute() {
  const { createRoute } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-route'],
    mutationFn: createRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['route'] })
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
      queryClient.invalidateQueries({ queryKey: ['route'] })
      toast.success(`${moduleT('route')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('route')}` + error.message)
    },
  })
}

export function useDeleteRoute<T>() {
  const { deleteRoute } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-route'],
    mutationFn: deleteRoute<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['route'] })
      toast.success(`${moduleT('route')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('route')}` + error.message)
    },
  })
}

export function useEditRouteScreens() {
  const { editRoutecreens } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-route-screens'],
    mutationFn: editRoutecreens,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['route'] })
      toast.success(`${moduleT('routecreen')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('routecreen')}` + error.message)
    },
  })
}

export function useEditRouteRole() {
  const { editRouteRole } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-route-role'],
    mutationFn: editRouteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['route'] })
      toast.success(`${moduleT('routeRole')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('routeRole')}` + error.message)
    },
  })
}
