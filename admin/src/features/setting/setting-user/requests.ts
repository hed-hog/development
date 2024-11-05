import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { SettingUser } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const settingUserList = async (params: PaginationParams) => {
    return request<PaginationResult<SettingUser>>({
      url: "/setting-user",
      params,
    }).then((res) => res.data);
  };

  const settingUserGet = async (id: number) => {
    return request<SettingUser>({
      url: `/setting-user/${id}`,
    }).then((res) => res.data);
  };

  const settingUserCreate = async (data: SettingUser) => {
    return request<SettingUser>({
      url: "/setting-user",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const settingUserDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/setting-user",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const settingUserUpdate = async (params: {
    id: number;
    data: SettingUser;
  }) => {
    const { id, data } = params;
    return request<SettingUser>({
      url: `/setting-user/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    settingUserCreate,
    settingUserUpdate,
    settingUserDelete,
    settingUserList,
    settingUserGet,
  };
}
