import { useApp } from '@/hooks/use-app'
import { ScreenType } from '@/types/screen'

export function requests() {
  const { request } = useApp()

  const createScreen = async (data: ScreenType) => {
    return request({
      url: '/screen',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteScreen = async <T>(screenIds: T[]) => {
    return request({
      url: '/screen',
      data: { ids: screenIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editScreen = async (params: { id: string; data: ScreenType }) => {
    const { id, data } = params
    return request({
      url: `/screen/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const getScreenRole = async ({ screenId }: { screenId: string }) => {
    return request({
      url: `/screen/${screenId}/role`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editScreenRole = async ({
    screenId,
    roleIds,
  }: {
    screenId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/screen/${screenId}/role`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const getScreenRoute = async ({ screenId }: { screenId: string }) => {
    return request({
      url: `/screen/${screenId}/route`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editScreenRoute = async ({
    screenId,
    routeIds,
  }: {
    screenId: string
    routeIds: number[]
  }) => {
    return request({
      url: `/screen/${screenId}/route`,
      data: { ids: routeIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return {
    createScreen,
    deleteScreen,
    editScreen,
    getScreenRole,
    editScreenRole,
    getScreenRoute,
    editScreenRoute,
  }
}
