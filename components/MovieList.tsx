import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Movie from "./Movie";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";

type props = {
  width: number;
  title: string;
  link: string;
  action: () => void;
  remove: () => void;
};

const MovieList = ({ width, title, action, link, remove }: props) => {
  return (
    <TouchableNativeFeedback
      onPress={action}
      background={TouchableNativeFeedback.Ripple("", false)}
    >
      <View style={{ width, flexDirection: "row", alignItems: "center" }}>
        <View style={{ padding: 8 }}>
          <Movie
            uri={link}
            height={width * 0.15}
            width={width * 0.15}
            elevate={15}
            radius={10}
            noBorder
          />
        </View>
        <View
          style={{
            width: width - width * 0.15 - 16,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: (width - width * 0.15 - 16) * 0.8,
              height: width * 0.15,
              justifyContent: "center",
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                fontSize: 16,
                color: Colors.mainColor,
              }}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              width: (width - width * 0.15 - 16) * 0.2,
              height: width * 0.15,
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MovieList;
