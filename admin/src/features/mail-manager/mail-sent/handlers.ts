import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "mail-sent";

export function useMailSentCreate() {
  const { mailSentCreate } = requests();
  return useDefaultMutation(scope, "create", mailSentCreate);
}

export function useMailSentDelete() {
  const { mailSentDelete } = requests();
  return useDefaultMutation(scope, "delete", mailSentDelete);
}

export function useMailSentUpdate() {
  const { mailSentUpdate } = requests();
  return useDefaultMutation(scope, "update", mailSentUpdate);
}

export function useMailSentGet(id: number) {
  const { mailSentGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => mailSentGet(id),
  });
}
