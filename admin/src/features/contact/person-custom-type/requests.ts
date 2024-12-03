import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonCustomType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personCustomTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<PersonCustomType>>({
      url: "/person-custom-type",
      params,
    }).then((res) => res.data);
  };

  const personCustomTypeGet = async (id: number) => {
    return request<PersonCustomType>({
      url: `/person-custom-type/${id}`,
    }).then((res) => res.data);
  };

  const personCustomTypeCreate = async (params: { data: PersonCustomType }) => {
    const { data } = params;
    return request<PersonCustomType>({
      url: "/person-custom-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personCustomTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/person-custom-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const personCustomTypeUpdate = async (params: {
    id: number;
    data: PersonCustomType;
  }) => {
    const { id, data } = params;
    return request<PersonCustomType>({
      url: `/person-custom-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    personCustomTypeCreate,
    personCustomTypeUpdate,
    personCustomTypeDelete,
    personCustomTypeList,
    personCustomTypeGet,
  };
}
