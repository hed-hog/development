import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { EventType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const eventTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<EventType>>({
      url: "/event-type",
      params,
    }).then((res) => res.data);
  };

  const eventTypeGet = async (id: number) => {
    return request<EventType>({
      url: `/event-type/${id}`,
    }).then((res) => res.data);
  };

  const eventTypeCreate = async (params: { data: EventType }) => {
    const { data } = params;
    return request<EventType>({
      url: "/event-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const eventTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/event-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const eventTypeUpdate = async (params: { id: number; data: EventType }) => {
    const { id, data } = params;
    return request<EventType>({
      url: `/event-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    eventTypeCreate,
    eventTypeUpdate,
    eventTypeDelete,
    eventTypeList,
    eventTypeGet,
  };
}
