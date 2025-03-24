import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Dashboard } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from '@hedhog/utils'

export function requests() {
  const { request } = useApp();

  const dashboardList = async (params: PaginationParams) => {
    return request<PaginationResult<Dashboard>>({
      url: "/dashboard",
      params,
    }).then((res) => res.data);
  };

  const dashboardGet = async (id: number) => {
    return request<Dashboard>({
      url: `/dashboard/${id}`,
    }).then((res) => res.data);
  };

  const dashboardCreate = async (params: { data: Dashboard }) => {
    const { data } = params;
    return request<Dashboard>({
      url: "/dashboard",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const dashboardDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/dashboard",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const dashboardUpdate = async (params: { id: number; data: Dashboard }) => {
    const { id, data } = params;
    return request<Dashboard>({
      url: `/dashboard/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    dashboardCreate,
    dashboardUpdate,
    dashboardDelete,
    dashboardList,
    dashboardGet,
  };
}
