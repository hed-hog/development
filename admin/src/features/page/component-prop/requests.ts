import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ComponentProp } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const componentPropList = async (params: PaginationParams) => {
    return request<PaginationResult<ComponentProp>>({
      url: "/component-prop",
      params,
    }).then((res) => res.data);
  };

  const componentPropGet = async (id: number) => {
    return request<ComponentProp>({
      url: `/component-prop/${id}`,
    }).then((res) => res.data);
  };

  const componentPropCreate = async (params: { data: ComponentProp }) => {
    const { data } = params;
    return request<ComponentProp>({
      url: "/component-prop",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const componentPropDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/component-prop",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const componentPropUpdate = async (params: {
    id: number;
    data: ComponentProp;
  }) => {
    const { id, data } = params;
    return request<ComponentProp>({
      url: `/component-prop/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    componentPropCreate,
    componentPropUpdate,
    componentPropDelete,
    componentPropList,
    componentPropGet,
  };
}
