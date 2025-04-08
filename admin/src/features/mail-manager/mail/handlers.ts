import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "mail";

export function useMailCreate() {
  const { mailCreate } = requests();
  return useDefaultMutation(scope, "create", mailCreate);
}

export function useMailDelete() {
  const { mailDelete } = requests();
  return useDefaultMutation(scope, "delete", mailDelete);
}

export function useMailUpdate() {
  const { mailUpdate } = requests();
  return useDefaultMutation(scope, "update", mailUpdate);
}

export function useMailGet(id: number) {
  const { mailGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => mailGet(id),
  });
}
