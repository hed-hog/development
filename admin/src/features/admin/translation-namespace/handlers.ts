import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "translation-namespace";

export function useTranslationNamespaceCreate() {
  const { translationNamespaceCreate } = requests();
  return useDefaultMutation(scope, "create", translationNamespaceCreate);
}

export function useTranslationNamespaceDelete() {
  const { translationNamespaceDelete } = requests();
  return useDefaultMutation(scope, "delete", translationNamespaceDelete);
}

export function useTranslationNamespaceUpdate() {
  const { translationNamespaceUpdate } = requests();
  return useDefaultMutation(scope, "update", translationNamespaceUpdate);
}

export function useTranslationNamespaceGet(id: number) {
  const { translationNamespaceGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => translationNamespaceGet(id),
  });
}
