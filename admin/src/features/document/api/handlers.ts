import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateDocument() {
  const { createDocument } = requests()

  return useMutation({
    mutationKey: ['post-document'],
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries('document' as InvalidateQueryFilters)
      toast.success('Document created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating document: ' + error.message)
    },
  })
}

export function useDeleteDocument() {
  const { deleteDocument } = requests()

  return useMutation({
    mutationKey: ['delete-document'],
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries('document' as InvalidateQueryFilters)
      toast.success('Document deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting document: ' + error.message)
    },
  })
}

export function useEditDocument() {
  const { editDocument } = requests()

  return useMutation({
    mutationKey: ['edit-document'],
    mutationFn: editDocument,
    onSuccess: () => {
      queryClient.invalidateQueries('document' as InvalidateQueryFilters)
      toast.success('Document edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating document: ' + error.message)
    },
  })
}
