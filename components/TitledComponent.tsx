import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type props = {
  more?: string;
  content: React.JSX.Element;
  title: string;
  action?: () => void;
};
const TitledComponent = ({ more, content, title, action }: props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: Colors.mainColor, fontSize: 16 }}>{title}</Text>
        {more && (
          <TouchableOpacity onPress={action}>
            <Text style={{ color: Colors.mainColor, fontSize: 12 }}>
              {more}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {content}
    </View>
  );
};

export default TitledComponent;
