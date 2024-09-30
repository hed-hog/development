import { useApp } from '@/hooks/use-app'
import { ScreenType } from '@/types/screen'

export function requests() {
  const { request } = useApp()

  const createScreen = async (data: ScreenType) => {
    return request({
      url: '/screens',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteScreens = async <T>(screenIds: T[]) => {
    return request({
      url: '/screens',
      data: { ids: screenIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editScreen = async (params: { id: string; data: ScreenType }) => {
    const { id, data } = params
    return request({
      url: `/screens/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const getScreenRoles = async ({ screenId }: { screenId: string }) => {
    return request({
      url: `/screens/${screenId}/roles`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editScreenRoles = async ({
    screenId,
    roleIds,
  }: {
    screenId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/screens/${screenId}/roles`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const getScreenRoutes = async ({ screenId }: { screenId: string }) => {
    return request({
      url: `/screens/${screenId}/routes`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editScreenRoutes = async ({
    screenId,
    routeIds,
  }: {
    screenId: string
    routeIds: number[]
  }) => {
    return request({
      url: `/screens/${screenId}/routes`,
      data: { ids: routeIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return {
    createScreen,
    deleteScreens,
    editScreen,
    getScreenRoles,
    editScreenRoles,
    getScreenRoutes,
    editScreenRoutes,
  }
}
