import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Event } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const eventList = async (params: PaginationParams) => {
    return request<PaginationResult<Event>>({
      url: "/event",
      params,
    }).then((res) => res.data);
  };

  const eventGet = async (id: number) => {
    return request<Event>({
      url: `/event/${id}`,
    }).then((res) => res.data);
  };

  const eventCreate = async (params: { data: Event }) => {
    const { data } = params;
    return request<Event>({
      url: "/event",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const eventDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/event",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const eventUpdate = async (params: { id: number; data: Event }) => {
    const { id, data } = params;
    return request<Event>({
      url: `/event/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    eventCreate,
    eventUpdate,
    eventDelete,
    eventList,
    eventGet,
  };
}
