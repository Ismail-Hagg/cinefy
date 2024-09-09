import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";

const List = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        style={{ width: 150, height: 150, backgroundColor: "green" }}
        sharedTransitionTag="sharedTag"
      />
      <Button title="Screen2" onPress={() => router.push("/(main)/settings")} />
    </View>
  );
};

export default List;
