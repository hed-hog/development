import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PlanDuration } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const planDurationList = async (params: PaginationParams) => {
    return request<PaginationResult<PlanDuration>>({
      url: "/plan-duration",
      params,
    }).then((res) => res.data);
  };

  const planDurationGet = async (id: number) => {
    return request<PlanDuration>({
      url: `/plan-duration/${id}`,
    }).then((res) => res.data);
  };

  const planDurationCreate = async (data: PlanDuration) => {
    return request<PlanDuration>({
      url: "/plan-duration",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const planDurationDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/plan-duration",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const planDurationUpdate = async (params: {
    id: number;
    data: PlanDuration;
  }) => {
    const { id, data } = params;
    return request<PlanDuration>({
      url: `/plan-duration/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    planDurationCreate,
    planDurationUpdate,
    planDurationDelete,
    planDurationList,
    planDurationGet,
  };
}
