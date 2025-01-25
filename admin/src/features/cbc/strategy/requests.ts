import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Strategy } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const strategyList = async (params: PaginationParams) => {
    return request<PaginationResult<Strategy>>({
      url: "/strategy",
      params,
    }).then((res) => res.data);
  };

  const strategyGet = async (id: number) => {
    return request<Strategy>({
      url: `/strategy/${id}`,
    }).then((res) => res.data);
  };

  const strategyCreate = async (params: { data: Strategy }) => {
    const { data } = params;
    return request<Strategy>({
      url: "/strategy",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const strategyDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/strategy",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const strategyUpdate = async (params: { id: number; data: Strategy }) => {
    const { id, data } = params;
    return request<Strategy>({
      url: `/strategy/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    strategyCreate,
    strategyUpdate,
    strategyDelete,
    strategyList,
    strategyGet,
  };
}
