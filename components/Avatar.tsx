import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";

type Props = {
  width: number;
  onPress?: () => void;
  editing?: boolean;
  elevated?: number;
  uri: string;
  clear: () => void;
  noBorder?: boolean;
  iconSize?: number;
  mrgin?: number;
};

const Avatar = ({
  width,
  onPress,
  editing,
  elevated,
  uri,
  clear,
  noBorder,
  iconSize,
  mrgin,
}: Props) => {
  const noImage = uri === "";
  const blurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";
  const [loading, setloading] = useState(false);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: Colors.blackColor,
      }}
    >
      <View
        style={{
          marginVertical: mrgin ?? 10,
          borderWidth: noBorder ? 0 : 1,
          borderColor: noBorder ? "transparent" : Colors.mainColor,
          width: width * 0.35,
          height: width * 0.35,
          borderRadius: (width * 0.35) / 2,
          alignItems: "center",
          justifyContent: "center",
          elevation: elevated,
          shadowColor: Colors.blackColor,
          backgroundColor: Colors.forgroundColor,
        }}
      >
        {noImage ? (
          <Ionicons
            name="person"
            size={iconSize ?? 42}
            color={Colors.mainColor}
          />
        ) : (
          <Skeleton
            show={loading}
            colors={[
              Colors.forgroundColor,
              Colors.bacgroundColor,
              Colors.forgroundColor,
            ]}
            radius={"round"}
            backgroundColor={Colors.bacgroundColor}
            colorMode="light"
            transition={{
              type: "timing",
              duration: 500,
            }}
          >
            <Image
              style={{
                flex: 1,
                width: width * 0.35 - 2,
                height: width * 0.35 - 2,
                borderRadius: (width * 0.35) / 2,
                backgroundColor: Colors.forgroundColor,
              }}
              source={{ uri }}
              contentFit="cover"
              transition={1000}
              onLoad={(e) => setloading(false)}
              onLoadStart={() => setloading(true)}
              // onProgress={(e) => {
              //   const { loaded, total } = e;
              //   const percentage = (loaded * 100) / total;
              //   console.log("loading => ", percentage);
              // }}
            />
          </Skeleton>
        )}

        {editing && !loading && (
          <TouchableOpacity
            style={{
              width: width * 0.08,
              height: width * 0.08,
              borderRadius: width * 0.1,
              borderWidth: 1,
              borderColor: Colors.mainColor,
              position: "absolute",
              bottom: 2,
              right: 2,
              backgroundColor: noImage ? Colors.bacgroundColor : undefined,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={noImage ? onPress : clear}
          >
            <Ionicons
              name={noImage ? "add" : "trash"}
              size={20}
              color={Colors.mainColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Avatar;
