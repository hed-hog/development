import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'

export function useDocumentTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['document-types'],
    queryFn: () =>
      request({
        url: `/document-types`,
      }),
  })
}

export function useCreateDocumentType() {
  const { createDocumentType } = requests()

  return useMutation({
    mutationKey: ['post-document-type'],
    mutationFn: createDocumentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] })
      toast.success('Document Type created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating Document Type: ' + error.message)
    },
  })
}

export function useDeleteDocumentType<T>() {
  const { deleteDocumentTypes } = requests()

  return useMutation({
    mutationKey: ['delete-document-type'],
    mutationFn: deleteDocumentTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] })
      toast.success('Document Types deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting Document Types: ' + error.message)
    },
  })
}

export function useEditDocumentType() {
  const { editDocumentType } = requests()

  return useMutation({
    mutationKey: ['edit-document-type'],
    mutationFn: editDocumentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] })
      toast.success('Document Type edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating Document Type: ' + error.message)
    },
  })
}
