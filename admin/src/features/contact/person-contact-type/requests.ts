import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonContactType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personContactTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<PersonContactType>>({
      url: "/person-contact-type",
      params,
    }).then((res) => res.data);
  };

  const personContactTypeGet = async (id: number) => {
    return request<PersonContactType>({
      url: `/person-contact-type/${id}`,
    }).then((res) => res.data);
  };

  const personContactTypeCreate = async (params: {
    data: PersonContactType;
  }) => {
    const { data } = params;
    return request<PersonContactType>({
      url: "/person-contact-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personContactTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/person-contact-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const personContactTypeUpdate = async (params: {
    id: number;
    data: PersonContactType;
  }) => {
    const { id, data } = params;
    return request<PersonContactType>({
      url: `/person-contact-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    personContactTypeCreate,
    personContactTypeUpdate,
    personContactTypeDelete,
    personContactTypeList,
    personContactTypeGet,
  };
}
