import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateSetting() {
  const { createSetting } = requests()

  return useMutation({
    mutationKey: ['post-setting'],
    mutationFn: createSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success('setting created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating setting: ' + error.message)
    },
  })
}

export function useDeleteSettings<T>() {
  const { deleteSettings } = requests()

  return useMutation({
    mutationKey: ['delete-setting'],
    mutationFn: deleteSettings<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success('Settings deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting settings: ' + error.message)
    },
  })
}

export function useEditSetting() {
  const { editSetting } = requests()

  return useMutation({
    mutationKey: ['edit-setting'],
    mutationFn: editSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success('Setting edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating setting: ' + error.message)
    },
  })
}
