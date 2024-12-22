import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Colors } from "@/constants/colors";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const { userData, setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // to set the language weather logged in or not
    setUser(userData);
    // if logged in route to main
    if (userData) {
      router.replace("/home");
    }
    SplashScreen.hideAsync();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bacgroundColor,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarStyle: "light",
            statusBarTranslucent: true,
            statusBarBackgroundColor: Colors.bacgroundColor,
            navigationBarColor: Colors.bacgroundColor,
          }}
        />
      </QueryClientProvider>
    </View>
  );
}
