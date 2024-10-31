import { useApp } from '@/hooks/use-app'
import { Role } from '@/types/models'
import { formatDataWithLocale } from '@hedhog/utils'

export function requests() {
  const { request } = useApp()

  const createRole = async (data: Role) => {
    return request({
      url: '/role',
      data: formatDataWithLocale(data),
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteRole = async <T>(roleIds: T[]) => {
    return request({
      url: '/role',
      data: { ids: roleIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const showRole = async (id: number) => {
    return request<Role>({
      url: `/role/${id}`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editRole = async (params: { id: string; data: Role }) => {
    const { id, data } = params

    return request({
      url: `/role/${id}`,
      method: 'patch',
      data: formatDataWithLocale(data),
    }).then((res) => res.data)
  }

  const getRole = async () => {
    return request({
      url: '/role',
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleUser = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/role/${roleId}/user`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleRoute = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/role/${roleId}/route`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleScreen = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/role/${roleId}/screen`,
      method: 'get',
    }).then((res) => res.data)
  }

  const getRoleMenus = async ({ roleId }: { roleId: string }) => {
    return request({
      url: `/role/${roleId}/menu`,
      method: 'get',
    }).then((res) => res.data)
  }

  const editRoleRoute = async ({
    roleId,
    routeIds,
  }: {
    roleId: string
    routeIds: number[]
  }) => {
    return request({
      url: `/role/${roleId}/route`,
      data: { ids: routeIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const editRoleUser = async ({
    roleId,
    userIds,
  }: {
    roleId: string
    userIds: number[]
  }) => {
    return request({
      url: `/role/${roleId}/user`,
      data: { ids: userIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const editRoleScreen = async ({
    roleId,
    screenIds,
  }: {
    roleId: string
    screenIds: number[]
  }) => {
    return request({
      url: `/role/${roleId}/screen`,
      data: { ids: screenIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  const editRoleMenu = async ({
    roleId,
    menuIds,
  }: {
    roleId: string
    menuIds: number[]
  }) => {
    return request({
      url: `/role/${roleId}/menu`,
      data: { ids: menuIds },
      method: 'patch',
    }).then((res) => res.data)
  }

  return {
    createRole,
    deleteRole,
    editRole,
    getRole,
    editRoleMenu,
    editRoleRoute,
    editRoleScreen,
    editRoleUser,
    getRoleMenus,
    getRoleRoute,
    getRoleScreen,
    getRoleUser,
    showRole,
  }
}
