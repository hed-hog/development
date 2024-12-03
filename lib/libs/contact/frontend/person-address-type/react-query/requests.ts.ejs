import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonAddressType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personAddressTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<PersonAddressType>>({
      url: "/person-address-type",
      params,
    }).then((res) => res.data);
  };

  const personAddressTypeGet = async (id: number) => {
    return request<PersonAddressType>({
      url: `/person-address-type/${id}`,
    }).then((res) => res.data);
  };

  const personAddressTypeCreate = async (params: {
    data: PersonAddressType;
  }) => {
    const { data } = params;
    return request<PersonAddressType>({
      url: "/person-address-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personAddressTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/person-address-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const personAddressTypeUpdate = async (params: {
    id: number;
    data: PersonAddressType;
  }) => {
    const { id, data } = params;
    return request<PersonAddressType>({
      url: `/person-address-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    personAddressTypeCreate,
    personAddressTypeUpdate,
    personAddressTypeDelete,
    personAddressTypeList,
    personAddressTypeGet,
  };
}
