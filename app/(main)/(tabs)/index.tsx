import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const { user } = useAuthStore();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bacgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{user?.email}</Text>
    </View>
  );
};

export default Home;
