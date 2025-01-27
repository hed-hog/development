import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { EventOccurrence } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const eventOccurrenceList = async (params: PaginationParams) => {
    return request<PaginationResult<EventOccurrence>>({
      url: "/event-occurrence",
      params,
    }).then((res) => res.data);
  };

  const eventOccurrenceGet = async (id: number) => {
    return request<EventOccurrence>({
      url: `/event-occurrence/${id}`,
    }).then((res) => res.data);
  };

  const eventOccurrenceCreate = async (params: { data: EventOccurrence }) => {
    const { data } = params;
    return request<EventOccurrence>({
      url: "/event-occurrence",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const eventOccurrenceDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/event-occurrence",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const eventOccurrenceUpdate = async (params: {
    id: number;
    data: EventOccurrence;
  }) => {
    const { id, data } = params;
    return request<EventOccurrence>({
      url: `/event-occurrence/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    eventOccurrenceCreate,
    eventOccurrenceUpdate,
    eventOccurrenceDelete,
    eventOccurrenceList,
    eventOccurrenceGet,
  };
}
