import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "content";

export function useContentCreate() {
  const { contentCreate } = requests();
  return useDefaultMutation(scope, "create", contentCreate);
}

export function useContentDelete() {
  const { contentDelete } = requests();
  return useDefaultMutation(scope, "delete", contentDelete);
}

export function useContentUpdate() {
  const { contentUpdate } = requests();
  return useDefaultMutation(scope, "update", contentUpdate);
}

export function useContentGet(id: number) {
  const { contentGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => contentGet(id),
  });
}
