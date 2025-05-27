import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ChatMessage } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const chatMessageList = async (params: PaginationParams) => {
    return request<PaginationResult<ChatMessage>>({
      url: "/chat-message",
      params,
    }).then((res) => res.data);
  };

  const chatMessageGet = async (id: number) => {
    return request<ChatMessage>({
      url: `/chat-message/${id}`,
    }).then((res) => res.data);
  };

  const chatMessageCreate = async (params: { data: ChatMessage }) => {
    const { data } = params;
    return request<ChatMessage>({
      url: "/chat-message",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const chatMessageDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/chat-message",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const chatMessageUpdate = async (params: {
    id: number;
    data: ChatMessage;
  }) => {
    const { id, data } = params;
    return request<ChatMessage>({
      url: `/chat-message/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    chatMessageCreate,
    chatMessageUpdate,
    chatMessageDelete,
    chatMessageList,
    chatMessageGet,
  };
}
