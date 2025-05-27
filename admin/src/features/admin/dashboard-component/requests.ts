import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { DashboardComponent } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const dashboardComponentList = async (params: PaginationParams) => {
    return request<PaginationResult<DashboardComponent>>({
      url: "/dashboard-component",
      params,
    }).then((res) => res.data);
  };

  const dashboardComponentGet = async (id: number) => {
    return request<DashboardComponent>({
      url: `/dashboard-component/${id}`,
    }).then((res) => res.data);
  };

  const dashboardComponentCreate = async (params: {
    data: DashboardComponent;
  }) => {
    const { data } = params;
    return request<DashboardComponent>({
      url: "/dashboard-component",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const dashboardComponentDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/dashboard-component",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const dashboardComponentUpdate = async (params: {
    id: number;
    data: DashboardComponent;
  }) => {
    const { id, data } = params;
    return request<DashboardComponent>({
      url: `/dashboard-component/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    dashboardComponentCreate,
    dashboardComponentUpdate,
    dashboardComponentDelete,
    dashboardComponentList,
    dashboardComponentGet,
  };
}
