import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextStyle,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  isLoading: boolean;
  onPress: () => void;
  title: string;
  padding: number;
  size?: number;
  noBold?: TextStyle["fontWeight"];
  radius?: number;
};

const CustomButton = ({
  isLoading,
  title,
  onPress,
  padding,
  size,
  noBold,
  radius,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: padding,
        backgroundColor: Colors.mainColor,
        marginVertical: 10,
        borderRadius: radius ?? 10,
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
            fontSize: size ?? 24,
            fontWeight: noBold ?? "bold",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
