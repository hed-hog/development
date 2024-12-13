import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TrendType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const trendTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<TrendType>>({
      url: "/trend-type",
      params,
    }).then((res) => res.data);
  };

  const trendTypeGet = async (id: number) => {
    return request<TrendType>({
      url: `/trend-type/${id}`,
    }).then((res) => res.data);
  };

  const trendTypeCreate = async (params: { data: TrendType }) => {
    const { data } = params;
    return request<TrendType>({
      url: "/trend-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const trendTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/trend-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const trendTypeUpdate = async (params: { id: number; data: TrendType }) => {
    const { id, data } = params;
    return request<TrendType>({
      url: `/trend-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    trendTypeCreate,
    trendTypeUpdate,
    trendTypeDelete,
    trendTypeList,
    trendTypeGet,
  };
}
