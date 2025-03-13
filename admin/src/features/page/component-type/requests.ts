import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ComponentType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const componentTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<ComponentType>>({
      url: "/component-type",
      params,
    }).then((res) => res.data);
  };

  const componentTypeGet = async (id: number) => {
    return request<ComponentType>({
      url: `/component-type/${id}`,
    }).then((res) => res.data);
  };

  const componentTypeCreate = async (params: { data: ComponentType }) => {
    const { data } = params;
    return request<ComponentType>({
      url: "/component-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const componentTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/component-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const componentTypeUpdate = async (params: {
    id: number;
    data: ComponentType;
  }) => {
    const { id, data } = params;
    return request<ComponentType>({
      url: `/component-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    componentTypeCreate,
    componentTypeUpdate,
    componentTypeDelete,
    componentTypeList,
    componentTypeGet,
  };
}
