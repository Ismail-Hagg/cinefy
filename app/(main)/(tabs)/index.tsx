import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
import { useRouter } from "expo-router";

const Home = () => {
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
      <View style={{ height: 100 }}></View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
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
        </TouchableOpacity>
        {/* trending movies */}
        <View style={{ width: "100%" }}>
          <TitledMovieList
            title={localization.t("trending")}
            more={localization.t("more")}
            data={trending.isLoading ? placeHolder : trending.data}
            loading={trending.isLoading}
            action={() =>
              navigate({
                link: `https://api.themoviedb.org/3/trending/movie/day?language=${localization.locale}&page=`,
                results: [],
                search: 0,
                title: localization.t("trending"),
              })
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
