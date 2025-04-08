import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "mail-var";

export function useMailVarCreate() {
  const { mailVarCreate } = requests();
  return useDefaultMutation(scope, "create", mailVarCreate);
}

export function useMailVarDelete() {
  const { mailVarDelete } = requests();
  return useDefaultMutation(scope, "delete", mailVarDelete);
}

export function useMailVarUpdate() {
  const { mailVarUpdate } = requests();
  return useDefaultMutation(scope, "update", mailVarUpdate);
}

export function useMailVarGet(id: number) {
  const { mailVarGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => mailVarGet(id),
  });
}
