import { getWorkingLanguage } from "@/utils/functions";
import { getLocalUser } from "@/utils/localStorage";
import { translation } from "@/utils/translation";
import { LocalUser } from "@/utils/types";
import { I18n } from "i18n-js";
import { create } from "zustand";

type AuthStore = {
    userData: LocalUser | null;
    localization: I18n;
    setUser: (user: LocalUser | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    userData: getLocalUser(),
    localization: new I18n(translation),
    setUser: (user) => {
        set({
            userData: user,
            localization: new I18n(translation, { locale: getWorkingLanguage(user) }),
        });
    },
}));
