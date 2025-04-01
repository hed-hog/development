import { useApp } from '@/hooks/use-app'
import { PaginationResult } from '@/types'

export function requests() {
  const { request } = useApp()

  const appearanceUpdate = async (
    params: {
      slug: string
      value: string
    }[]
  ) => {
    return request({
      url: `/appearance`,
      method: 'put',
      data: { setting: params },
    }).then((res) => res.data)
  }

  const appearanceList = async () => {
    return request<PaginationResult<any>>({
      url: '/appearance',
    }).then((res) => res.data)
  }

  return {
    appearanceUpdate,
    appearanceList,
  }
}
