import { useApp } from '@/hooks/use-app'
import { UserType } from '@/types/user'

export function requests() {
  const { request } = useApp()

  const createUser = async (data: UserType) => {
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

  const editUser = async (params: { id: string; data: UserType }) => {
    const { id, data } = params
    return request({
      url: `/users/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const getUserRoles = async ({ userId }: { userId: string }) => {
    return request({
      url: `/users/${userId}/roles`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editUserRoles = async ({
    userId,
    roleIds,
  }: {
    userId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/users/${userId}/roles`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return { createUser, deleteUsers, editUser, getUserRoles, editUserRoles }
}
