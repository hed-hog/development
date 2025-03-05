import { useDefaultMutation } from '@/hooks/use-default-mutation'
import { useQuery } from '@tanstack/react-query'
import { requests } from './requests'

const scope = 'faq'

export function useFaqCreate() {
  const { faqCreate } = requests()
  return useDefaultMutation(scope, 'create', faqCreate)
}

export function useFaqDelete() {
  const { faqDelete } = requests()
  return useDefaultMutation(scope, 'delete', faqDelete)
}

export function useFaqUpdate() {
  const { faqUpdate } = requests()
  return useDefaultMutation(scope, 'update', faqUpdate)
}

export function useFaqGet(id: number) {
  const { faqGet } = requests()
  return useQuery({
    queryKey: [scope, 'get'],
    queryFn: () => faqGet(id),
  })
}
