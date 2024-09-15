import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useFetchData } from "@/hooks/fetchData";
import { useLocalSearchParams } from "expo-router";
import { Actor, Results, RootResult } from "@/util/types";
import { useAuthStore } from "@/stores/authStore";
import Movie from "@/components/Movie";
import { image_base } from "@/util/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { FontAwesome6 } from "@expo/vector-icons";
import TitledMovieList from "@/components/TitledMovieList";

const actorDetails = () => {
  const backDropComp = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={"close"}
        {...props}
      ></BottomSheetBackdrop>
    ),
    []
  );
  const [dims, setdims] = useState({ height: 0, width: 0 });
  const [indicator, setindicator] = useState(0);
  const flatsheetRef = useRef<BottomSheetFlatListMethods>(null);
  const picturesPoints = useMemo(() => ["85%"], []);
  const pucturesSheet = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { user, localization } = useAuthStore();
  const snapPoints = useMemo(() => ["80%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  let data: Actor = JSON.parse(useLocalSearchParams()["data"] as string);
  const { height, width } = Dimensions.get("window");
  const [bioOpen, setbioOpen] = useState(false);
  const [filteringOn, setfilteringOn] = useState(false);
  const placeHolder: RootResult = {
    total_pages: 0,
    total_results: 0,
    page: 0,
    results: [],
  };

  let actMovies: Results[] = [];
  let actShows: Results[] = [];
  let direct: Results[] = [];
  let produce: Results[] = [];

  const duplicate = (input: any[]) => {
    const mySet = new Set(input);
    console.log("set =>", mySet.size);
    console.log("arr =>", input.length);
  };

  const filtering = () => {
    let mov: number[] = [];
    let shw: number[] = [];
    let dir: number[] = [];
    let prod: number[] = [];
    if (data.combined_credits?.cast) {
      data.combined_credits.cast.map((item) => {
        if (item.media_type === "movie" && !mov.includes(item.id)) {
          actMovies.push(item);
          mov.push(item.id);
        }
        if (
          item.media_type === "tv" &&
          !item.genre_ids.includes(10767) &&
          !shw.includes(item.id)
        ) {
          actShows.push(item);
          shw.push(item.id);
        }
      });
    }
    if (data.combined_credits?.crew) {
      data.combined_credits.crew.map((item) => {
        if (item.job === "Producer" && !prod.includes(item.id)) {
          produce.push(item);
          prod.push(item.id);
        }
        if (item.job === "Director" && !dir.includes(item.id)) {
          direct.push(item);
          dir.push(item.id);
        }
      });
    }
  };

  const dataCall = useFetchData(
    `https://api.themoviedb.org/3/person/${data.id}?append_to_response=combined_credits,images&language=${localization.locale}`,
    [data.id, localization.locale]
  );

  if (dataCall.isSuccess) {
    data = dataCall.data;
    filtering();
  }

  const ageCalc = (dateString: string | undefined) => {
    if (dateString?.trim() === "" || dateString === undefined) return 0;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginHorizontal: 8,
                marginTop: width * 0.2,
                backgroundColor: Colors.forgroundColor,
                borderRadius: 10,
                elevation: 10,
                shadowColor: "black",
                flexDirection: "row",
              }}
            >
              <View style={{ padding: 6 }}>
                <Movie
                  uri={image_base + data.profile_path}
                  height={width * 0.27}
                  width={width * 0.27}
                  radius={10}
                  id="id"
                  click={() => {
                    if (
                      data?.images?.profiles &&
                      data?.images?.profiles.length > 0
                    ) {
                      pucturesSheet.current?.present();
                      return;
                    }
                    Alert.alert("", "No Image Available", [], {
                      cancelable: true,
                    });
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  style={[styles.texts, { fontSize: 18, fontWeight: "bold" }]}
                >
                  {data.name}
                </Text>
                <Text style={styles.texts}>
                  Age : {ageCalc(data.birthday as string)}
                </Text>
                <CustomButton
                  size={16}
                  noBold={"medium"}
                  radius={5}
                  title="Awards"
                  isLoading={false}
                  onPress={() => {}}
                  padding={0}
                />
              </View>
            </View>
            {data.biography && (
              <Pressable onPress={() => setbioOpen(!bioOpen)}>
                <View
                  style={{
                    marginHorizontal: 8,
                    marginVertical: 12,
                    backgroundColor: Colors.forgroundColor,
                    borderRadius: 10,
                    elevation: 10,
                    shadowColor: "black",
                    padding: 8,
                  }}
                >
                  <Text
                    numberOfLines={bioOpen ? undefined : 5}
                    style={{
                      color: Colors.mainColor,
                      fontSize: 14,
                    }}
                  >
                    {data.biography}
                  </Text>
                </View>
              </Pressable>
            )}

            {actMovies.length > 0 && (
              <View style={styles.groups}>
                <TitledMovieList
                  loading={actMovies.length === 0}
                  data={placeHolder}
                  resData={actMovies}
                  title="Acted in Movies"
                />
              </View>
            )}
            {actShows.length > 0 && (
              <View style={styles.groups}>
                <TitledMovieList
                  loading={actShows.length === 0}
                  data={placeHolder}
                  resData={actShows}
                  title="Acted in Shows"
                />
              </View>
            )}
            {direct.length > 0 && (
              <View style={styles.groups}>
                <TitledMovieList
                  loading={direct.length === 0}
                  data={placeHolder}
                  resData={direct}
                  title="Directeds"
                />
              </View>
            )}
            {produce.length > 0 && (
              <View style={styles.groups}>
                <TitledMovieList
                  loading={produce.length === 0}
                  data={placeHolder}
                  resData={produce}
                  title="Produced"
                />
              </View>
            )}
          </ScrollView>
        </View>

        <BottomSheetModal
          handleComponent={() => <View></View>}
          backgroundStyle={{ backgroundColor: "transparent" }}
          backdropComponent={backDropComp}
          detached
          ref={pucturesSheet}
          index={0}
          snapPoints={picturesPoints}
          bottomInset={46}
          enableContentPanningGesture
          enablePanDownToClose={false}
          enableOverDrag={false}
        >
          <BottomSheetFlatList
            indicatorStyle={"white"}
            ref={flatsheetRef}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                flatsheetRef.current?.scrollToIndex({
                  index: 1,
                  animated: true,
                });
                setindicator(1);
              });
            }}
            onLayout={(a) => {
              const { height, width } = a.nativeEvent.layout;
              setdims({ height, width });
            }}
            onViewableItemsChanged={({ viewableItems }) => {
              setindicator(viewableItems[0].index as number);
            }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            data={data.images?.profiles}
            keyExtractor={(i) => i.file_path}
            renderItem={({ item }) => (
              <View
                style={{
                  width: dims.width,
                  height: dims.height * 0.8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Movie
                    uri={image_base + item.file_path}
                    width={dims.width * 0.9}
                    height={dims.height * 0.8}
                    id={item.file_path}
                    radius={10}
                  />
                  <TouchableOpacity
                    onPress={() => pucturesSheet.current?.dismiss()}
                    style={{
                      position: "absolute",
                      top: 5,
                      left: 5,
                    }}
                  >
                    <FontAwesome6
                      name="circle-xmark"
                      size={28}
                      color={Colors.secondaryColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: dims.width,
              position: "absolute",
              bottom: width * 0.2,
            }}
          >
            <BottomSheetScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              scrollEnabled
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.bacgroundColor,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: Colors.mainColor,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                  }}
                >
                  {`${indicator + 1} / ${data?.images?.profiles.length}`}
                </Text>
              </View>
            </BottomSheetScrollView>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  texts: {
    color: Colors.mainColor,
  },
  groups: {
    marginVertical: 6,
  },
});

export default actorDetails;
