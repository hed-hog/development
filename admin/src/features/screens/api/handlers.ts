import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateScreen() {
  const { createScreen } = requests()

  return useMutation({
    mutationKey: ['post-screen'],
    mutationFn: createScreen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success('Screen created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating screen: ' + error.message)
    },
  })
}

export function useDeleteScreen<T>() {
  const { deleteScreens } = requests()

  return useMutation({
    mutationKey: ['delete-screen'],
    mutationFn: deleteScreens<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success('Screens deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting screens: ' + error.message)
    },
  })
}

export function useEditScreen() {
  const { editScreen } = requests()

  return useMutation({
    mutationKey: ['edit-screen'],
    mutationFn: editScreen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success('Screen edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating screen: ' + error.message)
    },
  })
}

export function useEditScreenRoles() {
  const { editScreenRoles } = requests()

  return useMutation({
    mutationKey: ['edit-screen-roles'],
    mutationFn: editScreenRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success('Screen edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating screen: ' + error.message)
    },
  })
}

export function useEditScreenRoutes() {
  const { editScreenRoutes } = requests()

  return useMutation({
    mutationKey: ['edit-screen-routes'],
    mutationFn: editScreenRoutes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success('Screen edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating screen: ' + error.message)
    },
  })
}
