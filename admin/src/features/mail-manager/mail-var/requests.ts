import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { MailVar } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const mailVarList = async (params: PaginationParams) => {
    return request<PaginationResult<MailVar>>({
      url: "/mail-var",
      params,
    }).then((res) => res.data);
  };

  const mailVarGet = async (id: number) => {
    return request<MailVar>({
      url: `/mail-var/${id}`,
    }).then((res) => res.data);
  };

  const mailVarCreate = async (params: { data: MailVar }) => {
    const { data } = params;
    return request<MailVar>({
      url: "/mail-var",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const mailVarDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/mail-var",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const mailVarUpdate = async (params: { id: number; data: MailVar }) => {
    const { id, data } = params;
    return request<MailVar>({
      url: `/mail-var/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    mailVarCreate,
    mailVarUpdate,
    mailVarDelete,
    mailVarList,
    mailVarGet,
  };
}
