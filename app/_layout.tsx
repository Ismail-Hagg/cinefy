import { Stack } from "expo-router";
import "react-native-reanimated";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

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
