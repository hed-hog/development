import { useApp } from '@/hooks/use-app'
import { User } from '@/types/models'

export function requests() {
  const { request } = useApp()

  const createUser = async (data: User) => {
    return request({
      url: '/user',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteUser = async <T>(userIds: T[]) => {
    return request({
      url: '/user',
      data: { ids: userIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editUser = async (params: { id: string; data: User }) => {
    const { id, data } = params
    return request({
      url: `/user/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const getUserRole = async ({ userId }: { userId: string }) => {
    return request({
      url: `/user/${userId}/role`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editUserRole = async ({
    userId,
    roleIds,
  }: {
    userId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/user/${userId}/role`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return { createUser, deleteUser, editUser, getUserRole, editUserRole }
}
