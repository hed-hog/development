import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Setting } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const settingList = async (params: PaginationParams) => {
    return request<PaginationResult<Setting>>({
      url: "/setting",
      params,
    }).then((res) => res.data);
  };

  const settingGet = async (id: number) => {
    return request<Setting>({
      url: `/setting/${id}`,
    }).then((res) => res.data);
  };

  const settingCreate = async (data: Setting) => {
    return request<Setting>({
      url: "/setting",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const settingDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/setting",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const settingUpdate = async (params: { id: number; data: Setting }) => {
    const { id, data } = params;
    return request<Setting>({
      url: `/setting/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    settingCreate,
    settingUpdate,
    settingDelete,
    settingList,
    settingGet,
  };
}
