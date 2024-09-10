import { useApp } from '@/hooks/use-app'

export function requests() {
  const { request } = useApp()

  const createUser = async (data: any) => {
    return request({
      url: '/users',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteUsers = async <T>(userIds: T[]) => {
    return request({
      url: '/users',
      data: { ids: userIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editUser = async (params: { id: string; data: any }) => {
    const { id, data } = params
    return request({
      url: `/users/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return { createUser, deleteUsers, editUser }
}
