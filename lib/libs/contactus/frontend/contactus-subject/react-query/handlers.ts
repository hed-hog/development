import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "contactus-subject";

export function useContactusSubjectCreate() {
  const { contactusSubjectCreate } = requests();
  return useDefaultMutation(scope, "create", contactusSubjectCreate);
}

export function useContactusSubjectDelete() {
  const { contactusSubjectDelete } = requests();
  return useDefaultMutation(scope, "delete", contactusSubjectDelete);
}

export function useContactusSubjectUpdate() {
  const { contactusSubjectUpdate } = requests();
  return useDefaultMutation(scope, "update", contactusSubjectUpdate);
}

export function useContactusSubjectGet(id: number) {
  const { contactusSubjectGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => contactusSubjectGet(id),
  });
}
