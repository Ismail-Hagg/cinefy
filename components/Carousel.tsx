import { View, useWindowDimensions } from "react-native";
import React, { useRef } from "react";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Movie from "./Movie";
import { Results, RootResult } from "@/util/types";
import { image_base } from "@/util/constants";
import { useRouter } from "expo-router";

type props = {
  resData: RootResult;
};

const Carousel = ({ resData }: props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const size = width * 0.7;
  const reff = useRef<Animated.ScrollView>(null);
  const spacer = (width - size) / 2;
  const x = useSharedValue(0);
  const onSctoll = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
  });

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      snapToInterval={size}
      decelerationRate="fast"
      onScroll={onSctoll}
    >
      {resData.results.map((item, index) => {
        const style = useAnimatedStyle(() => {
          const scale = interpolate(
            x.value,
            [(index - 2) * size * 1, (index - 1) * size * 1, index * size],
            [0.88, 1, 0.88]
          );
          return {
            transform: [{ scale }],
          };
        });

        if (index === 0 || index === resData.results.length - 1) {
          return <View style={{ width: spacer }} key={index} />;
        }

        return (
          <View key={index} style={{ width: size }}>
            <Animated.View
              style={[{ overflow: "hidden", flexDirection: "row" }, style]}
            >
              <Movie
                height={width * 0.45}
                width={width * 0.7}
                uri={image_base + item.poster_path}
                id={item.id.toString()}
                radius={10}
                click={() => {
                  const send: Results = {
                    ...item,
                    status: "status",
                    runtime: 0,
                    number_of_seasons: 0,
                    origin_country: ["coutry"],
                    vote_average: parseFloat(item.vote_average.toFixed(2)),
                  };
                  router.push({
                    pathname: "/(main)/MovieDetailes",
                    params: { results: JSON.stringify(send) },
                  });
                }}
              />
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default Carousel;
