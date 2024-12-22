import { getLocales } from 'expo-localization';
import { LocalUser } from "./types";

// if there is a user in local storage return language , or return device language
export const getWorkingLanguage = (user: LocalUser | null): "ar" | "en" => {
    const localLang = getLocales()[0].languageTag
    if (user) {
        return user?.language as "ar" | "en";
    }
    return localLang.startsWith("en") ? "en" : "ar";
};