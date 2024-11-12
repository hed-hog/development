import { formatDataWithLocale } from "@hedhog/utils";

import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonCustomType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personCustomList = async (
    personId: number,
    params: PaginationParams & { typeId?: number; customId?: number },
  ) => {
    return request<PaginationResult<PersonCustomType>>({
      url: `/person/${personId}/custom`,
      params,
    }).then((res) => res.data);
  };

  const personCustomCreate = async (
    personId: number,
    data: PersonCustomType,
  ) => {
    return request<PersonCustomType>({
      url: `/person/${personId}/custom`,
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personCustomUpdate = async (
    personId: number,
    customId: number,
    data: PersonCustomType,
  ) => {
    return request<PersonCustomType>({
      url: `/person/${personId}/custom/${customId}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personCustomDelete = async (personId: number, ids: number[]) => {
    return request<Delete>({
      url: `/person/${personId}/custom`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  return {
    personCustomCreate,
    personCustomUpdate,
    personCustomDelete,
    personCustomList,
  };
}
