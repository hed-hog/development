import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { DashboardItem } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const dashboardItemList = async (params: PaginationParams) => {
    return request<PaginationResult<DashboardItem>>({
      url: "/dashboard-item",
      params,
    }).then((res) => res.data);
  };

  const dashboardItemGet = async (id: number) => {
    return request<DashboardItem>({
      url: `/dashboard-item/${id}`,
    }).then((res) => res.data);
  };

  const dashboardItemCreate = async (params: { data: DashboardItem }) => {
    const { data } = params;
    return request<DashboardItem>({
      url: "/dashboard-item",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const dashboardItemDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/dashboard-item",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const dashboardItemUpdate = async (params: {
    id: number;
    data: DashboardItem;
  }) => {
    const { id, data } = params;
    return request<DashboardItem>({
      url: `/dashboard-item/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    dashboardItemCreate,
    dashboardItemUpdate,
    dashboardItemDelete,
    dashboardItemList,
    dashboardItemGet,
  };
}
