import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
        <Tabs>
          <Tabs.Screen name="index" options={{ headerShown: false }} />
          <Tabs.Screen name="list" options={{ headerShown: false }} />
          <Tabs.Screen name="keeping" options={{ headerShown: false }} />
          <Tabs.Screen name="chat" options={{ headerShown: false }} />
          <Tabs.Screen name="profile" options={{ headerShown: false }} />
        </Tabs>
      </View>
    </>
  );
};

export default TabLayout;
