import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonDocumentType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personDocumentTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<PersonDocumentType>>({
      url: "/person-document-type",
      params,
    }).then((res) => res.data);
  };

  const personDocumentTypeGet = async (id: number) => {
    return request<PersonDocumentType>({
      url: `/person-document-type/${id}`,
    }).then((res) => res.data);
  };

  const personDocumentTypeCreate = async (params: {
    data: PersonDocumentType;
  }) => {
    const { data } = params;
    return request<PersonDocumentType>({
      url: "/person-document-type",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personDocumentTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/person-document-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const personDocumentTypeUpdate = async (params: {
    id: number;
    data: PersonDocumentType;
  }) => {
    const { id, data } = params;
    return request<PersonDocumentType>({
      url: `/person-document-type/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    personDocumentTypeCreate,
    personDocumentTypeUpdate,
    personDocumentTypeDelete,
    personDocumentTypeList,
    personDocumentTypeGet,
  };
}
