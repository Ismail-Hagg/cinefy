import { LocalUser } from "./types";
import { getLocales } from "expo-localization";

// if there is a user in local storage return language , or return device language
export const workingLan = (user: LocalUser | null): "ar" | "en" => {
  if (user) {
    return user?.language;
  }
  return getLocales()[0]?.languageTag?.startsWith("en") ? "en" : "ar";
};
