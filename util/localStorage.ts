import { MMKV } from "react-native-mmkv";
import { LocalUser } from "./types";

const storage = new MMKV();

export const saveUserLocally = (user: LocalUser) => {
  storage.set("user", JSON.stringify(user));
};

export const getUserLocally = (): LocalUser | null => {
  const user = storage.getString("user");
  return user ? JSON.parse(user) : null;
};

export const removeUserLocally = () => {
  storage.clearAll();
};
