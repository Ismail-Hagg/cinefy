import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  isLoading: boolean;
  onPress: () => void;
  title: string;
  padding: number;
};

const CustomButton = ({ isLoading, title, onPress, padding }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: padding,
        backgroundColor: Colors.mainColor,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 10,
        shadowColor: "black",
      }}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.bacgroundColor} size="large" />
      ) : (
        <Text
          style={{
            color: Colors.bacgroundColor,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
