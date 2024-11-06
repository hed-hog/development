import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Plan } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const planList = async (params: PaginationParams) => {
    return request<PaginationResult<Plan>>({
      url: "/plan",
      params,
    }).then((res) => res.data);
  };

  const planGet = async (id: number) => {
    return request<Plan>({
      url: `/plan/${id}`,
    }).then((res) => res.data);
  };

  const planCreate = async (data: Plan) => {
    return request<Plan>({
      url: "/plan",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const planDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/plan",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const planUpdate = async (params: { id: number; data: Plan }) => {
    const { id, data } = params;
    return request<Plan>({
      url: `/plan/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    planCreate,
    planUpdate,
    planDelete,
    planList,
    planGet,
  };
}
