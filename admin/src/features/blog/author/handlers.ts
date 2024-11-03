import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "author";

export function useAuthorCreate() {
  const { authorCreate } = requests();
  return useDefaultMutation(scope, "create", authorCreate);
}

export function useAuthorDelete() {
  const { authorDelete } = requests();
  return useDefaultMutation(scope, "delete", authorDelete);
}

export function useAuthorUpdate() {
  const { authorUpdate } = requests();
  return useDefaultMutation(scope, "update", authorUpdate);
}

export function useAuthorGet(id: number) {
  const { authorGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => authorGet(id),
  });
}
