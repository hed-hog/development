import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateMenu() {
  const { createMenu } = requests()

  return useMutation({
    mutationKey: ['post-menu'],
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] })
      toast.success('Menu created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating menu: ' + error.message)
    },
  })
}

export function useDeleteMenu<T>() {
  const { deleteMenus } = requests()

  return useMutation({
    mutationKey: ['delete-menu'],
    mutationFn: deleteMenus<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] })
      toast.success('Menus deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting menus: ' + error.message)
    },
  })
}

export function useEditMenu() {
  const { editMenu } = requests()

  return useMutation({
    mutationKey: ['edit-menu'],
    mutationFn: editMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] })
      toast.success('Menu edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating menu: ' + error.message)
    },
  })
}