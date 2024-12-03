import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "person-document";

export function usePersonDocumentCreate() {
  const { personDocumentCreate } = requests();
  return useDefaultMutation(scope, "create", personDocumentCreate);
}

export function usePersonDocumentDelete() {
  const { personDocumentDelete } = requests();
  return useDefaultMutation(scope, "delete", personDocumentDelete);
}

export function usePersonDocumentUpdate() {
  const { personDocumentUpdate } = requests();
  return useDefaultMutation(scope, "update", personDocumentUpdate);
}

export function usePersonDocumentGet(personId: number, id: number) {
  const { personDocumentGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => personDocumentGet({ personId, id }),
  });
}
