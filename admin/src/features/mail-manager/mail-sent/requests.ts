import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { MailSent } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const mailSentList = async (params: PaginationParams) => {
    return request<PaginationResult<MailSent>>({
      url: "/mail-sent",
      params,
    }).then((res) => res.data);
  };

  const mailSentGet = async (id: number) => {
    return request<MailSent>({
      url: `/mail-sent/${id}`,
    }).then((res) => res.data);
  };

  const mailSentCreate = async (params: { data: MailSent }) => {
    const { data } = params;
    return request<MailSent>({
      url: "/mail-sent",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const mailSentDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/mail-sent",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const mailSentUpdate = async (params: { id: number; data: MailSent }) => {
    const { id, data } = params;
    return request<MailSent>({
      url: `/mail-sent/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    mailSentCreate,
    mailSentUpdate,
    mailSentDelete,
    mailSentList,
    mailSentGet,
  };
}
