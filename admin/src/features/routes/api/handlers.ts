import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateRoute() {
  const { createRoute } = requests()

  return useMutation({
    mutationKey: ['post-route'],
    mutationFn: createRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success('Route created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating route: ' + error.message)
    },
  })
}

export function useEditRoute() {
  const { editRoute } = requests()

  return useMutation({
    mutationKey: ['edit-route'],
    mutationFn: editRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success('Route edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating route: ' + error.message)
    },
  })
}

export function useDeleteRoute<T>() {
  const { deleteRoutes } = requests()

  return useMutation({
    mutationKey: ['delete-route'],
    mutationFn: deleteRoutes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success('Routes deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting Routes: ' + error.message)
    },
  })
}

export function useEditRouteScreens() {
  const { editRouteScreens } = requests()

  return useMutation({
    mutationKey: ['edit-route-screens'],
    mutationFn: editRouteScreens,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success('Route screens edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating route screens: ' + error.message)
    },
  })
}

export function useEditRouteRoles() {
  const { editRouteRoles } = requests()

  return useMutation({
    mutationKey: ['edit-route-roles'],
    mutationFn: editRouteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] })
      toast.success('Route roles edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating route roles: ' + error.message)
    },
  })
}
