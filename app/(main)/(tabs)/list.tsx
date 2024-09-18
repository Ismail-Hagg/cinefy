import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { getRecord } from "@/util/firebaseHelper";
import { useAuthStore } from "@/stores/authStore";
import { FirebsaePaths } from "@/util/enums";
import { Results } from "@/util/types";
import MovieList from "@/components/MovieList";
import { image_base } from "@/util/constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TextField from "@/components/TextField";
import { genres } from "@/constants/genress";

type Genre = { id: number; name: string };

const { width } = Dimensions.get("window");
const List = () => {
  const router = useRouter();
  const [lst, setlst] = useState<Results[]>([]);
  const [searchList, setsearchList] = useState<Results[]>([]);
  const [genreList, setgenreList] = useState<Results[]>([]);
  const [loading, setloading] = useState(false);
  const [tabs, settabs] = useState(1);
  const { localization, user } = useAuthStore();
  const [order, setorder] = useState(false);
  const [searchMode, setsearchMode] = useState(false);
  const [genreMode, setgenreMode] = useState(false);
  const [localGenres, setgenres] = useState<number[]>([]);
  const [tempGenre, settempGenre] = useState<number[]>([]);

  const getData = async (path: string) => {
    setloading(true);
    const data = await getRecord(user?.userId as string, path, order);
    const tempLst: Results[] = [];
    if (data.docs.length > 0) {
      const tmplst: number[][] = [];
      data.docs.forEach((doc) => {
        const item: Results = doc.data() as Results;
        tempLst.push(item);
        tmplst.push(item.genre_ids);
      });
      setgenres(tmplst.flat());
    }
    setlst(tempLst);
    setloading(false);
  };
  useEffect(() => {
    reset();
    if (tabs === 1) {
      getData(FirebsaePaths[FirebsaePaths.watchlist]);
    } else if (tabs === 2) {
      getData(FirebsaePaths[FirebsaePaths.favorites]);
    }
  }, [tabs, order]);
  const reset = () => {
    setsearchMode(false);
    setgenreMode(false);
    settempGenre([]);
    setsearchList([]);
    setgenreList([]);
  };

  const navigate = (item: Results) => {
    router.push({
      pathname: "/(main)/MovieDetailes",
      params: { results: JSON.stringify(item) },
    });
  };

  const randomNav = () => {
    if (lst?.length === 0) {
      Alert.alert("List Is Empty");
      return;
    }
    const length = genreMode
      ? genreList.length
      : searchMode
      ? searchList.length
      : lst.length;
    const list: Results[] = genreMode
      ? genreList
      : searchMode
      ? searchList
      : lst;
    const random = Math.floor(Math.random() * length);
    navigate(list[random]);
  };

  const flip = () => {
    if (lst.length === 0) {
      Alert.alert("List Is Empty");
      return;
    }
    if (searchMode === false && genreMode === false) {
      setorder(!order);
    }
  };

  const searchButton = () => {
    if (lst.length === 0) {
      Alert.alert("List Is Empty");
      return;
    }
    setsearchMode(!searchMode);
    setgenreMode(false);
  };

  const searchFilter = (query: string) => {
    const filtered = lst.filter((filter) =>
      ((filter.name ?? filter.title) as string)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setsearchList(filtered);
  };

  const genreFilter = () => {
    if (lst.length === 0) {
      Alert.alert("List Is Empty");
      return;
    }
    setgenreMode(!genreMode);
    setsearchMode(false);
  };

  const filterrGenre = (genre: number) => {
    if (tempGenre.includes(genre)) {
      tempGenre.splice(tempGenre.indexOf(genre), 1);
    } else {
      tempGenre.push(genre);
    }
    const filtered = lst.filter((item) =>
      tempGenre.every((i) => item.genre_ids.includes(i))
    );
    setgenreList(filtered);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bacgroundColor,
      }}
    >
      <Stack.Screen
        options={{
          title: localization.t("lists"),
          headerShown: true,
          headerTintColor: Colors.mainColor,
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingHorizontal: 6 }}>
                {!loading ? (
                  <Text style={{ color: Colors.mainColor }}>
                    {searchMode
                      ? searchList.length
                      : genreMode
                      ? genreList.length
                      : lst.length}
                  </Text>
                ) : (
                  <ActivityIndicator color={Colors.mainColor} size={"small"} />
                )}
              </View>
              <TouchableOpacity
                style={{ paddingHorizontal: 6 }}
                onPress={searchButton}
              >
                <Ionicons
                  name="search"
                  size={24}
                  color={Colors.mainColor}
                  style={{ paddingHorizontal: 8 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 6 }}
                onPress={randomNav}
              >
                <Ionicons
                  name="shuffle"
                  size={24}
                  color={Colors.mainColor}
                  style={{ paddingHorizontal: 8 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 6 }}
                onPress={() => genreFilter()}
              >
                <Ionicons
                  name="filter"
                  size={24}
                  color={Colors.mainColor}
                  style={{ paddingHorizontal: 8 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={flip}>
                <MaterialCommunityIcons
                  name="sort-ascending"
                  size={24}
                  color={Colors.mainColor}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.bacgroundColor,
          },
        }}
      />
      {searchMode && (
        <View style={{ paddingHorizontal: 8 }}>
          <TextField
            holder={localization.t("search")}
            holderColor={Colors.secondaryColor}
            password={false}
            elevation={10}
            type={"default"}
            padding={8}
            onChange={(query) => searchFilter(query)}
          />
        </View>
      )}

      {genreMode && (
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {genres
              .filter((obj) =>
                Array.from(new Set(localGenres)).includes(obj.id)
              )
              .map((item) => {
                return (
                  <Pressable
                    onPress={() => filterrGenre(item.id)}
                    key={item.id}
                    style={{
                      padding: 8,
                      backgroundColor: tempGenre.includes(item.id)
                        ? Colors.mainColor
                        : Colors.forgroundColor,
                      borderRadius: 5,
                      margin: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: tempGenre.includes(item.id)
                          ? Colors.bacgroundColor
                          : Colors.mainColor,
                      }}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
          </ScrollView>
        </View>
      )}

      <View
        style={{
          height: width * 0.15,
          marginVertical: 6,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            settabs(1);
          }}
        >
          <View style={{ width: width / 2 }}>
            <View style={styles.tabInside}>
              <Text
                style={{
                  color: tabs == 1 ? Colors.mainColor : Colors.secondaryColor,
                }}
              >
                {localization.t("wlist")}
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

        <TouchableOpacity
          onPress={() => {
            settabs(2);
          }}
        >
          <View style={{ width: width / 2 }}>
            <View style={styles.tabInside}>
              <Text
                style={{
                  color: tabs == 2 ? Colors.mainColor : Colors.secondaryColor,
                }}
              >
                {localization.t("favs")}
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
      </View>
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={Colors.mainColor} size={"large"} />
        </View>
      )}
      {!loading && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={searchMode ? searchList : genreMode ? genreList : lst}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View>
                <MovieList
                  width={width}
                  title={item.name ?? item.title ?? ""}
                  link={image_base + item.poster_path}
                  action={() => navigate(item)}
                  remove={() => {}}
                  key={item.id}
                />
                {index === lst.length - 1 && (
                  <View style={{ height: 100 }}></View>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabInside: {
    height: width * 0.142,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default List;
