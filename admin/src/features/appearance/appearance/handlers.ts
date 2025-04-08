import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

const scope = 'appearance'

export function useUpdateAppearance() {
  const { appearanceUpdate } = requests()

  return useMutation({
    mutationKey: ['edit-appearance'],
    mutationFn: appearanceUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting'] })
      toast.success(`Apperance settings edited successfully!`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}

export function useListAppearance() {
  const { appearanceList } = requests()
  return useQuery({
    queryKey: [scope, 'list'],
    queryFn: () => appearanceList(),
  })
}
