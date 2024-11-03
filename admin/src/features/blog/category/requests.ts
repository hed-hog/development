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
    });
  };

  const categoryGet = async (id: number) => {
    return request<Category>({
      url: `/category/${id}`,
    });
  };

  const categoryCreate = async (data: Category) => {
    return request<Category>({
      url: "/category",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    });
  };

  const categoryDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/category",
      data: { ids },
      method: HttpMethod.DELETE,
    });
  };

  const categoryUpdate = async (id: number, data: Category) => {
    return request<Category>({
      url: `/category/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    });
  };

  return {
    categoryCreate,
    categoryUpdate,
    categoryDelete,
    categoryList,
    categoryGet,
  };
}
