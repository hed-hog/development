import { useApp } from '@/hooks/use-app'

export function requests() {
  const { request } = useApp()

  const createRole = async (data: any) => {
    return request({
      url: '/permissions',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteRoles = async <T>(roleIds: T[]) => {
    return request({
      url: '/permissions',
      data: { ids: roleIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editRole = async (params: { id: string; data: any }) => {
    const { id, data } = params
    return request({
      url: `/permissions/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return { createRole, deleteRoles, editRole }
}
