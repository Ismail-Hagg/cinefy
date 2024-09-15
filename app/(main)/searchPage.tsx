import {
  View,
  Text,
  ViewProps,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated from "react-native-reanimated";
import Movie from "@/components/Movie";
import { Colors } from "@/constants/Colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Actor, Results, RootResult, SearchPage } from "@/util/types";
import { image_base } from "@/util/constants";
import { useFetchData } from "@/hooks/fetchData";
import { types } from "@babel/core";
import { usePaginatedFetch } from "@/hooks/fetchPaginated";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiCall } from "@/util/functions";
import { useAuthStore } from "@/stores/authStore";
import { SearchBarCommands } from "react-native-screens";

const searchPage = () => {
  const { localization } = useAuthStore();
  const router = useRouter();
  const searchRef = useRef<SearchBarCommands>(null);
  const { width, height } = Dimensions.get("window");
  // let params: SearchPage = JSON.parse(useLocalSearchParams()["data"] as string);
  const [params, setparams] = useState<SearchPage>(
    JSON.parse(useLocalSearchParams()["data"] as string)
  );

  const data = usePaginatedFetch(params.link as string, [
    params.link as string,
  ]);

  if (data.isSuccess) {
    const lst = data.data.pages.flat();
    const combinedResults: any[] = lst.reduce((acc, response) => {
      acc.push(...response.results);
      return acc;
    }, []);
    params.results = combinedResults;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: Colors.bacgroundColor,
      }}
    >
      {params.search === 0 && (
        <Stack.Screen
          options={{
            headerShown: true,
            title: params.title,
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: Colors.bacgroundColor,
            },
            headerTintColor: Colors.mainColor,
          }}
        />
      )}
      {params.search === 1 && (
        <Stack.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: localization.t("search"),
            headerSearchBarOptions: {
              ref: searchRef,
              placeholder: localization.t("search"),
              autoFocus: true,
              tintColor: Colors.mainColor,
              textColor: Colors.mainColor,
              hintTextColor: Colors.secondaryColor,
              headerIconColor: Colors.secondaryColor,
              shouldShowHintSearchIcon: false,
              onSearchButtonPress(e) {
                setparams({
                  ...params,
                  link: `https://api.themoviedb.org/3/search/multi?query=${e.nativeEvent.text}&include_adult=false&language=${localization.locale}S&page=`,
                });
                searchRef.current?.blur();
              },
            },

            headerStyle: {
              backgroundColor: Colors.bacgroundColor,
            },
            headerTintColor: Colors.mainColor,
          }}
        />
      )}
      <View
        style={{
          flex: 1,
          // marginTop: 50,
          width: "100%",
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={params.results}
          renderItem={({ item }) => (
            <View style={{ padding: 2 }}>
              <Movie
                id={item.id.toString()}
                uri={image_base + (item.profile_path ?? item.poster_path)}
                width={width * 0.315}
                height={width * 0.45}
                loading={false}
                elevate={7}
                radius={10}
                click={() => {
                  if (item.media_type && item.media_type === "person") {
                    const actor: Actor = {
                      id: item.id,
                      name: item.name,
                      profile_path: item.profile_path,
                    };

                    router.push({
                      pathname: "/(main)/actorDetails",
                      params: { data: JSON.stringify(actor) },
                    });
                  } else {
                    const send: Results = {
                      ...item,
                      status: "status",
                      runtime: 0,
                      number_of_seasons: 0,
                      origin_country: ["coutry"],
                      vote_average:
                        item.vote_average === undefined
                          ? 0
                          : parseFloat(item.vote_average.toFixed(2)),
                    };
                    router.push({
                      pathname: "/(main)/MovieDetailes",
                      params: { results: JSON.stringify(send) },
                    });
                  }
                }}
              />
            </View>
          )}
          numColumns={3}
          onEndReached={(a) => {
            data.fetchNextPage();
          }}
        />
      </View>
    </View>
  );
};

export default searchPage;
