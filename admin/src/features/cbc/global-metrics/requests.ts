import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { GlobalMetrics } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const globalMetricsList = async (params: PaginationParams) => {
    return request<PaginationResult<GlobalMetrics>>({
      url: "/global-metrics",
      params,
    }).then((res) => res.data);
  };

  const globalMetricsGet = async (id: number) => {
    return request<GlobalMetrics>({
      url: `/global-metrics/${id}`,
    }).then((res) => res.data);
  };

  const globalMetricsCreate = async (params: { data: GlobalMetrics }) => {
    const { data } = params;
    return request<GlobalMetrics>({
      url: "/global-metrics",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const globalMetricsDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/global-metrics",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const globalMetricsUpdate = async (params: {
    id: number;
    data: GlobalMetrics;
  }) => {
    const { id, data } = params;
    return request<GlobalMetrics>({
      url: `/global-metrics/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    globalMetricsCreate,
    globalMetricsUpdate,
    globalMetricsDelete,
    globalMetricsList,
    globalMetricsGet,
  };
}
