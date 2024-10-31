import { useApp } from '@/hooks/use-app'
import { Menu } from '@/types/models'

export function requests() {
  const { request } = useApp()

  const createMenu = async (data: Menu) => {
    return request({
      url: '/menu',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteMenu = async <T>(menuIds: T[]) => {
    return request({
      url: '/menu',
      data: { ids: menuIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editMenu = async (params: { id: string; data: Menu }) => {
    const { id, data } = params
    return request({
      url: `/menu/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const getMenuRole = async ({ menuId }: { menuId: string }) => {
    return request({
      url: `/menu/${menuId}/role`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getMenuScreen = async ({ menuId }: { menuId: string }) => {
    return request({
      url: `/menu/${menuId}/screen`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editMenuRole = async ({
    menuId,
    roleIds,
  }: {
    menuId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/menu/${menuId}/role`,
      method: 'patch',
      data: { ids: roleIds },
    }).then((res) => res.data)
  }

  const editMenuScreen = async ({
    menuId,
    screenIds,
  }: {
    menuId: string
    screenIds: number[]
  }) => {
    return request({
      url: `/menu/${menuId}/screen`,
      method: 'patch',
      data: { ids: screenIds },
    }).then((res) => res.data)
  }

  return {
    createMenu,
    deleteMenu,
    editMenu,
    getMenuRole,
    getMenuScreen,
    editMenuRole,
    editMenuScreen,
  }
}
