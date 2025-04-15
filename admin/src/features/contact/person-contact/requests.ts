import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonContactType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const personContactList = async (
    personId: number,
    params: PaginationParams & { id?: number },
  ) => {
    return request<PaginationResult<PersonContactType>>({
      url: `/person/${personId}/person-contact`,
      params,
    }).then((res) => res.data);
  };

  const personContactCreate = async (params: {
    personId: number;
    data: PersonContactType;
  }) => {
    const { personId, data } = params;

    return request<PersonContactType>({
      url: `/person/${personId}/person-contact`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const personContactUpdate = async (params: {
    personId: number;
    id: number;
    data: PersonContactType;
  }) => {
    const { personId, id, data } = params;

    return request<PersonContactType>({
      url: `/person/${personId}/person-contact/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  const personContactDelete = async (params: { id: number; ids: number[] }) => {
    const { id, ids } = params;

    return request<Delete>({
      url: `/person/${id}/person-contact`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  const personContactGet = async (params: { personId: number; id: number }) => {
    const { personId, id } = params;

    return request<PersonContactType>({
      url: `/person/${personId}/person-contact/${id}`,
    }).then((res) => res.data);
  };

  return {
    personContactCreate,
    personContactUpdate,
    personContactDelete,
    personContactList,
    personContactGet,
  };
}
