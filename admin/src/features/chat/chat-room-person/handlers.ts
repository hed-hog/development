import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "chat-room-person";

export function useChatRoomPersonCreate() {
  const { chatRoomPersonCreate } = requests();
  return useDefaultMutation(scope, "create", chatRoomPersonCreate);
}

export function useChatRoomPersonDelete() {
  const { chatRoomPersonDelete } = requests();
  return useDefaultMutation(scope, "delete", chatRoomPersonDelete);
}

export function useChatRoomPersonUpdate() {
  const { chatRoomPersonUpdate } = requests();
  return useDefaultMutation(scope, "update", chatRoomPersonUpdate);
}

export function useChatRoomPersonGet(id: number) {
  const { chatRoomPersonGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => chatRoomPersonGet(id),
  });
}
