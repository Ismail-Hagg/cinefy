import { View, Text } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { Colors } from "@/constants/Colors";

type props = {
  colors?: string[];
  rad?: number;
  height: number;
  width: number;
};

const Loading = ({ colors, rad, height, width }: props) => {
  return (
    <Skeleton
      height={height}
      width={width}
      colors={
        colors ?? [
          Colors.forgroundColor,
          Colors.bacgroundColor,
          Colors.forgroundColor,
        ]
      }
      radius={rad}
    ></Skeleton>
  );
};

export default Loading;
