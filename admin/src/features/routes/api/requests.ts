import { useApp } from '@/hooks/use-app'
import { RouteType } from '@/types/route'

export function requests() {
  const { request } = useApp()

  const createRoute = async (data: RouteType) => {
    return request({
      url: '/routes',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const editRoute = async (params: { id: string; data: RouteType }) => {
    const { id, data } = params

    if (data.id) delete (data as any).id

    return request({
      url: `/routes/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const deleteRoutes = async <T>(screenIds: T[]) => {
    return request({
      url: '/routes',
      method: 'delete',
      data: { ids: screenIds },
    }).then((res) => res.data)
  }

  const getRouteScreens = async ({ routeId }: { routeId: string }) => {
    return request({
      url: `/routes/${routeId}/screens`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editRouteScreens = async ({
    routeId,
    screenIds,
  }: {
    routeId: string
    screenIds: number[]
  }) => {
    return request({
      url: `/routes/${routeId}/screens`,
      data: { ids: screenIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const getRouteRoles = async ({ routeId }: { routeId: string }) => {
    return request({
      url: `/routes/${routeId}/roles`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editRouteRoles = async ({
    routeId,
    roleIds,
  }: {
    routeId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/routes/${routeId}/roles`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return {
    createRoute,
    editRoute,
    deleteRoutes,
    getRouteScreens,
    getRouteRoles,
    editRouteRoles,
    editRouteScreens,
  }
}
