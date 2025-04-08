import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { InstanceProp } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const instancePropList = async (params: PaginationParams) => {
    return request<PaginationResult<InstanceProp>>({
      url: "/instance-prop",
      params,
    }).then((res) => res.data);
  };

  const instancePropGet = async (id: number) => {
    return request<InstanceProp>({
      url: `/instance-prop/${id}`,
    }).then((res) => res.data);
  };

  const instancePropCreate = async (params: { data: InstanceProp }) => {
    const { data } = params;
    return request<InstanceProp>({
      url: "/instance-prop",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const instancePropDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/instance-prop",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const instancePropUpdate = async (params: {
    id: number;
    data: InstanceProp;
  }) => {
    const { id, data } = params;
    return request<InstanceProp>({
      url: `/instance-prop/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    instancePropCreate,
    instancePropUpdate,
    instancePropDelete,
    instancePropList,
    instancePropGet,
  };
}
