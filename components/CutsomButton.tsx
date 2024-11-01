import {
  Text,
  ActivityIndicator,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React from "react";

type Props = {
  isLoading?: boolean;
  onPress: () => void;
  title: string;
  titleColor: string;
  padding: number;
  mainColor: string;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  size?: number;
  bold?: boolean;
  radius?: number;
  small?: boolean;
};

const CustomButton = ({
  isLoading,
  title,
  titleColor,
  onPress,
  mainColor,
  padding,
  size,
  bold,
  radius,
  small,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}: Props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("", false)}
      onPress={onPress}
    >
      <View
        style={{
          padding: padding,
          backgroundColor: mainColor,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          borderRadius: radius ?? 10,
          elevation: 10,
          shadowColor: "black",
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            color={titleColor}
            size={small ? "small" : "large"}
          />
        ) : (
          <Text
            style={{
              color: titleColor,
              textAlign: "center",
              fontSize: size,
              fontWeight: bold ? "bold" : undefined,
            }}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;
