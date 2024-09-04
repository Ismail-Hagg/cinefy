import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter } from "expo-router";
import "react-native-reanimated";
import { getLocales } from "expo-localization";
import { useEffect } from "react";
import { Alert, View } from "react-native";
import { getUserLocally } from "@/util/localStorage";
import { workingLan } from "@/util/functions";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const lan = useAuthStore((state) => state.changeLanguage);
  const router = useRouter();

  // const initialLang = (): string =>
  //   user?.language || getLocales()[0]?.languageTag?.startsWith("en")
  //     ? "en"
  //     : "ar";
  // translation.locale = initialLang();

  useEffect(() => {
    try {
      const loadedUser = getUserLocally();
      console.log("====================================");
      console.log(loadedUser);
      console.log("====================================");
      setUser(loadedUser);
      const language = workingLan(loadedUser);
      lan(language === "en" ? "en" : "ar");
    } catch (error) {
      Alert.alert("Error", error as string);
    }
    if (user !== null) {
      console.log("====================================");
      console.log("== route to main");
      console.log("====================================");
      router.replace("/(main)");
    }
  }, []);
  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </>
  );
}
