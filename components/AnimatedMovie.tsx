import { View, Text, ViewProps } from "react-native";
import React from "react";
import Movie from "./Movie";
import Animated from "react-native-reanimated";

type props = {
  uri: string;
  width: number;
  height: number;
  click?: () => void;
  blur?: number;
  loading?: boolean;
  elevate?: number;
  radius?: number;
  noBorder?: boolean;
  id: string;
};

const AnimatedMovie = (prop: props) => {
  // export const AnimatedMovie = (prop: props) => {
  const MyView = React.forwardRef(
    (viewProps: ViewProps, ref: React.LegacyRef<View>) => {
      // some additional logic
      return (
        <View ref={ref} {...viewProps}>
          <Movie {...prop} />
        </View>
      );
    }
  );
  const AnimatedView = Animated.createAnimatedComponent(MyView);

  //   return <AnimatedView sharedTransitionTag={prop.id} />;
  // };
  return <AnimatedView sharedTransitionTag={prop.id} />;
};

export default AnimatedMovie;
