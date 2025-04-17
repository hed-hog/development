import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "chat-message";

export function useChatMessageCreate() {
  const { chatMessageCreate } = requests();
  return useDefaultMutation(scope, "create", chatMessageCreate);
}

export function useChatMessageDelete() {
  const { chatMessageDelete } = requests();
  return useDefaultMutation(scope, "delete", chatMessageDelete);
}

export function useChatMessageUpdate() {
  const { chatMessageUpdate } = requests();
  return useDefaultMutation(scope, "update", chatMessageUpdate);
}

export function useChatMessageGet(id: number) {
  const { chatMessageGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => chatMessageGet(id),
  });
}
