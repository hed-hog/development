import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { TranslationNamespace } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const translationNamespaceList = async (params: PaginationParams) => {
    return request<PaginationResult<TranslationNamespace>>({
      url: "/translation-namespace",
      params,
    }).then((res) => res.data);
  };

  const translationNamespaceGet = async (id: number) => {
    return request<TranslationNamespace>({
      url: `/translation-namespace/${id}`,
    }).then((res) => res.data);
  };

  const translationNamespaceCreate = async (params: {
    data: TranslationNamespace;
  }) => {
    const { data } = params;
    return request<TranslationNamespace>({
      url: "/translation-namespace",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const translationNamespaceDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/translation-namespace",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const translationNamespaceUpdate = async (params: {
    id: number;
    data: TranslationNamespace;
  }) => {
    const { id, data } = params;
    return request<TranslationNamespace>({
      url: `/translation-namespace/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    translationNamespaceCreate,
    translationNamespaceUpdate,
    translationNamespaceDelete,
    translationNamespaceList,
    translationNamespaceGet,
  };
}
