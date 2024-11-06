import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ContactusSubject } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const contactusSubjectList = async (params: PaginationParams) => {
    return request<PaginationResult<ContactusSubject>>({
      url: "/contactus-subject",
      params,
    }).then((res) => res.data);
  };

  const contactusSubjectGet = async (id: number) => {
    return request<ContactusSubject>({
      url: `/contactus-subject/${id}`,
    }).then((res) => res.data);
  };

  const contactusSubjectCreate = async (data: ContactusSubject) => {
    return request<ContactusSubject>({
      url: "/contactus-subject",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const contactusSubjectDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/contactus-subject",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const contactusSubjectUpdate = async (params: {
    id: number;
    data: ContactusSubject;
  }) => {
    const { id, data } = params;
    return request<ContactusSubject>({
      url: `/contactus-subject/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    contactusSubjectCreate,
    contactusSubjectUpdate,
    contactusSubjectDelete,
    contactusSubjectList,
    contactusSubjectGet,
  };
}
