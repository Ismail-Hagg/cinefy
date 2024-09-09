import { View, Text, FlatList, Dimensions, ViewProps } from "react-native";
import React from "react";
import TitledComponent from "./TitledComponent";
import Movie from "./Movie";
import { Results, RootResult } from "@/util/types";
import { image_base } from "@/util/constants";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import Loading from "./Loading";

type props = {
  title: string;
  more?: string;
  data: RootResult;
  resData?: Results[];
  loading: boolean;
  customheight?: number;
  customWidth?: number;
};

const TitledMovieList = ({
  title,
  more,
  data,
  loading,
  customWidth,
  customheight,
  resData,
}: props) => {
  const { width } = Dimensions.get("window");
  const router = useRouter();

  return (
    <View style={{ width: "100%" }}>
      <TitledComponent
        title={title}
        more={more}
        content={
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={resData ?? data.results}
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: index === data.results.length - 1 ? 10 : 0,
                  paddingVertical: 12,
                }}
              >
                <Movie
                  id={item.id.toString()}
                  uri={image_base + item.poster_path}
                  width={customWidth ?? width * 0.3}
                  height={customheight ?? width * 0.45}
                  loading={loading}
                  elevate={7}
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
              </View>
            )}
            ListEmptyComponent={() => {
              return Array.from({ length: 10 }).map((_item, index) => (
                <View
                  key={index.toString()}
                  style={{
                    paddingLeft: 10,
                    paddingRight: index === 9 ? 10 : 0,
                    paddingVertical: 12,
                  }}
                >
                  <Loading
                    width={customWidth ?? width * 0.3}
                    height={customheight ?? width * 0.45}
                  />
                </View>
              ));
            }}
          />
        }
      />
    </View>
  );
};

export default TitledMovieList;
