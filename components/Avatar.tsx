import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import CircularProgress from "react-native-circular-progress-indicator";

type Props = {
  width: number;
  marginY?: number;
  marginX?: number;
  onPress?: () => void;
  editing?: boolean;
  elevated?: number;
  uri: string;
  clear?: () => void;
  noBorder?: boolean;
  iconSize?: number;
};

const Avatar = ({
  width,
  marginX,
  marginY,
  onPress,
  editing,
  elevated,
  uri,
  clear,
  noBorder,
  iconSize,
}: Props) => {
  const noImage = uri === "";
  const [loading, setloading] = useState(false);
  const [val, setval] = useState(0);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginVertical: marginY,
          marginHorizontal: marginX,
          width: width,
          height: width,
          borderRadius: width / 2,
          alignItems: "center",
          justifyContent: "center",
          elevation: elevated,
          shadowColor: Colors.blackColor,
          borderWidth: noBorder ? 0 : 0.7,
          borderColor: loading ? Colors.bacgroundColor : Colors.mainColor,
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
            colorMode="light"
            transition={{
              type: "timing",
              duration: 500,
            }}
          >
            <Image
              style={{
                width: width - 2,
                height: width - 2,
                borderRadius: (width - 2) / 2,
              }}
              source={{ uri }}
              contentFit="cover"
              transition={1000}
              onLoad={(e) => setloading(false)}
              onLoadStart={() => setloading(true)}
              onProgress={(e) => {
                const { loaded, total } = e;
                const percentage = (loaded * 100) / total;
                setval(percentage);
              }}
            />
          </Skeleton>
        )}
        {loading && (
          <View style={{ position: "absolute", top: 0, left: 0 }}>
            <CircularProgress
              value={val}
              activeStrokeWidth={1}
              activeStrokeColor={Colors.mainColor}
              progressValueColor={"red"}
              inActiveStrokeWidth={0}
              radius={50}
              circleBackgroundColor="transparent"
              progressValueStyle={{
                display: "none",
              }}
            />
          </View>
        )}

        {editing && !loading && (
          <TouchableOpacity
            style={{
              width: width * 0.22,
              height: width * 0.22,
              borderRadius: (width * 0.22) / 2,
              borderWidth: 1,
              borderColor: Colors.mainColor,
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: noImage ? Colors.bacgroundColor : undefined,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={noImage ? onPress : clear}
          >
            <Ionicons
              name={noImage ? "add" : "trash"}
              size={width * 0.15}
              color={Colors.mainColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Avatar;
