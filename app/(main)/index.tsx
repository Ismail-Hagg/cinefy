import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "@/stores/authStore";

const index = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <View>
      <Text>{user?.userName}</Text>
    </View>
  );
};

export default index;
