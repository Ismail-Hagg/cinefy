import { MMKV } from "react-native-mmkv";
import { Details, LocalUser } from "./types";

const storage = new MMKV();

export const saveUserLocally = (user: LocalUser): boolean => {
  try {
    storage.set("user", JSON.stringify(user));
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserLocally = (): LocalUser | null => {
  const user = storage.getString("user");
  return user ? JSON.parse(user) : null;
};

export const clearLocalStorage = () => {
  storage.clearAll();
};

export const clearStorageKey = (key: string) => {
  storage.delete(key);
};

export const saveList = (
  key: "favs" | "watchList",
  list: Details[]
): boolean => {
  try {
    storage.set(key, JSON.stringify(list));
    return true;
  } catch (error) {
    return false;
  }
};

export const getList = (key: "favs" | "watchList"): Details[] => {
  const list = storage.getString(key);
  return list ? JSON.parse(list) : [];
};

export const setList = (
  key: "favs" | "watchList",
  list: Details[]
): boolean => {
  try {
    storage.set(key, JSON.stringify(list));
    return true;
  } catch (error) {
    return false;
  }
};
