import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter } from "expo-router";
import "react-native-reanimated";
import { getLocales } from "expo-localization";
import { useEffect } from "react";
import { Alert, StatusBar, View } from "react-native";
import { getUserLocally } from "@/util/localStorage";
import { workingLan } from "@/util/functions";
import { Colors } from "@/constants/Colors";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { setUser, user, changeLanguage } = useAuthStore();

  const route = async () => {
    const loadedUsers = getUserLocally();
    workingLan(loadedUsers);
    if (loadedUsers !== null) {
      setUser(loadedUsers);
      router.replace("/(main)");
    } else {
      router.replace("/Login");
    }
    await new Promise((res) => setTimeout(res, 500));
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    route();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
