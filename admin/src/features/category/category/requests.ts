import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Category } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const categoryList = async (params: PaginationParams) => {
    return request<PaginationResult<Category>>({
      url: "/category",
      params,
    }).then((res) => res.data);
  };

  const categoryGet = async (id: number) => {
    return request<Category>({
      url: `/category/${id}`,
    }).then((res) => res.data);
  };

  const categoryCreate = async (params: { data: Category }) => {
    const { data } = params;
    return request<Category>({
      url: "/category",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const categoryDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/category",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const categoryUpdate = async (params: { id: number; data: Category }) => {
    const { id, data } = params;
    return request<Category>({
      url: `/category/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    categoryCreate,
    categoryUpdate,
    categoryDelete,
    categoryList,
    categoryGet,
  };
}
