import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter } from "expo-router";
import "react-native-reanimated";
import { useEffect } from "react";
import { View } from "react-native";
import { getUserLocally } from "@/util/localStorage";
import { workingLan } from "@/util/functions";
import { Colors } from "@/constants/Colors";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarStyle: "light",
            statusBarTranslucent: true,
            statusBarColor: "transparent",
          }}
        />
      </View>
    </QueryClientProvider>
  );
}
