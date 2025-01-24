import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Notification } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const notificationList = async (params: PaginationParams) => {
    return request<PaginationResult<Notification>>({
      url: "/notification",
      params,
    }).then((res) => res.data);
  };

  const notificationGet = async (id: number) => {
    return request<Notification>({
      url: `/notification/${id}`,
    }).then((res) => res.data);
  };

  const notificationCreate = async (params: { data: Notification }) => {
    const { data } = params;
    return request<Notification>({
      url: "/notification",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const notificationDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/notification",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const notificationUpdate = async (params: {
    id: number;
    data: Notification;
  }) => {
    const { id, data } = params;
    return request<Notification>({
      url: `/notification/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    notificationCreate,
    notificationUpdate,
    notificationDelete,
    notificationList,
    notificationGet,
  };
}
