import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonAddressType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const personAddressList = async (
    personId: number,
    params: PaginationParams & { id?: number },
  ) => {
    return request<PaginationResult<PersonAddressType>>({
      url: `/person/${personId}/person-address`,
      params,
    }).then((res) => res.data);
  };

  const personAddressCreate = async (params: {
    personId: number;
    data: PersonAddressType;
  }) => {
    const { personId, data } = params;

    return request<PersonAddressType>({
      url: `/person/${personId}/person-address`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const personAddressUpdate = async (params: {
    personId: number;
    id: number;
    data: PersonAddressType;
  }) => {
    const { personId, id, data } = params;

    return request<PersonAddressType>({
      url: `/person/${personId}/person-address/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  const personAddressDelete = async (params: { id: number; ids: number[] }) => {
    const { id, ids } = params;

    return request<Delete>({
      url: `/person/${id}/person-address`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  const personAddressGet = async (params: { personId: number; id: number }) => {
    const { personId, id } = params;

    return request<PersonAddressType>({
      url: `/person/${personId}/person-address/${id}`,
    }).then((res) => res.data);
  };

  return {
    personAddressCreate,
    personAddressUpdate,
    personAddressDelete,
    personAddressList,
    personAddressGet,
  };
}
