import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { Episode } from "@/util/types";
import { dateCheck, formatTime } from "@/util/functions";
import { Colors } from "@/constants/Colors";
import Movie from "./Movie";
import { image_base } from "@/util/constants";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type NewType = Episode;

type Props = {
  episode: NewType;
  width: number;
  num: number;
};

const EpisodeComponent = ({ episode, width, num }: Props) => {
  const aired = dateCheck(episode.air_date);
  return (
    <Pressable
      onPress={() => {
        Alert.alert(episode.name, episode.overview, [], {
          cancelable: true,
        });
      }}
    >
      <View
        style={{
          flex: 1,
          marginVertical: 6,
          marginHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.forgroundColor,
          borderRadius: 5,
          elevation: 5,
          shadowColor: "black",
        }}
      >
        <View style={{ padding: 6 }}>
          <Movie
            id={num.toString()}
            radius={7}
            uri={image_base + episode.still_path}
            height={width}
            width={width}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "75%" }}>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "bold",
                color: Colors.mainColor,
                fontSize: 14,
              }}
            >
              {episode.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: Colors.secondaryColor,
                fontSize: 12,
              }}
            >
              Episode {num} - {episode.vote_average.toFixed(1)} -{" "}
              {formatTime(episode.runtime)} - {episode.air_date}
            </Text>
          </View>
          {aired ? (
            <Feather
              style={{ paddingHorizontal: 8 }}
              name="tv"
              size={24}
              color={Colors.mainColor}
            />
          ) : (
            <MaterialIcons
              name="tv-off"
              size={24}
              color={Colors.secondaryColor}
              style={{ paddingHorizontal: 8 }}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default EpisodeComponent;
