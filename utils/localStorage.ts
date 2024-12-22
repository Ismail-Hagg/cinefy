import { MMKV } from "react-native-mmkv";
import { LocalUser, StorageStatus } from "./types";

const storage = new MMKV();

export const saveUserLocally = (user: LocalUser): StorageStatus => {
    try {
        storage.set("user", JSON.stringify(user));
        return { success: true, message: "" };
    } catch (error) {
        return { success: false, message: `${error}` };
    }
};

export const getLocalUser = (): LocalUser | null => {
    const user = storage.getString("user");
    return user ? JSON.parse(user) : null;
};

export const clearLocalStorage = () => {
    storage.clearAll();
};

export const clearStorageKey = (key: string) => {
    storage.delete(key);
};

