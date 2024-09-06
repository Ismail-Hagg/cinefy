import { View, Text, TouchableOpacity, LayoutChangeEvent } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import TabBarItem from "./TabBarItem";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [dimensions, setdimensions] = useState({ width: 20, height: 20 });
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setdimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  return (
    <View
      onLayout={onTabBarLayout}
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 30,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.forgroundColor,
        marginHorizontal: 15,
        borderRadius: 20,
        paddingVertical: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarItem
            key={route.name}
            onPress={onPress}
            isFocused={isFocused}
            color={isFocused ? Colors.mainColor : Colors.secondaryColor}
            label={label as string}
            routeName={route.name}
          />
        );
      })}
    </View>
  );
};
