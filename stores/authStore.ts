import { LocalUser } from "@/util/types";
import { create } from "zustand";
import { I18n } from "i18n-js";
import { translation } from "@/util/translation";
import { getLocales } from "expo-localization";
import { workingLan } from "@/util/functions";

type AuthStore = {
  user: LocalUser | null;
  localization: I18n;
  language: string;
  setUser: (intakeUser: LocalUser | null) => void;
  changeLanguage: (lan: "en" | "ar") => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  language: workingLan(null),
  localization: new I18n(translation),
  setUser: (intakeUser) => {
    const lan = workingLan(intakeUser);
    set({
      user: intakeUser,
      language: lan,
      localization: new I18n(translation, { locale: lan }),
    });
  },
  changeLanguage: (lan: "en" | "ar") => {
    set((state) => ({
      localization: new I18n(translation, { locale: lan }),
      language: lan,
    }));
  },
}));
