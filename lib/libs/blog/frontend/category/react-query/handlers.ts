import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "category";

export function useCategoryCreate() {
  const { categoryCreate } = requests();
  return useDefaultMutation(scope, "create", categoryCreate);
}

export function useCategoryDelete() {
  const { categoryDelete } = requests();
  return useDefaultMutation(scope, "delete", categoryDelete);
}

export function useCategoryUpdate() {
  const { categoryUpdate } = requests();
  return useDefaultMutation(scope, "update", categoryUpdate);
}

export function useCategoryGet(id: number) {
  const { categoryGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => categoryGet(id),
  });
}
