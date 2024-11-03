import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "post";

export function usePostCreate() {
  const { postCreate } = requests();
  return useDefaultMutation(scope, "create", postCreate);
}

export function usePostDelete() {
  const { postDelete } = requests();
  return useDefaultMutation(scope, "delete", postDelete);
}

export function usePostUpdate() {
  const { postUpdate } = requests();
  return useDefaultMutation(scope, "update", postUpdate);
}

export function usePostGet(id: number) {
  const { postGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => postGet(id),
  });
}
