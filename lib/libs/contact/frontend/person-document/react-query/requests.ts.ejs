import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonDocumentType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const personDocumentList = async (
    personId: number,
    params: PaginationParams & { typeId?: number; documentId?: number },
  ) => {
    return request<PaginationResult<PersonDocumentType>>({
      url: `/person/${personId}/document`,
      params,
    }).then((res) => res.data);
  };

  const personDocumentCreate = async (
    personId: number,
    data: PersonDocumentType,
  ) => {
    return request<PersonDocumentType>({
      url: `/person/${personId}/document`,
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personDocumentUpdate = async (
    personId: number,
    documentId: number,
    data: PersonDocumentType,
  ) => {
    return request<PersonDocumentType>({
      url: `/person/${personId}/document/${documentId}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const personDocumentDelete = async (personId: number, ids: number[]) => {
    return request<Delete>({
      url: `/person/${personId}/document`,
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
