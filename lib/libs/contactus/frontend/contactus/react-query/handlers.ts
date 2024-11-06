import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "contactus";

export function useContactusCreate() {
  const { contactusCreate } = requests();
  return useDefaultMutation(scope, "create", contactusCreate);
}

export function useContactusDelete() {
  const { contactusDelete } = requests();
  return useDefaultMutation(scope, "delete", contactusDelete);
}

export function useContactusUpdate() {
  const { contactusUpdate } = requests();
  return useDefaultMutation(scope, "update", contactusUpdate);
}

export function useContactusGet(id: number) {
  const { contactusGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => contactusGet(id),
  });
}
