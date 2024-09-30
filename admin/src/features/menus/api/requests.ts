import { useApp } from '@/hooks/use-app'
import { MenuType } from '@/types/menu'

export function requests() {
  const { request } = useApp()

  const createMenu = async (data: MenuType) => {
    return request({
      url: '/menus',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteMenus = async <T>(menuIds: T[]) => {
    return request({
      url: '/menus',
      data: { ids: menuIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editMenu = async (params: { id: string; data: MenuType }) => {
    const { id, data } = params
    return request({
      url: `/menus/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const getMenuRoles = async ({ menuId }: { menuId: string }) => {
    return request({
      url: `/menus/${menuId}/roles`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getMenuScreens = async ({ menuId }: { menuId: string }) => {
    return request({
      url: `/menus/${menuId}/screens`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editMenuRoles = async ({
    menuId,
    roleIds,
  }: {
    menuId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/menus/${menuId}/roles`,
      method: 'patch',
      data: { ids: roleIds },
    }).then((res) => res.data)
  }

  const editMenuScreens = async ({
    menuId,
    screenIds,
  }: {
    menuId: string
    screenIds: number[]
  }) => {
    return request({
      url: `/menus/${menuId}/screens`,
      method: 'patch',
      data: { ids: screenIds },
    }).then((res) => res.data)
  }

  return {
    createMenu,
    deleteMenus,
    editMenu,
    getMenuRoles,
    getMenuScreens,
    editMenuRoles,
    editMenuScreens,
  }
}
