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

  const personAddressUpdate = async (
    personId: number,
    id: number,
    data: PersonAddressType,
  ) => {
    return request<PersonAddressType>({
      url: `/person/${personId}/person-address/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  const personAddressDelete = async (personId: number, ids: number[]) => {
    return request<Delete>({
      url: `/person/${personId}/person-address`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  return {
    personAddressCreate,
    personAddressUpdate,
    personAddressDelete,
    personAddressList,
  };
}
