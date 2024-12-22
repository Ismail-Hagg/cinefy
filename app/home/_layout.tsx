import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

const _layout = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bacgroundColor,
      }}
    >
      <Text style={{ color: Colors.whiteColor }}>Home</Text>
    </View>
  );
};

export default _layout;
