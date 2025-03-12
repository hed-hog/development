import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonValueType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const personValueList = async (
    personId: number,
    params: PaginationParams & { id?: number },
  ) => {
    return request<PaginationResult<PersonValueType>>({
      url: `/person/${personId}/person-value`,
      params,
    }).then((res) => res.data);
  };

  const personValueCreate = async (params: {
    personId: number;
    data: PersonValueType;
  }) => {
    const { personId, data } = params;

    return request<PersonValueType>({
      url: `/person/${personId}/person-value`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const personValueUpdate = async (params: {
    personId: number;
    id: number;
    data: PersonValueType;
  }) => {
    const { personId, id, data } = params;

    return request<PersonValueType>({
      url: `/person/${personId}/person-value/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  const personValueDelete = async (params: { id: number; ids: number[] }) => {
    const { id, ids } = params;

    return request<Delete>({
      url: `/person/${id}/person-value`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  const personValueGet = async (params: { personId: number; id: number }) => {
    const { personId, id } = params;

    return request<PersonValueType>({
      url: `/person/${personId}/person-value/${id}`,
    }).then((res) => res.data);
  };

  return {
    personValueCreate,
    personValueUpdate,
    personValueDelete,
    personValueList,
    personValueGet,
  };
}
