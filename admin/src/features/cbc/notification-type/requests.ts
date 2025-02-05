import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { NotificationType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const notificationTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<NotificationType>>({
      url: "/notification-type",
      params,
    }).then((res) => res.data);
  };

  const notificationTypeGet = async (id: number) => {
    return request<NotificationType>({
      url: `/notification-type/${id}`,
    }).then((res) => res.data);
  };

  const notificationTypeCreate = async (params: { data: NotificationType }) => {
    const { data } = params;
    return request<NotificationType>({
      url: "/notification-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const notificationTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/notification-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const notificationTypeUpdate = async (params: {
    id: number;
    data: NotificationType;
  }) => {
    const { id, data } = params;
    return request<NotificationType>({
      url: `/notification-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    notificationTypeCreate,
    notificationTypeUpdate,
    notificationTypeDelete,
    notificationTypeList,
    notificationTypeGet,
  };
}
