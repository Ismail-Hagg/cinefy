import React from "react";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="actorDetails" />
      <Stack.Screen name="MovieDetailes" />
      <Stack.Screen name="notificationsPage" />
      <Stack.Screen name="searchPage" />
      <Stack.Screen name="settings" />
    </Stack>
  );
};

export default AppLayout;
