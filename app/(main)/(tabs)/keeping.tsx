import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import Carousel from "@/components/Carousel";

const Keeping = () => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bacgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 100,
          // width: width * 0.7,
          height: width * 0.5,
        }}
      >
        {/* <Carousel /> */}
      </View>
    </View>
  );
};

export default Keeping;
