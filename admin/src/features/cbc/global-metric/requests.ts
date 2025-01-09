import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { GlobalMetric } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const globalMetricList = async (params: PaginationParams) => {
    return request<PaginationResult<GlobalMetric>>({
      url: "/global-metric",
      params,
    }).then((res) => res.data);
  };

  const globalMetricGet = async (id: number) => {
    return request<GlobalMetric>({
      url: `/global-metric/${id}`,
    }).then((res) => res.data);
  };

  const globalMetricCreate = async (params: { data: GlobalMetric }) => {
    const { data } = params;
    return request<GlobalMetric>({
      url: "/global-metric",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const globalMetricDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/global-metric",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const globalMetricUpdate = async (params: {
    id: number;
    data: GlobalMetric;
  }) => {
    const { id, data } = params;
    return request<GlobalMetric>({
      url: `/global-metric/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    globalMetricCreate,
    globalMetricUpdate,
    globalMetricDelete,
    globalMetricList,
    globalMetricGet,
  };
}
