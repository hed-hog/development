import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ComponentPropType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const componentPropTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<ComponentPropType>>({
      url: "/component-prop-type",
      params,
    }).then((res) => res.data);
  };

  const componentPropTypeGet = async (id: number) => {
    return request<ComponentPropType>({
      url: `/component-prop-type/${id}`,
    }).then((res) => res.data);
  };

  const componentPropTypeCreate = async (params: {
    data: ComponentPropType;
  }) => {
    const { data } = params;
    return request<ComponentPropType>({
      url: "/component-prop-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const componentPropTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/component-prop-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const componentPropTypeUpdate = async (params: {
    id: number;
    data: ComponentPropType;
  }) => {
    const { id, data } = params;
    return request<ComponentPropType>({
      url: `/component-prop-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    componentPropTypeCreate,
    componentPropTypeUpdate,
    componentPropTypeDelete,
    componentPropTypeList,
    componentPropTypeGet,
  };
}
