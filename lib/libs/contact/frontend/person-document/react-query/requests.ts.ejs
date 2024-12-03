import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonDocumentType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const personDocumentList = async (
    personId: number,
    params: PaginationParams & { id?: number },
  ) => {
    return request<PaginationResult<PersonDocumentType>>({
      url: `/person/${personId}/person-document`,
      params,
    }).then((res) => res.data);
  };

  const personDocumentCreate = async (params: {
    personId: number;
    data: PersonDocumentType;
  }) => {
    const { personId, data } = params;

    return request<PersonDocumentType>({
      url: `/person/${personId}/person-document`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const personDocumentUpdate = async (
    personId: number,
    id: number,
    data: PersonDocumentType,
  ) => {
    return request<PersonDocumentType>({
      url: `/person/${personId}/person-document/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  const personDocumentDelete = async (personId: number, ids: number[]) => {
    return request<Delete>({
      url: `/person/${personId}/person-document`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data);
  };

  return {
    personDocumentCreate,
    personDocumentUpdate,
    personDocumentDelete,
    personDocumentList,
  };
}
