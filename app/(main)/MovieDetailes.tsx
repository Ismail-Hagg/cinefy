import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Info, Results } from "@/util/types";
import { useQuery } from "@tanstack/react-query";
import { apiCall, formatTime } from "@/util/functions";
import { useAuthStore } from "@/stores/authStore";
import { Colors } from "@/constants/Colors";
import Movie from "@/components/Movie";
import { image_base } from "@/util/constants";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { countries } from "@/constants/countries";
import Animated from "react-native-reanimated";
import TitledMovieList from "@/components/TitledMovieList";
import { collection } from "@react-native-firebase/firestore";
import { useFetchData } from "@/hooks/fetchData";
import { StatusBar } from "expo-status-bar";
import { genres } from "@/constants/genress";

const { width, height } = Dimensions.get("window");
const MovieDetailes = () => {
  const router = useRouter();
  const { localization } = useAuthStore();
  let details: Results = JSON.parse(
    useLocalSearchParams()["results"] as string
  );
  const ids = details.genre_ids;
  const [tabs, settabs] = useState(1);
  const [viewOpen, setviewOpen] = useState(false);
  const show = details.title === undefined;
  let info: Info | null = null;

  const detailCall = useFetchData(
    `https://api.themoviedb.org/3/${show ? "tv" : "movie"}/${
      details.id
    }?&append_to_response=credits,videos,images,recommendations&language=${
      localization.locale
    }`,
    ["details", details.id, localization.locale]
  );

  if (detailCall.isSuccess) {
    details = detailCall.data;
    info = detailCall.data;
    details.genre_ids = ids;
  }
  const thing = useFetchData(
    `https://api.themoviedb.org/3/collection/${info?.belongs_to_collection?.id}?language=${localization.locale}`,
    [info?.belongs_to_collection?.id.toString() ?? "", localization.locale]
  );
  if (thing.isSuccess && info?.belongs_to_collection) {
    info.belongs_to_collection = thing.data;
  }

  // const episodesCall = show
  //   ? useQuery({
  //       queryKey: ["episodes", details.id, seasonNum],
  //       queryFn: async () =>
  //         apiCall(
  //           `https://api.themoviedb.org/3/${link}/${details.id}/season/${seasonNum}`
  //         ),
  //     })
  //   : null;
  // const thing = useFetchData(
  //   `https://api.themoviedb.org/3/collection/"${info?.belongs_to_collection?.id}?language=${localization.locale}`,
  //   ["one"]
  // );
  // if (thing.isSuccess) {
  //   console.log(
  //     `https://api.themoviedb.org/3/collection/${info?.belongs_to_collection?.id}?language=${localization.locale}`
  //   );
  //   console.log(thing.data);
  // }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
      <StatusBar style="light" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: height * 0.45, width: width }}>
          <Movie
            id={details.id.toString()}
            blur={2}
            uri={image_base + details.backdrop_path}
            width={width}
            height={height * 0.45}
            noBorder
            elevate={0}
          />
        </View>
        <View
          style={{
            position: "absolute",
          }}
        >
          <LinearGradient
            colors={["transparent", Colors.bacgroundColor]}
            style={{
              position: "absolute",
              height: height * 0.45,
              width: width,
            }}
          />
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "stretch",
              height: height * 0.44,
              width: width,
            }}
          >
            <SafeAreaView>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 18,
                }}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <FontAwesome6
                      name="chevron-left"
                      size={20}
                      color={Colors.mainColor}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity style={{ paddingHorizontal: 12 }}>
                    <FontAwesome
                      name="bookmark-o"
                      size={24}
                      color={Colors.mainColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <FontAwesome
                      name="heart-o"
                      size={24}
                      color={Colors.mainColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
            <View
              style={{
                height: width * 0.5,
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 6,
              }}
            >
              <View style={{ width: width * 0.57 }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("", show ? details.name : details.title, [], {
                      cancelable: true,
                    });
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: Colors.mainColor,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {show ? details.name : details.title}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: Colors.mainColor,
                    fontSize: 12,
                    paddingVertical: 8,
                  }}
                >
                  {show
                    ? details.first_air_date?.slice(0, 4)
                    : details.release_date?.slice(0, 4)}{" "}
                  -{" "}
                  {show
                    ? `${details.number_of_seasons} ${localization.t(
                        "seasons"
                      )}`
                    : formatTime(details.runtime as number)}
                </Text>
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                  <FontAwesome name="star" size={12} color={Colors.mainColor} />
                  <Text
                    style={{
                      color: Colors.mainColor,
                      fontSize: 12,
                      alignContent: "center",
                      paddingHorizontal: 6,
                      bottom: width * 0.009,
                    }}
                  >
                    {parseFloat(details.vote_average.toFixed(2))} -{" "}
                    {details.origin_country[0] === "coutry"
                      ? details.origin_country[0]
                      : countries[details.origin_country[0]].en}
                  </Text>
                </View>
                <Text
                  style={{
                    color: Colors.mainColor,
                    fontSize: 12,
                    alignContent: "center",
                  }}
                >
                  {details.status}
                </Text>
                <View style={{ height: width * 0.09, marginVertical: 8 }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={genres.filter((obj) => ids.includes(obj.id))}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          backgroundColor: Colors.forgroundColor,
                          borderRadius: 6,
                          marginLeft: index === 0 ? 0 : 2,
                          marginRight:
                            index === details.genre_ids!.length - 1 ? 0 : 2,
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.mainColor,
                            fontSize: 12,
                            margin: 6,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    )}
                  />
                </View>
                <View
                  style={{
                    height: width * 0.095,
                    width: width * 0.57,
                  }}
                >
                  <TouchableOpacity
                    // onPress={trail}
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: Colors.mainColor,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 7,
                    }}
                  >
                    {detailCall.isLoading ? (
                      <ActivityIndicator
                        color={Colors.bacgroundColor}
                        size={"large"}
                      />
                    ) : (
                      <Text
                        style={{
                          color: Colors.bacgroundColor,
                          fontWeight: "bold",
                          elevation: 10,
                          shadowColor: "grey",
                        }}
                      >
                        Watch Trailer
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <Movie
                id={details.id.toString()}
                height={width * 0.48}
                width={width * 0.36}
                uri={image_base + details.poster_path}
                radius={15}
                click={() => {
                  // if (
                  //   details.images?.posters &&
                  //   details.images?.posters.length > 0
                  // ) {
                  //   const convert = JSON.stringify(details.images?.posters);
                  //   router.push({
                  //     pathname: "/(main)/ImageGallery",
                  //     params: {
                  //       data: convert,
                  //     },
                  //   });
                  //   return;
                  // }
                  // Alert.alert("", "No Image Available", [], {
                  //   cancelable: true,
                  // });
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            height: width * 0.15,
            marginVertical: 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => settabs(1)}>
            <View style={{ width: show ? width / 3 : width / 2 }}>
              <View style={styles.tabInside}>
                <Text
                  style={{
                    color: tabs == 1 ? Colors.mainColor : Colors.secondaryColor,
                  }}
                >
                  {localization.t("overview")}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    tabs == 1 ? Colors.mainColor : Colors.secondaryColor,
                  height: width * 0.008,
                }}
              ></View>
            </View>
          </TouchableOpacity>
          {show && (
            <TouchableOpacity onPress={() => settabs(2)}>
              <View style={{ width: show ? width / 3 : width / 2 }}>
                <View style={styles.tabInside}>
                  <Text
                    style={{
                      color:
                        tabs == 2 ? Colors.mainColor : Colors.secondaryColor,
                    }}
                  >
                    {localization.t("episodes")}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor:
                      tabs == 2 ? Colors.mainColor : Colors.secondaryColor,
                    height: width * 0.008,
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => settabs(3)}>
            <View style={{ width: show ? width / 3 : width / 2 }}>
              <View style={styles.tabInside}>
                <Text
                  style={{
                    color: tabs == 3 ? Colors.mainColor : Colors.secondaryColor,
                  }}
                >
                  {localization.t("review")}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    tabs == 3 ? Colors.mainColor : Colors.secondaryColor,
                  height: width * 0.008,
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
        {tabs === 1 && (
          <View style={{ margin: 4 }}>
            <Text style={styles.titles}>{localization.t("overview")}</Text>
            <View style={{ padding: 8 }}>
              <TouchableWithoutFeedback onPress={() => setviewOpen(!viewOpen)}>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: Colors.forgroundColor,
                    borderRadius: 12,
                  }}
                >
                  <View style={{ elevation: 10, shadowColor: "black" }}>
                    <Text
                      numberOfLines={viewOpen ? undefined : 5}
                      style={{ color: "white", fontSize: 14 }}
                    >
                      {details.overview}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            {info?.credits?.cast && info?.credits?.cast.length > 0 && (
              <View style={{ paddingVertical: 12 }}>
                <Text style={styles.titles}>{localization.t("cast")}</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={info.credits?.cast}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        marginRight:
                          index === info.credits!.cast!.length - 1 ? 3 : 6,
                        marginLeft: index === 0 ? 8 : 6,
                      }}
                    >
                      <Movie
                        id={details.id.toString()}
                        uri={image_base + item.profile_path}
                        height={width * 0.25}
                        width={width * 0.25}
                        radius={20}
                        click={() => {
                          router.push({
                            pathname: "/(main)/actorDetails",
                            params: { data: JSON.stringify(item) },
                          });
                        }}
                      />
                    </View>
                  )}
                />
              </View>
            )}
            {info?.recommendations &&
              info?.recommendations.results.length > 0 && (
                <View style={{ paddingVertical: 12 }}>
                  <TitledMovieList
                    title={localization.t("recommend")}
                    data={info?.recommendations}
                    loading={false}
                  />
                </View>
              )}
            {info?.belongs_to_collection?.parts &&
              info?.belongs_to_collection?.parts.length > 0 && (
                <TitledMovieList
                  title={localization.t("parts")}
                  resData={info?.belongs_to_collection.parts}
                  data={{
                    page: 0,
                    total_pages: 0,
                    results: [],
                    total_results: 0,
                  }}
                  loading={false}
                />
              )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabInside: {
    height: width * 0.142,
    justifyContent: "center",
    alignItems: "center",
  },
  titles: {
    color: Colors.mainColor,
    padding: 8,
  },
});

export default MovieDetailes;
