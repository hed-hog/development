import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Instance } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const instanceList = async (params: PaginationParams) => {
    return request<PaginationResult<Instance>>({
      url: "/instance",
      params,
    }).then((res) => res.data);
  };

  const instanceGet = async (id: number) => {
    return request<Instance>({
      url: `/instance/${id}`,
    }).then((res) => res.data);
  };

  const instanceCreate = async (params: { data: Instance }) => {
    const { data } = params;
    return request<Instance>({
      url: "/instance",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const instanceDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/instance",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const instanceUpdate = async (params: { id: number; data: Instance }) => {
    const { id, data } = params;
    return request<Instance>({
      url: `/instance/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    instanceCreate,
    instanceUpdate,
    instanceDelete,
    instanceList,
    instanceGet,
  };
}
