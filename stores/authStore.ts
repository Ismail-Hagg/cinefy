import { LocalUser } from "@/util/types";
import { create } from "zustand";
import { I18n } from "i18n-js";
import { translation } from "@/util/translation";
import { getLocales } from "expo-localization";

type AuthStore = {
  user: LocalUser | null;
  localization: I18n;
  language: string;
  setUser: (user: LocalUser | null) => void;
  changeLanguage: (lan: "en" | "ar") => void;
};

// const initialLang = (): string =>
//   user?.language || getLocales()[0]?.languageTag?.startsWith("en")
//     ? "en"
//     : "ar";
// translation.locale = initialLang();

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  //   user: {
  //     userName: "Seemoe",
  //     userId: "",
  //     email: "",
  //     phoneNumber: "",
  //     localPic: "",
  //     onlinePic: "",
  //     language: "",
  //     messagingToken: "",
  //     watchList: [],
  //     favs: [],
  //     watching: [],
  //     commentLike: [],
  //     commentDislike: [],
  //     followers: [],
  //     following: [],
  //   },
  language: "",
  localization: new I18n(translation),
  setUser: (user) => set({ user }),
  changeLanguage: (lan: "en" | "ar") => {
    set((state) => ({
      localization: new I18n(translation, { locale: lan }),
      language: lan,
    }));
  },
}));
