import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { FreeBalanceCondition } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const freeBalanceConditionList = async (params: PaginationParams) => {
    return request<PaginationResult<FreeBalanceCondition>>({
      url: "/free-balance-condition",
      params,
    }).then((res) => res.data);
  };

  const freeBalanceConditionGet = async (id: number) => {
    return request<FreeBalanceCondition>({
      url: `/free-balance-condition/${id}`,
    }).then((res) => res.data);
  };

  const freeBalanceConditionCreate = async (params: {
    data: FreeBalanceCondition;
  }) => {
    const { data } = params;
    return request<FreeBalanceCondition>({
      url: "/free-balance-condition",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const freeBalanceConditionDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/free-balance-condition",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const freeBalanceConditionUpdate = async (params: {
    id: number;
    data: FreeBalanceCondition;
  }) => {
    const { id, data } = params;
    return request<FreeBalanceCondition>({
      url: `/free-balance-condition/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    freeBalanceConditionCreate,
    freeBalanceConditionUpdate,
    freeBalanceConditionDelete,
    freeBalanceConditionList,
    freeBalanceConditionGet,
  };
}
