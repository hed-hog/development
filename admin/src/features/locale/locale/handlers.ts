import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "locale";

export function useLocaleCreate() {
  const { localeCreate } = requests();
  return useDefaultMutation(scope, "create", localeCreate);
}

export function useLocaleDelete() {
  const { localeDelete } = requests();
  return useDefaultMutation(scope, "delete", localeDelete);
}

export function useLocaleUpdate() {
  const { localeUpdate } = requests();
  return useDefaultMutation(scope, "update", localeUpdate);
}

export function useLocaleGet(id: number) {
  const { localeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => localeGet(id),
  });
}
