import { View, Text, Pressable, ViewProps } from "react-native";
import React, { useState } from "react";
import Loading from "./Loading";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";

type props = {
  uri: string;
  width: number;
  height: number;
  click?: () => void;
  blur?: number;
  loading?: boolean;
  elevate?: number;
  radius?: number;
  noBorder?: boolean;
  id: string;
};

const Movie = ({
  uri,
  width,
  height,
  click,
  blur,
  loading,
  elevate,
  radius,
  noBorder,
  id,
}: props) => {
  const [imageLink, setimageLink] = useState(uri);
  const [elevating, setelevating] = useState(0);
  const noImage =
    "https://www.allianceplast.com/wp-content/uploads/no-image.png";

  const loaded = () => {
    if (elevate) {
      setelevating(elevate);
    }
  };

  return (
    <View style={{ height, width }}>
      {loading ? (
        <Loading height={height} width={width} />
      ) : (
        <Pressable
          onPress={click}
          style={{
            borderWidth: noBorder ? 0 : 1,
            borderColor: Colors.mainColor,
            borderRadius: radius,
            elevation: elevating,
            shadowColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            blurRadius={blur}
            source={{ uri: imageLink }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: radius,
            }}
            placeholder={{ blurhash: "L6D]SW00-;xb~Woeoeof-=t7RiRj" }}
            contentFit="cover"
            transition={1000}
            onError={() => setimageLink(noImage)}
            onLoad={() => loaded()}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Movie;
