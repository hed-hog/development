import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { SettingGroup } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const settingGroupList = async (params: PaginationParams) => {
    return request<PaginationResult<SettingGroup>>({
      url: "/setting-group",
      params,
    }).then((res) => res.data);
  };

  const settingGroupGet = async (id: number) => {
    return request<SettingGroup>({
      url: `/setting-group/${id}`,
    }).then((res) => res.data);
  };

  const settingGroupCreate = async (data: SettingGroup) => {
    return request<SettingGroup>({
      url: "/setting-group",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const settingGroupDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/setting-group",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const settingGroupUpdate = async (params: {
    id: number;
    data: SettingGroup;
  }) => {
    const { id, data } = params;
    return request<SettingGroup>({
      url: `/setting-group/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    settingGroupCreate,
    settingGroupUpdate,
    settingGroupDelete,
    settingGroupList,
    settingGroupGet,
  };
}
