import { useApp } from '@/hooks/use-app'

export function requests() {
  const { request } = useApp()

  const createMenu = async (data: any) => {
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

  const editMenu = async (params: { id: string; data: any }) => {
    const { id, data } = params
    return request({
      url: `/menus/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return { createMenu, deleteMenus, editMenu }
}
