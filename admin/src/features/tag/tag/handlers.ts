import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "tag";

export function useTagCreate() {
  const { tagCreate } = requests();
  return useDefaultMutation(scope, "create", tagCreate);
}

export function useTagDelete() {
  const { tagDelete } = requests();
  return useDefaultMutation(scope, "delete", tagDelete);
}

export function useTagUpdate() {
  const { tagUpdate } = requests();
  return useDefaultMutation(scope, "update", tagUpdate);
}

export function useTagGet(id: number) {
  const { tagGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => tagGet(id),
  });
}
