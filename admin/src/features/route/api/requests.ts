import { useApp } from '@/hooks/use-app'
import { RouteType } from '@/types/route'

export function requests() {
  const { request } = useApp()

  const createRoute = async (data: RouteType) => {
    return request({
      url: '/route',
      method: 'post',
      data,
    }).then((res) => res.data)
  }

  const editRoute = async (params: { id: string; data: RouteType }) => {
    const { id, data } = params

    if (data.id) delete (data as any).id

    return request({
      url: `/route/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const deleteRoute = async <T>(screenIds: T[]) => {
    return request({
      url: '/route',
      method: 'delete',
      data: { ids: screenIds },
    }).then((res) => res.data)
  }

  const getRoutecreens = async ({ routeId }: { routeId: string }) => {
    return request({
      url: `/route/${routeId}/screen`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editRoutecreens = async ({
    routeId,
    screenIds,
  }: {
    routeId: string
    screenIds: number[]
  }) => {
    return request({
      url: `/route/${routeId}/screen`,
      data: { ids: screenIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const getRouteRole = async ({ routeId }: { routeId: string }) => {
    return request({
      url: `/route/${routeId}/role`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editRouteRole = async ({
    routeId,
    roleIds,
  }: {
    routeId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/route/${routeId}/role`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return {
    createRoute,
    editRoute,
    deleteRoute,
    getRoutecreens,
    getRouteRole,
    editRouteRole,
    editRoutecreens,
  }
}
