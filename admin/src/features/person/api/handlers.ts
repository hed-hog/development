import { queryClient } from '@/lib/query-provider'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useCreatePerson() {
  const { createPerson } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-person'],
    mutationFn: createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person'] })
      toast.success(`${moduleT('person')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('person')}` + error.message)
    },
  })
}

export function useDeletePerson<T>() {
  const { deletePerson } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-person'],
    mutationFn: deletePerson<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person'] })
      toast.success(`${moduleT('person')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('person')}` + error.message)
    },
  })
}

export function useEditPerson() {
  const { editPerson } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-person'],
    mutationFn: editPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person'] })
      toast.success(`${moduleT('person')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('person')}` + error.message)
    },
  })
}
