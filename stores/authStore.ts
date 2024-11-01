import { LocalUser } from "@/util/types";
import { create } from "zustand";
import { I18n } from "i18n-js";
import { translation } from "@/util/translation";
import { workingLan } from "@/util/functions";
import { getUserLocally } from "@/util/localStorage";

type AuthStore = {
  userData: LocalUser | null;
  localization: I18n;
  loading: boolean;
  setLoading: () => void;
  setUser: (user: LocalUser | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  userData: getUserLocally(),
  localization: new I18n(translation),
  loading: false,
  setLoading: () => set((state) => ({ loading: !state.loading })),
  setUser: (user) => {
    set({
      userData: user,
      localization: new I18n(translation, { locale: workingLan(user) }),
    });
  },
}));
