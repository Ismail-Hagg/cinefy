import { View, Text, Button, ViewProps, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import Movie from "@/components/Movie";

const settings = () => {
  const router = useRouter();

  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    ></View>
  );
};

export default settings;
