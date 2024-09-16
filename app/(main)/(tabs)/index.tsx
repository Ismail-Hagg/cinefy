import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";
import { StatusBar } from "expo-status-bar";
import Movie from "@/components/Movie";
import TitledComponent from "@/components/TitledComponent";
import TitledMovieList from "@/components/TitledMovieList";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "@/util/functions";
import { RootResult, SearchPage } from "@/util/types";
import { Stack, useRouter } from "expo-router";
import Carousel from "@/components/Carousel";
import Loading from "@/components/Loading";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { width } = useWindowDimensions();
  const { user, localization } = useAuthStore();
  const router = useRouter();
  const placeHolder: RootResult = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  };
  const trending = useQuery({
    queryKey: ["trending", localization.locale],
    queryFn: async () =>
      apiCall(
        `https://api.themoviedb.org/3/trending/movie/day?language=${localization.locale}`
      ),
  });

  const upcomingMovies = useQuery({
    queryKey: ["upcomingMovies", localization.locale],
    queryFn: async () =>
      apiCall(
        `https://api.themoviedb.org/3/movie/upcoming?language=${localization.locale}`
      ),
  });

  const popularMovies = useQuery({
    queryKey: ["popularMovies", localization.locale],
    queryFn: async () =>
      apiCall(
        `https://api.themoviedb.org/3/movie/popular?language${localization.locale}`
      ),
  });

  const popularShows = useQuery({
    queryKey: ["popularShows", localization.locale],
    queryFn: async () =>
      apiCall(
        `https://api.themoviedb.org/3/tv/popular?language=${localization.locale}`
      ),
  });

  const topMovies = useQuery({
    queryKey: ["topMovies", localization.locale],
    queryFn: async () =>
      apiCall(
        `https://api.themoviedb.org/3/movie/top_rated?language=${localization.locale}`
      ),
  });

  const topShows = useQuery({
    queryKey: ["topShows", localization.locale],
    queryFn: async () =>
      apiCall(
        `https://api.themoviedb.org/3/tv/top_rated?language=${localization.locale}`
      ),
  });

  const navigate = (data: SearchPage) => {
    router.push({
      pathname: "/(main)/searchPage",
      params: {
        data: JSON.stringify(data),
      },
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bacgroundColor,
      }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View
            style={{
              backgroundColor: Colors.bacgroundColor,
              width,
              height: width * 0.23,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: width * 0.1,
                width: width * 0.74,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "blue",
              }}
            >
              <Pressable
                onPress={() =>
                  navigate({
                    link: "",
                    results: [],
                    search: 1,
                    title: "",
                  })
                }
                style={{
                  height: width * 0.12,
                  width: width * 0.7,
                  borderRadius: 5,
                  elevation: 10,
                  shadowColor: "black",
                  backgroundColor: Colors.bacgroundColor,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="search"
                  size={24}
                  color={Colors.secondaryColor}
                  style={{ paddingHorizontal: 8 }}
                />
                <Text style={{ fontSize: 12, color: Colors.secondaryColor }}>
                  Search for Movie , Show , People
                </Text>
              </Pressable>
            </View>
            <TouchableOpacity
              style={{
                height: width * 0.12,
                width: width * 0.12,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
              }}
            >
              <Ionicons
                name="notifications"
                size={24}
                color={Colors.mainColor}
                style={{ marginHorizontal: 12 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: width * 0.12,
                width: width * 0.12,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "green",
              }}
            >
              <Ionicons
                name="filter"
                size={24}
                color={Colors.mainColor}
                style={{ marginHorizontal: 12 }}
              />
            </TouchableOpacity>
            {/* <View>
              <Text>search place</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Ionicons
                name="notifications"
                size={24}
                color={Colors.mainColor}
                style={{ marginHorizontal: 12 }}
              />
              <Ionicons name="filter" size={24} color={Colors.mainColor} />
            </View> */}
          </View>
        </SafeAreaView>
        {/* <TouchableOpacity
          onPress={() =>
            navigate({
              link: "",
              results: [],
              search: 1,
              title: "",
            })
          }
        >
          <Text>search</Text>
        </TouchableOpacity> */}

        {/* trending movies */}
        <View style={{ width: "100%" }}>
          <TitledComponent
            title={localization.t("trending")}
            more={localization.t("more")}
            action={() =>
              navigate({
                link: `https://api.themoviedb.org/3/trending/movie/day?language=${localization.locale}&page=`,
                results: [],
                search: 0,
                title: localization.t("trending"),
              })
            }
            content={
              trending.isLoading || trending.isError ? (
                <View
                  style={{
                    width,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 12,
                    flexDirection: "row",
                  }}
                >
                  <Loading height={width * 0.4} width={width * 0.7} rad={10} />
                  <View style={{ marginHorizontal: 12 }}>
                    <Loading
                      height={width * 0.45}
                      width={width * 0.7}
                      rad={10}
                    />
                  </View>

                  <Loading height={width * 0.4} width={width * 0.7} rad={10} />
                </View>
              ) : (
                <View style={{ marginVertical: 12 }}>
                  <Carousel resData={trending.data} />
                </View>
              )
            }
          />
        </View>

        {/* upcoming movies */}
        <View style={{ width: "100%" }}>
          <TitledMovieList
            title={localization.t("upmovie")}
            more={localization.t("more")}
            data={upcomingMovies.isLoading ? placeHolder : upcomingMovies.data}
            loading={upcomingMovies.isLoading}
            action={() =>
              navigate({
                link: `https://api.themoviedb.org/3/movie/upcoming?language=${localization.locale}&page=`,
                results: [],
                search: 0,
                title: localization.t("upmovie"),
              })
            }
          />
        </View>
        {/* popular movies */}
        <View style={{ width: "100%" }}>
          <TitledMovieList
            title={localization.t("popmove")}
            more={localization.t("more")}
            data={popularMovies.isLoading ? placeHolder : popularMovies.data}
            loading={popularMovies.isLoading}
            action={() =>
              navigate({
                link: `https://api.themoviedb.org/3/movie/popular?language${localization.locale}&page=`,
                results: [],
                search: 0,
                title: localization.t("popmove"),
              })
            }
          />
        </View>
        {/* popular shows */}
        <View style={{ width: "100%" }}>
          <TitledMovieList
            title={localization.t("popshow")}
            more={localization.t("more")}
            data={popularShows.isLoading ? placeHolder : popularShows.data}
            loading={popularShows.isLoading}
            action={() =>
              navigate({
                link: `https://api.themoviedb.org/3/tv/popular?language=${localization.locale}&page=`,
                results: [],
                search: 0,
                title: localization.t("popshow"),
              })
            }
          />
        </View>
        {/* toop movies */}
        <View style={{ width: "100%" }}>
          <TitledMovieList
            title={localization.t("topmovie")}
            more={localization.t("more")}
            data={topMovies.isLoading ? [] : topMovies.data}
            loading={topMovies.isLoading}
            action={() =>
              navigate({
                link: `https://api.themoviedb.org/3/movie/top_rated?language=${localization.locale}&page=`,
                results: [],
                search: 0,
                title: localization.t("topmovie"),
              })
            }
          />
        </View>
        {/* toop shows */}
        <View style={{ width: "100%" }}>
          <TitledMovieList
            title={localization.t("topshow")}
            more={localization.t("more")}
            data={
              topShows.isLoading ? Array.from({ length: 10 }) : topShows.data
            }
            loading={topShows.isLoading}
            action={() =>
              navigate({
                link: `https://api.themoviedb.org/3/tv/top_rated?language=${localization.locale}&page=`,
                results: [],
                search: 0,
                title: localization.t("topshow"),
              })
            }
          />
        </View>
        <View style={{ height: 120 }}></View>
      </ScrollView>
    </View>
  );
};

export default Home;
