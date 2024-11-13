import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "setting-user";

export function useSettingUserCreate() {
  const { settingUserCreate } = requests();
  return useDefaultMutation(scope, "create", settingUserCreate);
}

export function useSettingUserDelete() {
  const { settingUserDelete } = requests();
  return useDefaultMutation(scope, "delete", settingUserDelete);
}

export function useSettingUserUpdate() {
  const { settingUserUpdate } = requests();
  return useDefaultMutation(scope, "update", settingUserUpdate);
}

export function useSettingUserGet(id: number) {
  const { settingUserGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => settingUserGet(id),
  });
}
