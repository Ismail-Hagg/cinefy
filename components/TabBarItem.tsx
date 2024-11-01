import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/lib/typescript/reanimated2/component/View";

type props = {
  onPress: () => void;
  label: string;
  routeName: string;
  isFocused: boolean;
  color: string;
};

const icons = (route: string, props: any) => {
  switch (route) {
    case "index": {
      return <Feather name="home" size={24} {...props} />;
    }
    case "list": {
      return <Feather name="list" size={24} {...props} />;
    }
    case "keeping": {
      return <Feather name="tv" size={24} {...props} />;
    }
    case "chat": {
      return <Feather name="message-square" size={24} {...props} />;
    }
    case "profile": {
      return <Feather name="user" size={24} {...props} />;
    }
  }
};

const TabBarItem = ({ onPress, label, routeName, isFocused, color }: props) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 200 }
    );
  }, [isFocused, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleVal = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return { transform: [{ scale: scaleVal }], top };
  });

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Animated.View style={animatedIconStyle}>
        {icons(routeName, {
          color: color,
        })}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color: color,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarItem;
