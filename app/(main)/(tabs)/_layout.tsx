import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { TabBar } from "@/components/Tabbar";

const TabLayout = () => {
  const translation = useAuthStore((state) => state.localization);
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: translation.t("home") }}
      />
      <Tabs.Screen
        name="list"
        options={{ headerShown: false, title: translation.t("lists") }}
      />
      <Tabs.Screen
        name="keeping"
        options={{ headerShown: false, title: translation.t("keep") }}
      />
      <Tabs.Screen
        name="chat"
        options={{ headerShown: false, title: translation.t("chat") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, title: translation.t("profile") }}
      />
    </Tabs>
  );
};

export default TabLayout;
