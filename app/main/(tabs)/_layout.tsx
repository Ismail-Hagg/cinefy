import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { TabBar } from "@/components/TabBar";

const Tabing = () => {
  const { localization } = useAuthStore();
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: localization.t("home") }}
      />
      <Tabs.Screen
        name="list"
        options={{ headerShown: false, title: localization.t("lists") }}
      />
      <Tabs.Screen
        name="keeping"
        options={{ headerShown: false, title: localization.t("keep") }}
      />
      <Tabs.Screen
        name="chat"
        options={{ headerShown: false, title: localization.t("chat") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, title: localization.t("profile") }}
      />
    </Tabs>
  );
};

export default Tabing;
