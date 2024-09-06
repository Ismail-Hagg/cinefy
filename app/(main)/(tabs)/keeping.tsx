import { View, Text } from "react-native";
import React, { useEffect } from "react";

const Keeping = () => {
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <View>
      <Text>keeping</Text>
    </View>
  );
};

export default Keeping;
