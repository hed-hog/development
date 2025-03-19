import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "chat-room";

export function useChatRoomCreate() {
  const { chatRoomCreate } = requests();
  return useDefaultMutation(scope, "create", chatRoomCreate);
}

export function useChatRoomDelete() {
  const { chatRoomDelete } = requests();
  return useDefaultMutation(scope, "delete", chatRoomDelete);
}

export function useChatRoomUpdate() {
  const { chatRoomUpdate } = requests();
  return useDefaultMutation(scope, "update", chatRoomUpdate);
}

export function useChatRoomGet(id: number) {
  const { chatRoomGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => chatRoomGet(id),
  });
}
