import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "translation";

export function useTranslationCreate() {
  const { translationCreate } = requests();
  return useDefaultMutation(scope, "create", translationCreate);
}

export function useTranslationDelete() {
  const { translationDelete } = requests();
  return useDefaultMutation(scope, "delete", translationDelete);
}

export function useTranslationUpdate() {
  const { translationUpdate } = requests();
  return useDefaultMutation(scope, "update", translationUpdate);
}

export function useTranslationGet(id: number) {
  const { translationGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => translationGet(id),
  });
}
