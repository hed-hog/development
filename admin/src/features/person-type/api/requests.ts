import { useApp } from '@/hooks/use-app'
import { Delete } from '@/types/delete'
import { HttpMethod } from '@/types/http-method'
import { PersonType } from '@/types/models'
import { Pagination } from '@/types/pagination'

export function requests() {
  const { request } = useApp()

  const personTypeList = async (params: Pagination) => {
    return request<PersonType>({
      url: '/person-type',
      params,
    }).then((res) => res.data)
  }

  const personTypeGet = async (id: number) => {
    return request<PersonType>({
      url: `/person-type/${id}`,
    }).then((res) => res.data)
  }

  const personTypeCreate = async (data: PersonType) => {
    if (!data.id) delete (data as any).id
    return request<PersonType>({
      url: '/person-type',
      method: HttpMethod.POST,
      data,
    }).then((res) => res.data)
  }

  const personTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: '/person-type',
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data)
  }

  const personTypeUpdate = async (id: number, data: PersonType) => {
    return request<PersonType>({
      url: `/person-type/${id}`,
      method: HttpMethod.PATCH,
      data,
    }).then((res) => res.data)
  }

  return {
    personTypeCreate,
    personTypeDelete,
    personTypeUpdate,
    personTypeGet,
    personTypeList,
  }
}
