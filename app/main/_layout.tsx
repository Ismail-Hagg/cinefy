import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

const _layout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
          statusBarColor: "transparent",
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      {/* <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
          statusBarColor: "transparent",
        }}
      >
        <Stack.Screen name="(tabs)" /> */}
      {/* <Stack.Screen name="actorDetails" /> */}
      {/* <Stack.Screen name="MovieDetailes" /> */}
      {/* <Stack.Screen name="notificationsPage" />
      <Stack.Screen name="searchPage" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="ChatPage" /> */}
      {/* </Stack> */}
    </View>
  );
};

export default _layout;
