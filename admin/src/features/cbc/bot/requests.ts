import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Bot } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const botList = async (params: PaginationParams) => {
    return request<PaginationResult<Bot>>({
      url: "/bot",
      params,
    }).then((res) => res.data);
  };

  const botGet = async (id: number) => {
    return request<Bot>({
      url: `/bot/${id}`,
    }).then((res) => res.data);
  };

  const botCreate = async (params: { data: Bot }) => {
    const { data } = params;
    return request<Bot>({
      url: "/bot",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const botDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/bot",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const botUpdate = async (params: { id: number; data: Bot }) => {
    const { id, data } = params;
    return request<Bot>({
      url: `/bot/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    botCreate,
    botUpdate,
    botDelete,
    botList,
    botGet,
  };
}
