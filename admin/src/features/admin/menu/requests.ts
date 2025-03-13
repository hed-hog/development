import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Menu } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const menuList = async (params: PaginationParams) => {
    return request<PaginationResult<Menu>>({
      url: "/menu",
      params,
    }).then((res) => res.data);
  };

  const menuGet = async (id: number) => {
    return request<Menu>({
      url: `/menu/${id}`,
    }).then((res) => res.data);
  };

  const menuCreate = async (params: { data: Menu }) => {
    const { data } = params;
    return request<Menu>({
      url: "/menu",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const menuDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/menu",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const menuUpdate = async (params: { id: number; data: Menu }) => {
    const { id, data } = params;
    return request<Menu>({
      url: `/menu/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    menuCreate,
    menuUpdate,
    menuDelete,
    menuList,
    menuGet,
  };
}
