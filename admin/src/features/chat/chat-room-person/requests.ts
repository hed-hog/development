import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ChatRoomPerson } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const chatRoomPersonList = async (params: PaginationParams) => {
    return request<PaginationResult<ChatRoomPerson>>({
      url: "/chat-room-person",
      params,
    }).then((res) => res.data);
  };

  const chatRoomPersonGet = async (id: number) => {
    return request<ChatRoomPerson>({
      url: `/chat-room-person/${id}`,
    }).then((res) => res.data);
  };

  const chatRoomPersonCreate = async (params: { data: ChatRoomPerson }) => {
    const { data } = params;
    return request<ChatRoomPerson>({
      url: "/chat-room-person",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const chatRoomPersonDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/chat-room-person",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const chatRoomPersonUpdate = async (params: {
    id: number;
    data: ChatRoomPerson;
  }) => {
    const { id, data } = params;
    return request<ChatRoomPerson>({
      url: `/chat-room-person/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    chatRoomPersonCreate,
    chatRoomPersonUpdate,
    chatRoomPersonDelete,
    chatRoomPersonList,
    chatRoomPersonGet,
  };
}
