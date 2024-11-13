import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonContactType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personContactList = async (
    personId: number,
    params: PaginationParams & { typeId?: number; contactId?: number },
  ) => {
    return request<PaginationResult<PersonContactType>>({
      url: `/person/${personId}/contact`,
      params,
    }).then((res) => res.data);
  };

  const personContactCreate = async (
    personId: number,
    data: PersonContactType,
  ) => {
    return request<PersonContactType>({
      url: `/person/${personId}/contact`,
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personContactUpdate = async (
    personId: number,
    contactId: number,
    data: PersonContactType,
  ) => {
    return request<PersonContactType>({
      url: `/person/${personId}/contact/${contactId}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personContactDelete = async (personId: number, ids: number[]) => {
    return request<Delete>({
      url: `/person/${personId}/contact`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  return {
    personContactCreate,
    personContactUpdate,
    personContactDelete,
    personContactList,
  };
}
