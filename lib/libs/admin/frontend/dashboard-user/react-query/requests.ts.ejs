import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { DashboardUser } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const dashboardUserList = async (params: PaginationParams) => {
    return request<PaginationResult<DashboardUser>>({
      url: "/dashboard-user",
      params,
    }).then((res) => res.data);
  };

  const dashboardUserGet = async (id: number) => {
    return request<DashboardUser>({
      url: `/dashboard-user/${id}`,
    }).then((res) => res.data);
  };

  const dashboardUserCreate = async (params: { data: DashboardUser }) => {
    const { data } = params;
    return request<DashboardUser>({
      url: "/dashboard-user",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const dashboardUserDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/dashboard-user",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const dashboardUserUpdate = async (params: {
    id: number;
    data: DashboardUser;
  }) => {
    const { id, data } = params;
    return request<DashboardUser>({
      url: `/dashboard-user/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    dashboardUserCreate,
    dashboardUserUpdate,
    dashboardUserDelete,
    dashboardUserList,
    dashboardUserGet,
  };
}
