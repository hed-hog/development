import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { PersonUser } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const personUserList = async (
    personId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<PersonUser>>({
      url: `/person/${personId}/person-user`,
      params,
    }).then((res) => res.data)
  }

  const personUserCreate = async (params: {
    personId: number
    data: PersonUser
  }) => {
    const { personId, data } = params

    return request<PersonUser>({
      url: `/person/${personId}/person-user`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const personUserUpdate = async (params: {
    personId: number
    id: number
    data: PersonUser
  }) => {
    const { personId, id, data } = params

    return request<PersonUser>({
      url: `/person/${personId}/person-user/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const personUserDelete = async (params: { id: number; ids: number[] }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/person/${id}/person-user`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const personUserGet = async (params: { personId: number; id: number }) => {
    const { personId, id } = params

    return request<PersonUser>({
      url: `/person/${personId}/person-user/${id}`,
    }).then((res) => res.data)
  }

  return {
    personUserCreate,
    personUserUpdate,
    personUserDelete,
    personUserList,
    personUserGet,
  }
}
