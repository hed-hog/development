import { useApp } from '@/hooks/use-app'

export function requests() {
  const { request } = useApp()

  const createRole = async (data: any) => {
    return request({
      url: '/roles',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteRoles = async <T>(roleIds: T[]) => {
    return request({
      url: '/roles',
      data: { ids: roleIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editRole = async (params: { id: string; data: any }) => {
    const { id, data } = params
    return request({
      url: `/roles/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const getRoles = async () => {
    return request({
      url: '/roles',
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleUsers = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/roles/${roleId}/users`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleRoutes = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/roles/${roleId}/routes`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleScreens = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/roles/${roleId}/screens`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleMenus = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/roles/${roleId}/menus`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editRoleRoutes = async ({
    roleId,
    roleIds,
  }: {
    roleId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/roles/${roleId}/routes`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const editRoleUsers = async ({
    roleId,
    roleIds,
  }: {
    roleId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/roles/${roleId}/users`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const editRoleScreens = async ({
    roleId,
    roleIds,
  }: {
    roleId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/roles/${roleId}/screens`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const editRoleMenus = async ({
    roleId,
    roleIds,
  }: {
    roleId: string
    roleIds: number[]
  }) => {
    return request({
      url: `/roles/${roleId}/menus`,
      data: { ids: roleIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return {
    createRole,
    deleteRoles,
    editRole,
    getRoles,
    editRoleMenus,
    editRoleRoutes,
    editRoleScreens,
    editRoleUsers,
    getRoleMenus,
    getRoleRoutes,
    getRoleScreens,
    getRoleUsers,
  }
}
