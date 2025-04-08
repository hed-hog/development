import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "contact-us";

export function useContactUsCreate() {
  const { contactUsCreate } = requests();
  return useDefaultMutation(scope, "create", contactUsCreate);
}

export function useContactUsDelete() {
  const { contactUsDelete } = requests();
  return useDefaultMutation(scope, "delete", contactUsDelete);
}

export function useContactUsUpdate() {
  const { contactUsUpdate } = requests();
  return useDefaultMutation(scope, "update", contactUsUpdate);
}

export function useContactUsGet(id: number) {
  const { contactUsGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => contactUsGet(id),
  });
}
