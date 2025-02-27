import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ChatRoom } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const chatRoomList = async (params: PaginationParams) => {
    return request<PaginationResult<ChatRoom>>({
      url: "/chat-room",
      params,
    }).then((res) => res.data);
  };

  const chatRoomGet = async (id: number) => {
    return request<ChatRoom>({
      url: `/chat-room/${id}`,
    }).then((res) => res.data);
  };

  const chatRoomCreate = async (params: { data: ChatRoom }) => {
    const { data } = params;
    return request<ChatRoom>({
      url: "/chat-room",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const chatRoomDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/chat-room",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const chatRoomUpdate = async (params: { id: number; data: ChatRoom }) => {
    const { id, data } = params;
    return request<ChatRoom>({
      url: `/chat-room/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    chatRoomCreate,
    chatRoomUpdate,
    chatRoomDelete,
    chatRoomList,
    chatRoomGet,
  };
}
