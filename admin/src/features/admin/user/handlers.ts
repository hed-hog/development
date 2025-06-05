import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "user";

export function useUserCreate() {
  const { userCreate } = requests();
  return useDefaultMutation(scope, "create", userCreate);
}

export function useUserDelete() {
  const { userDelete } = requests();
  return useDefaultMutation(scope, "delete", userDelete);
}

export function useUserUpdate() {
  const { userUpdate } = requests();
  return useDefaultMutation(scope, "update", userUpdate);
}

export function useUserGet(id: number) {
  const { userGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => userGet(id),
  });
}
