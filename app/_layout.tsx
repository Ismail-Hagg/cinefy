import { Stack, useRouter } from "expo-router";
import "react-native-reanimated";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { userData, setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // to set the language weather logged in or not
    setUser(userData);
    // if logged in route to main
    if (userData) {
      router.replace("/main");
    }

    new Promise((res) => setTimeout(res, 500)).then(() => {
      SplashScreen.hideAsync();
    });
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
