import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonAddressType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personAddressList = async (
    personId: number,
    params: PaginationParams & { typeId?: number; addressId?: number },
  ) => {
    return request<PaginationResult<PersonAddressType>>({
      url: `/person/${personId}/address`,
      params,
    }).then((res) => res.data);
  };

  const personAddressCreate = async (
    personId: number,
    data: PersonAddressType,
  ) => {
    return request<PersonAddressType>({
      url: `/person/${personId}/address`,
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personAddressUpdate = async (
    personId: number,
    addressId: number,
    data: PersonAddressType,
  ) => {
    return request<PersonAddressType>({
      url: `/person/${personId}/address/${addressId}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personAddressDelete = async (personId: number, ids: number[]) => {
    return request<Delete>({
      url: `/person/${personId}/address`,
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
