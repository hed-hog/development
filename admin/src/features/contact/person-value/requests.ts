import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonValueType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personValueList = async (
    personId: number,
    params: PaginationParams & { typeId?: number; valueId?: number },
  ) => {
    return request<PaginationResult<PersonValueType>>({
      url: `/person/${personId}/value`,
      params,
    }).then((res) => res.data);
  };

  const personValueCreate = async (personId: number, data: PersonValueType) => {
    return request<PersonValueType>({
      url: `/person/${personId}/value`,
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personValueUpdate = async (
    personId: number,
    valueId: number,
    data: PersonValueType,
  ) => {
    return request<PersonValueType>({
      url: `/person/${personId}/value/${valueId}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personValueDelete = async (personId: number, ids: number[]) => {
    return request<Delete>({
      url: `/person/${personId}/value`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  return {
    personValueCreate,
    personValueUpdate,
    personValueDelete,
    personValueList,
  };
}
