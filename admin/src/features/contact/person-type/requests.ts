import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<PersonType>>({
      url: "/person-type",
      params,
    }).then((res) => res.data);
  };

  const personTypeGet = async (id: number) => {
    return request<PersonType>({
      url: `/person-type/${id}`,
    }).then((res) => res.data);
  };

  const personTypeCreate = async (params: { data: PersonType }) => {
    const { data } = params;
    return request<PersonType>({
      url: "/person-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/person-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const personTypeUpdate = async (params: { id: number; data: PersonType }) => {
    const { id, data } = params;
    return request<PersonType>({
      url: `/person-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    personTypeCreate,
    personTypeUpdate,
    personTypeDelete,
    personTypeList,
    personTypeGet,
  };
}
